import {types, getEnv, flow, getParent} from 'mobx-state-tree'
import {when} from 'mobx'
import {IWocky} from 'wocky-client'
import {IEnv} from './store'
import {IAuthStore} from './AuthStore'
import {Credentials} from './AppInfo'
import analytics from '../utils/analytics'
import {warn, log} from '../utils/logger'
import {bugsnagNotify} from 'src/utils/bugsnagConfig'

type State = {
  resource?: string
  buttonText?: string
  registered?: boolean
  errorMessage?: string
  token?: string
}

const codeUrlString = '?inviteCode='

const FirebaseStore = types
  .model('FirebaseStore', {
    resource: types.maybeNull(types.string),
    inviteCode: types.maybeNull(types.string),
  })
  .volatile(() => ({
    phone: '',
    buttonText: 'Verify',
    registered: false,
    errorMessage: '',
    token: null,
  }))
  .actions(self => ({
    setState(state: State) {
      Object.assign(self, state)
    },
    reset() {
      self.registered = false
      self.errorMessage = ''
      self.buttonText = 'Verify'
    },
    setInviteCode: code => {
      self.inviteCode = code
    },
  }))
  .actions(self => ({
    registerWithToken: flow(function*() {
      const {authStore} = getParent<any>(self)
      try {
        self.setState({buttonText: 'Connecting...'})
        authStore.register(self.phone, 'firebase')
        yield (authStore as IAuthStore).login()
        self.setState({buttonText: 'Verify', registered: true})
      } catch (err) {
        warn('RegisterWithToken error', err)
        self.setState({errorMessage: 'Error registering, please try again'})
        bugsnagNotify(err, 'error_firebase_register')
        analytics.track('error_firebase_register', {error: err})
      } finally {
        self.setState({
          buttonText: 'Verify',
          // todo: shouldn't overwrite errorMessage here
          errorMessage: '',
        })
      }
    }),
  }))
  .actions(self => {
    const {firebase, auth}: IEnv = getEnv(self)
    let wocky: IWocky
    let confirmResult: any
    let unsubscribe: any
    let disposer

    function onFirebaseDynamicLink(url: string | null) {
      if (url) {
        const index = url.indexOf(codeUrlString)
        if (index > -1) {
          let code = url.slice(index + codeUrlString.length)
          code = decodeURIComponent(code)
          self.setInviteCode(code)
        }
      }
    }

    const redeemCode = flow(function*(shareType) {
      try {
        yield wocky.userInviteRedeemCode(self.inviteCode!, shareType)
        analytics.track('invite_code_redeem', {code: self.inviteCode})
      } catch (err) {
        analytics.track('invite_code_redeem_fail', {code: self.inviteCode, error: err})
      }
      self.setInviteCode(undefined)
    })

    function afterAttach() {
      auth.onAuthStateChanged(processFirebaseAuthChange)
      wocky = (getParent(self) as any).wocky // wocky could be null for HMR (?)
      // setup dynamic links
      unsubscribe = firebase.links().onLink(onFirebaseDynamicLink)
      // get initial link
      firebase
        .links()
        .getInitialLink()
        .then(onFirebaseDynamicLink)
    }

    function beforeDestroy() {
      unsubscribe()
    }

    // NOTE: this is not a MST action
    async function processFirebaseAuthChange(user: any) {
      log('FIREBASESTORE: AUTH STATE CHANGED', !!user)
      log(user)
      if (user) {
        try {
          await auth!.currentUser!.reload()
          self.setState({
            token: await auth!.currentUser!.getIdToken(true),
          })

          analytics.track('firebase_auth_change_user', {
            firebaseUser: JSON.stringify(user),
            hasFirebaseToken: !!self.token,
          })

          if (disposer) disposer()
          disposer = when(() => !!self.token && self.phone, self.registerWithToken)
        } catch (err) {
          warn('Firebase onAuthStateChanged error:', err)
          bugsnagNotify(err, 'auth_error_firebase')
          analytics.track('auth_error_firebase', {error: err})
          if (wocky && wocky.profile && wocky.connected) {
            wocky.logout()
          }
        }
      } else {
        analytics.track('firebase_auth_change_null')
        if (wocky && wocky.profile && wocky.connected) {
          wocky.logout()
        }
      }
    }

    const getLoginCredentials = flow(function*() {
      if (!auth.currentUser) {
        return null
      }

      // // Refresh firebase token if less than 5 minutes from expiry
      // const tokenResult: RNFirebase.IdTokenResult = yield auth.currentUser!.getIdTokenResult(false)

      // // Under some timing conditions, firebase may have internally
      // //   refreshed the IdToken. In this case, getIdTokenResult(false)
      // //   returns the claims of the current IdToken that is inside
      // //   firebase. We don't have this IdToken yet so we need to fetch it.
      // // In other words, we must always call getIdToken(). The only
      // //   question is whether to force a refresh.
      // const refresh = tokenResult.claims.exp - Date.now() / 1000 < 300
      // self.token = yield auth.currentUser!.getIdToken(refresh)

      self.token = yield auth.currentUser!.getIdToken()
      return {typ: 'firebase', sub: self.token, phone_number: self.phone}
    }) as () => Promise<Credentials | null>

    const logout = flow(function*() {
      analytics.track('logout')
      if (self.token) {
        self.token = null
        try {
          yield auth.signOut()
        } catch (err) {
          bugsnagNotify(err, 'error_firebase_logout')
          analytics.track('error_firebase_logout', {error: err})
          warn('firebase logout error', err)
        }
      }

      self.reset()
      confirmResult = null
      return true
    })

    const verifyPhone = flow(function*(phone: string) {
      self.phone = phone
      try {
        self.errorMessage = ''
        analytics.track('sms_confirmation_try')
        confirmResult = yield auth.signInWithPhoneNumber(phone)
        analytics.track('sms_confirmation_success')
        // register/login occurs as a reaction in processFirebaseAuthChange
        return true
      } catch (err) {
        bugsnagNotify(err, 'sms_confirmation_fail', {phone})
        analytics.track('sms_confirmation_fail', {error: err, phone})
        switch (err.code) {
          case 'auth/too-many-requests':
            self.errorMessage = 'Too many login attempts from this phone. Try again later.'
            break
          case 'auth/network-request-failed':
            self.errorMessage = 'Network error. Check your connection and try again.'
            break
          default:
            self.errorMessage =
              'Error verifying phone number. Please check the number and try again.'
        }
      }
      return false
    }) as (phone: string) => Promise<boolean>

    const confirmCode = flow(function*({code, resource}: any) {
      self.errorMessage = ''
      self.buttonText = 'Verifying...'
      self.resource = resource
      try {
        if (!confirmResult) {
          throw new Error('Phone not verified')
        }
        analytics.track('verify_confirmation_try', {code, resource})

        // Some weird iOS situation. Sometimes `confirmResult.confirm(code)`
        //   gets called twice (implying this handler is called twice?)
        // On the second time, if the user is already logged in, this
        //   triggers an error auth/code-expired or ERROR_SESSION_EXPIRED
        //   and the error message is 'The SMS code has expired. Please
        //   re-send the verification code to try again.'
        // Insert a guard and don't called `confirmResult.confirm` if logged in
        if (!auth.currentUser) {
          yield confirmResult.confirm(code)
        }

        register()
        analytics.track('verify_confirmation_success')
      } catch (err) {
        const name =
          err.code === 'auth/code-expired'
            ? 'verify_confirmation_fail_code_expired'
            : 'verify_confirmation_fail'
        bugsnagNotify(err, name, {code})
        analytics.track(name, {error: err, code})
        warn('confirmation fail', err)
        self.errorMessage = 'Error confirming code, please try again or resend code'
        self.buttonText = 'Verify'
        throw err
      }
    })

    const resendCode = flow(function*() {
      analytics.track('resend_code_try')
      if (yield verifyPhone(self.phone)) {
        analytics.track('resend_code_success')
        return true
      }
      analytics.track('resend_code_fail')
      return false
    }) as () => Promise<boolean>

    function register(): void {
      self.setState({buttonText: 'Registering...'})
      // TODO: set a timeout on firebase register
      when(() => !!self.token, self.registerWithToken)
    }

    return {
      afterAttach,
      getLoginCredentials,
      logout,
      beforeDestroy,
      verifyPhone,
      confirmCode,
      resendCode,
      redeemCode,
    }
  })

export default FirebaseStore

type FirebaseStoreType = typeof FirebaseStore.Type
export interface IFirebaseStore extends FirebaseStoreType {}

import {types, getEnv, flow, getParent} from 'mobx-state-tree'
import {when} from 'mobx'
import {IWocky} from 'wocky-client'
import {IEnv} from '.'
import {settings} from '../globals'

type State = {
  phone?: string
  token?: string
  resource?: string
  buttonText?: string
  registered?: boolean
  errorMessage?: string
}

const codeUrlString = '?inviteCode='

const FirebaseStore = types
  .model('FirebaseStore', {
    phone: '',
    token: types.maybeNull(types.string),
    resource: types.maybeNull(types.string),
    inviteCode: types.maybeNull(types.string),
  })
  .volatile(() => ({
    buttonText: 'Verify',
    registered: false,
    errorMessage: '', // to avoid strange typescript errors when set it to string or null,
  }))
  .views(self => {
    return {
      get providerName() {
        // This needs to match the member variable of getRoot/getParent that points to an instance of this object
        // Is there a way to auto-discover this?
        return 'firebaseStore'
      },
    }
  })
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
  .actions(self => {
    const {firebase, auth, logger, analytics}: IEnv = getEnv(self)
    let wocky: IWocky
    let confirmResult: any
    let unsubscribe: any

    function onFirebaseDynamicLink(url: string) {
      if (url) {
        const index = url.indexOf(codeUrlString)
        if (index > -1) {
          let code = url.slice(index + codeUrlString.length)
          code = decodeURIComponent(code)
          self.setInviteCode(code)
        }
      }
    }

    function afterAttach() {
      auth.onAuthStateChanged(processFirebaseAuthChange)
      wocky = (getParent(self) as any).wocky // wocky could be null for HMR (?)
      // setup dynamic links
      unsubscribe = firebase.links().onLink(onFirebaseDynamicLink)
      // get initial link
      firebase
        .links()
        .getInitialLink()
        .then((url: string | null) => {
          if (url) onFirebaseDynamicLink(url)
        })

      // listen for Dynamic Link invite codes and redeem once user is logged in
      when(
        () => !!self.inviteCode && !!wocky.profile && !!wocky.profile.handle && !!self.inviteCode,
        async () => {
          try {
            await wocky.userInviteRedeemCode(self.inviteCode!)
            analytics.track('invite_code_redeem', {code: self.inviteCode})
          } catch (err) {
            analytics.track('invite_code_redeem_fail', {code: self.inviteCode, error: err})
          }
          self.setInviteCode(undefined)
        }
      )
    }

    function beforeDestroy() {
      unsubscribe()
    }

    // NOTE: this is not a MST action
    async function processFirebaseAuthChange(user: any) {
      logger.log('FIREBASESTORE: AUTH STATE CHANGED')
      if (user) {
        try {
          await auth!.currentUser!.reload()
          const token = await auth!.currentUser!.getIdToken(true)
          self.setState({token})
          // await firebase.auth().currentUser.updateProfile({phoneNumber: user.providerData[0].phoneNumber, displayName: '123'});)
        } catch (err) {
          logger.warn('Firebase onAuthStateChanged error:', err)
          analytics.track('auth_error_firebase', {error: err})
          if (wocky && wocky.profile && wocky.connected) {
            wocky.logout()
          }
        }
      } else if (wocky && wocky.profile && wocky.connected) {
        wocky.logout()
      }
    }

    const getLoginCredentials = function() {
      if (self.token) {
        return {typ: 'firebase', sub: self.token}
      } else {
        return {}
      }
    }

    const onLogout = flow(function*() {
      analytics.track('logout')
      if (self.token) {
        self.token = null
        try {
          yield auth.signOut()
        } catch (err) {
          analytics.track('error_firebase_logout', {error: err})
          logger.warn('firebase logout error', err)
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
        return true
      } catch (err) {
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
        yield confirmResult.confirm(code)
        register()
        analytics.track('verify_confirmation_success')
      } catch (err) {
        analytics.track('verify_confirmation_fail', {error: err, code})
        logger.warn('confirmation fail', err)
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
      when(() => !!self.token, registerWithToken)
    }

    const registerWithToken = flow(function*() {
      try {
        self.setState({buttonText: 'Connecting...'})
        yield wocky.login(self.providerName)
        self.setState({buttonText: 'Verify', registered: true})
      } catch (err) {
        logger.warn('RegisterWithToken error', err)
        self.setState({errorMessage: 'Error registering, please try again'})
        analytics.track('error_firebase_register', {error: err})
      } finally {
        self.setState({
          buttonText: 'Verify',
          errorMessage: '',
        })
      }
    })

    // TODO: use rn-firebase for dynamic link generation when it's less broken
    const getFriendInviteLink = flow(function*() {
      const apiKey = 'AIzaSyCt7Lb8cjTHNWLuvSZEXFDKef54x4Es3N8'
      let code = yield wocky.userInviteMakeCode()
      code = encodeURIComponent(code) // need this for maintaining valid URL

      // https://firebase.google.com/docs/reference/dynamic-links/link-shortener
      const raw = yield fetch(
        `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            dynamicLinkInfo: {
              dynamicLinkDomain: settings.isStaging
                ? 'tinyrobotstaging.page.link'
                : 'tinyrobot.page.link',
              link: `https://tinyrobot.com/${codeUrlString}${code}`,
              iosInfo: {
                iosBundleId: settings.isStaging
                  ? 'com.hippware.ios.ChatStaging'
                  : 'com.hippware.tinyrobot',
                iosAppStoreId: '1295678402', // since there is no app store listing for Staging no need to differentiate
              },
            },
          }),
        }
      )
      const resp = yield raw.json()
      analytics.track('invite_code_create', {code: resp.shortLink})
      return resp.shortLink
    }) as () => Promise<string>

    return {
      afterAttach,
      getLoginCredentials,
      onLogout,
      beforeDestroy,
      verifyPhone,
      confirmCode,
      resendCode,
      getFriendInviteLink,
    }
  })

export default FirebaseStore

type FirebaseStoreType = typeof FirebaseStore.Type
export interface IFirebaseStore extends FirebaseStoreType {}

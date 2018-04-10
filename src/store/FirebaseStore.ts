import {types, getEnv, flow, getParent} from 'mobx-state-tree'
import {when} from 'mobx'
import {IWocky} from 'wocky-client'

type State = {
  phone?: string
  token?: string
  resource?: string
  buttonText?: string
  registered?: boolean
  errorMessage?: string
}

const FirebaseStore = types
  .model('FirebaseStore', {
    phone: '',
    token: types.maybe(types.string),
    resource: types.maybe(types.string),
  })
  .volatile(() => ({
    buttonText: 'Verify',
    registered: false,
    errorMessage: '', // to avoid strange typescript errors when set it to string or null,
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
  }))
  .actions(self => {
    const {auth, logger, analytics} = getEnv(self)
    let wocky: IWocky
    let confirmResult: any

    function afterAttach() {
      auth.onAuthStateChanged(processFirebaseAuthChange)
      wocky = getParent(self).wocky
    }

    // NOTE: this is not a MST action
    async function processFirebaseAuthChange(user: any) {
      logger.log('FIREBASESTORE: AUTH STATE CHANGED')
      if (user) {
        try {
          await auth.currentUser.reload()
          const token = await auth.currentUser.getIdToken(true)
          self.setState({token})
          // await firebase.auth().currentUser.updateProfile({phoneNumber: user.providerData[0].phoneNumber, displayName: '123'});)
        } catch (err) {
          logger.warn('Firebase onAuthStateChanged error:', err)
          analytics.track('auth_error_firebase', {error: err})
          if (wocky.profile && wocky.connected) {
            wocky.logout()
          }
        }
      } else if (wocky.profile && wocky.connected) {
        wocky.logout()
      }
    }

    const logout = flow(function*() {
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
      try {
        yield wocky.logout()
      } catch (err) {
        analytics.track('error_wocky_logout', {error: err})
        logger.warn('wocky logout error', err)
      }
      self.reset()
      confirmResult = null
      return true
    })

    const verifyPhone = flow(function*({phone}: any) {
      self.phone = phone
      try {
        self.errorMessage = ''
        analytics.track('sms_confirmation_try')
        confirmResult = yield auth.signInWithPhoneNumber(phone)
        analytics.track('sms_confirmation_success')
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
            // message = err.message;
            self.errorMessage =
              'Error verifying phone number. Please check the number and try again.'
        }
        throw err
      }
    })

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
      try {
        analytics.track('resend_code_try')
        yield verifyPhone({phone: self.phone})
        analytics.track('resend_code_success')
      } catch (err) {
        analytics.track('resend_code_fail', {error: err})
        throw err
      }
      return true
    })

    // const register = flow(function* register(token: string) {
    function register(): void {
      self.setState({buttonText: 'Registering...'})
      // TODO: set a timeout on firebase register
      when(() => !!self.token, registerWithToken)
    }

    const registerWithToken = flow(function*() {
      try {
        yield wocky!.register({jwt: self.token})
        self.setState({buttonText: 'Connecting...'})
        yield wocky.login()
        self.setState({buttonText: 'Verify', registered: true})
      } catch (err) {
        logger.warn('RegisterWithToken error', err)
        self.setState({errorMessage: 'Error registering, please try again'})
        analytics.track('error_firebase_register', err)
      } finally {
        self.setState({
          buttonText: 'Verify',
          errorMessage: '',
        })
      }
    })

    return {afterAttach, logout, verifyPhone, confirmCode, resendCode}
  })

export default FirebaseStore

type FirebaseStoreType = typeof FirebaseStore.Type
export interface IFirebaseStore extends FirebaseStoreType {}

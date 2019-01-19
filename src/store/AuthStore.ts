import {types, Instance, getParent, flow} from 'mobx-state-tree'
import {Credentials} from 'wocky-client'
import analytics from 'src/utils/analytics'

const AuthStore = types
  .model('AuthStore', {
    phone: types.maybe(types.string),
    isFirebase: types.maybe(types.boolean),
  })
  .views(self => ({
    get canLogin(): boolean {
      return !!self.phone && self.isFirebase !== undefined
    },
  }))
  .actions(self => {
    const {firebaseStore, wocky, homeStore, locationStore} = getParent<any>(self)

    return {
      setPhone: (phone: string) => (self.phone = phone),

      setIsFirebase: (isFirebase: boolean) => (self.isFirebase = isFirebase),

      register: (phone: string, isFirebase: boolean) => {
        self.phone = phone
        self.isFirebase = isFirebase
      },

      login: flow(function*() {
        try {
          let credentials: Credentials

          if (!self.canLogin) {
            throw new Error('Phone number and provider must be set before login.')
          }

          if (self.isFirebase) {
            credentials = {
              phone_number: self.phone,
              ...(yield firebaseStore.getLoginCredentials()),
            }
          } else {
            // bypass login
            // Since users need to have unique `sub`s so we'll just use phoneNumber in the case of a bypass login
            // https://hippware.slack.com/archives/C033TRJDD/p1543459452073900
            credentials = {typ: 'bypass', sub: self.phone!, phone_number: self.phone}
          }
          return wocky.login(credentials)
        } catch (error) {
          analytics.track('error_connection', {error})
        }
      }),

      logout(): Promise<boolean> {
        homeStore.onLogout()
        locationStore.onLogout()
        if (self.isFirebase) {
          firebaseStore.logout()
        }
        self.phone = undefined
        self.isFirebase = undefined
        return wocky.logout()
      },
    }
  })

export default AuthStore

export interface IAuthStore extends Instance<typeof AuthStore> {}

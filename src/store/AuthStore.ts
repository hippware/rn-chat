import {types, Instance, getParent} from 'mobx-state-tree'
import analytics from 'src/utils/analytics'
import strategies, {AuthStrategy, Strategy} from './authStrategies'

const AuthStore = types
  .model('AuthStore', {
    phone: types.maybe(types.string),
    strategyName: types.optional(types.enumeration(['firebase', 'bypass']), 'firebase'),
  })
  .views(self => ({
    get canLogin(): boolean {
      return !!self.phone
    },
  }))
  .actions(self => {
    const store = getParent<any>(self)
    const {wocky, homeStore, locationStore} = store
    let strategy: AuthStrategy | null = null

    return {
      register: (phone: string, s: Strategy) => {
        self.phone = phone
        self.strategyName = s
      },

      login(): Promise<boolean> {
        try {
          if (!self.canLogin) {
            throw new Error('Phone number must be set before login.')
          }
          strategy = strategies[self.strategyName]
          return strategy.login(store)
        } catch (error) {
          analytics.track('& error_connection', {error})
        }
        return Promise.resolve(false)
      },

      logout(): Promise<boolean> {
        homeStore.onLogout()
        locationStore.onLogout()
        if (strategy!.logout(store)) {
          self.phone = undefined
          self.strategyName = 'firebase'
          strategy = null
          return wocky.logout()
        }
        return Promise.resolve(false)
      },
    }
  })

export default AuthStore

export interface IAuthStore extends Instance<typeof AuthStore> {}

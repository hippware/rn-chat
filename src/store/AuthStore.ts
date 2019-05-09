import {types, Instance, getParent, flow, applySnapshot} from 'mobx-state-tree'
import analytics from 'src/utils/analytics'
import strategies, {AuthStrategy, Strategy} from './authStrategies'
import {bugsnagNotify} from 'src/utils/bugsnagConfig'

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
            throw new Error('Login not possible.')
          }
          strategy = strategies[self.strategyName]
          return strategy.login(store)
        } catch (error) {
          bugsnagNotify(error, 'error_connection')
          analytics.track('error_connection', {error})
          return Promise.reject(error)
        }
      },

      logout: flow(function*() {
        homeStore.logout()
        locationStore.logout()
        if (strategy) {
          yield strategy.logout(store)
        }
        applySnapshot(self, {})
        strategy = null
        yield wocky.logout()
        return true
      }),
    }
  })

export default AuthStore

export interface IAuthStore extends Instance<typeof AuthStore> {}

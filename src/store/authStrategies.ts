import {Credentials} from './AppInfo'

export type AuthStrategy = {
  login: (store) => Promise<boolean>
  logout: (store) => Promise<void>
}

export type Strategy = 'firebase' | 'bypass'

interface IStrategies {
  [key: string]: AuthStrategy
}

const Strategies: IStrategies = {
  firebase: {
    login: async store => {
      const {wocky, firebaseStore, authStore, appInfo} = store
      const credentials: Credentials = await firebaseStore.getLoginCredentials()

      return wocky.login(await appInfo.token({...credentials, phone_number: authStore.phone}))
    },
    logout: async store => {
      return store.firebaseStore.logout()
    },
  },
  bypass: {
    login: async store => {
      const {
        authStore: {phone},
        wocky,
        appInfo,
      } = store
      // Since users need to have unique `sub`s so we'll just use phoneNumber in the case of a bypass login
      // https://hippware.slack.com/archives/C033TRJDD/p1543459452073900
      const credentials: Credentials = {typ: 'bypass', sub: phone, phone_number: phone}
      return wocky.login(await appInfo.token(credentials))
    },
    logout: Promise.resolve,
  },
}

export default Strategies

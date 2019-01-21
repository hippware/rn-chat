import {Credentials} from 'wocky-client'

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
      const {wocky, firebaseStore} = store
      const credentials: Credentials = await firebaseStore.getLoginCredentials()
      return wocky.login(credentials)
    },
    logout: async store => {
      return store.firebaseStore.logout()
    },
  },
  bypass: {
    login: async store => {
      const {authStore: {phone}, wocky} = store
      // Since users need to have unique `sub`s so we'll just use phoneNumber in the case of a bypass login
      // https://hippware.slack.com/archives/C033TRJDD/p1543459452073900
      const credentials: Credentials = {typ: 'bypass', sub: phone, phone_number: phone}
      return wocky.login(credentials)
    },
    logout: Promise.resolve,
  },
}

export default Strategies

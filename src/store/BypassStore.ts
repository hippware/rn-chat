import {types, flow} from 'mobx-state-tree'
import {registerProvider} from 'wocky-client'

// This class implements ILoginProvider from 'wocky-client'
//   but I don't think there's a way to declare this with MST stores?
const BypassStore = types
  .model('BypassStore', {
    phone: '',
    providerName: 'bypass',
  })
  .actions(self => {
    return {
      afterAttach: () => {
        registerProvider(self.providerName, self as any)
      },
      setPhone: phone => {
        self.phone = phone
      },
      getLoginCredentials: flow(function*() {
        // Since users need to have unique `sub`s so we'll just use phoneNumber in the case of a bypass login
        // https://hippware.slack.com/archives/C033TRJDD/p1543459452073900
        return self.phone ? {typ: 'bypass', sub: self.phone, phone_number: self.phone} : {}
      }),
      onLogout: flow(function*() {
        self.phone = ''
      }),
    }
  })

export default BypassStore
type BypassStoreType = typeof BypassStore.Type
export interface IBypassStore extends BypassStoreType {}

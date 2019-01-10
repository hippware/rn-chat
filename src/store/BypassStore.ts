import {types, flow} from 'mobx-state-tree'

// This class implements ILoginProvider from 'wocky-client'
//   but I don't think there's a way to declare this with MST stores?
const BypassStore = types
  .model('BypassStore', {
    phone: '',
  })
  .views(self => {
    return {
      get providerName() {
        // This needs to match the member variable of getRoot/getParent that points to an instance of this object
        // Is there a way to auto-discover this?
        return 'bypassStore'
      },
    }
  })
  .actions(self => {
    return {
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

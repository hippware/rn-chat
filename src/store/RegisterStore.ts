// tslint:disable-next-line:no_unused-variable
import {types, flow, getEnv, IModelType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
import Utils from './utils'
import IQStore from './IQStore'

export default types
  .compose(IQStore, types.model('XmppRegister', {}))
  .actions(self => {
    const {provider} = getEnv(self)
    return {
      register: flow(function*(data: any, providerName = 'digits') {
        const password = `$J$${JSON.stringify({
          provider: providerName,
          resource: self.resource,
          token: true,
          provider_data: data!
        })}`
        try {
          yield provider.login('register', password, self.host, self.resource)
        } catch (error) {
          yield self.disconnect()
          let d
          try {
            const xml = new DOMParser().parseFromString(error, 'text/xml').documentElement
            d = Utils.parseXml(xml).failure
          } catch (e) {
            throw error
          }
          if ('redirect' in d) {
            const {user, server, token} = JSON.parse(d.text)
            // modify provider host to response's server
            provider.host = server!
            self.host = server!
            self.username = user!
            self.password = token!
            return {user, server, password: token}
          } else {
            throw d.text ? new Error(d.text) : error
          }
        }
      })
    }
  })
  .actions(self => {
    return {
      testRegister: flow(function* testRegister({phoneNumber}: {phoneNumber: string}) {
        try {
          yield self.register({
            userID: `000000${phoneNumber}`,
            phoneNumber: `+1555${phoneNumber}`,
            authTokenSecret: '',
            authToken: '',
            emailAddressIsVerified: false,
            'X-Auth-Service-Provider': 'http://localhost:9999',
            emailAddress: '',
            'X-Verify-Credentials-Authorization': ''
          })
          return true
        } catch (error) {
          console.log('testRegister error', error)
        }
        return false
      })
    }
  })

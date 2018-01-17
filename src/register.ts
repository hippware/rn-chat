// tslint:disable-next-line:no_unused-variable
import {types, flow, getEnv, IModelType} from 'mobx-state-tree'
import Utils from './utils'
import message from './message'

export default types.compose(message, types.model('XmppRegister', {})).actions(self => {
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
        provider.disconnectAfterSending()
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

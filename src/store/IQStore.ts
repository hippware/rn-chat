// tslint:disable-next-line:no_unused-variable
import {types, flow, getEnv, IModelType} from 'mobx-state-tree'
import Utils from './utils'
import {when} from 'mobx'
import connect from './ConnectStore'

const iqStore = types
  // export default types
  .compose(
    connect,
    types.model('XmppIQ', {
      iq: types.frozen
    })
  )
  .named('IQStore')
  .actions(self => {
    return {
      onIQ: (iq: any) => (self.iq = iq)
    }
  })
  .actions(self => {
    const {provider} = getEnv(self)
    return {
      afterCreate: () => {
        self.iq = {}
        provider.onIQ = self.onIQ
      },
      sendIQ: flow(function*(data: any, withoutTo: boolean = false) {
        if (!data.tree().getAttribute('id')) {
          data.tree().setAttribute('id', Utils.getUniqueId('iq'))
        }
        if (!data.tree().getAttribute('to') && !withoutTo) {
          data.tree().setAttribute('to', self.host!)
        }
        if (!data.tree().getAttribute('from')) {
          data.tree().setAttribute('from', `${self.username!}@${self.host}`)
        }
        const id = data.tree().getAttribute('id')
        provider.sendIQ(data)
        return yield new Promise((resolve, reject) =>
          when(
            () => self.iq && self.iq.id === id,
            () => {
              const stanza = self.iq
              if (stanza.type === 'error') {
                reject(stanza.error && stanza.error.text ? stanza.error.text['#text'] : stanza.error)
                // reject('ERROR for stanza: ' + data.toString() + ' ' + (stanza.error && stanza.error.text ? stanza.error.text['#text'] : stanza.error))
              } else {
                resolve(stanza)
              }
            }
          )
        )
      })
    }
  })

export default iqStore

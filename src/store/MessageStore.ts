// tslint:disable-next-line:no_unused-variable
import {types, getEnv, IModelType} from 'mobx-state-tree'
import iq from './IQStore'

const MEDIA = 'hippware.com/hxep/media'

export default types
  .compose(
    iq,
    types.model('XmppMessage', {
      message: types.frozen
    })
  )
  .named('MessageStore')
  .actions(self => {
    return {
      onMessage: (message: any) => (self.message = message)
    }
  })
  .actions(self => {
    const {provider} = getEnv(self)
    return {
      afterCreate: () => {
        self.message = {}
        provider.onMessage = self.onMessage
      },
      sendMessage: (msg: any) => {
        let stanza = $msg({
          to: `${msg!.to!}@${self.host}`,
          type: 'chat',
          id: msg.id
        })
          .c('body')
          .t(msg.body || '')
        if (msg.media) {
          stanza = stanza
            .up()
            .c('image', {xmlns: MEDIA})
            .c('url')
            .t(msg.media)
        }
        provider.sendStanza(stanza)
      }
    }
  })

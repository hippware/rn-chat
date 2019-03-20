import {types, Instance, SnapshotIn, flow, getParent} from 'mobx-state-tree'
import {Profile} from './Profile'
import {FileRef} from './File'
import {createUploadable} from './Uploadable'
import {Timeable} from './Timeable'
import {createPaginable} from './PaginableList'
import _ from 'lodash'

const MessageBase = types.model('MessageBase', {
  id: types.identifier,
  otherUser: types.reference(Profile),
  content: '',
  media: FileRef,
  unread: false,
  isOutgoing: types.boolean,
})

export function createMessage(params: any, service: any): IMessage {
  if (params.otherUser) {
    params.otherUser = params.otherUser.id
  }
  if (params.media) {
    params.media = service.files.get(params.media.id, params.media)
  }
  return Message.create(params)
}

export const Message = types
  .compose(
    Timeable,
    createUploadable('media', (self: any) => `user:${self.otherUser.id}@${self.service.host}`),
    MessageBase
  )
  .named('Message')
  .actions(self => ({
    setUnread: (unread: boolean) => (self.unread = unread),
    clear: () => {
      self.media = null
      self.content = ''
    },
    setBody: (text: string) => {
      self.content = text
    },
  }))
  .actions(self => ({
    send: flow(function*() {
      self.time = Date.now()
      const wocky: any = getParent(self, 4)
      yield wocky._sendMessage(self)
      self.clear()
    }),
  }))

export interface IMessage extends Instance<typeof Message> {}
export interface IMessageIn extends SnapshotIn<typeof Message> {}

export const MessagePaginableList = createPaginable<IMessage>(Message, 'MessageList')

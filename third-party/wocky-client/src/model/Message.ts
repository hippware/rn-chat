import {types, Instance, SnapshotIn, flow, getParent} from 'mobx-state-tree'
import {Profile} from './Profile'
import {FileRef} from './File'
import {createUploadable} from './Uploadable'
import {Timeable} from './Timeable'
import {createPaginable, IPaginable} from './PaginableList'
import {IWocky} from '../index'
import uuid from 'uuid/v1'
import _ from 'lodash'

const MessageBase = types.model('MessageBase', {
  id: types.optional(types.string, () => uuid()),
  otherUser: types.reference(Profile),
  content: '',
  media: FileRef,
  unread: false,
  isOutgoing: types.boolean,
})

export function createMessage(params: any, service: IWocky): IMessage {
  params = _.cloneDeep(params)
  if (params.otherUser) {
    params.otherUser = service.profiles.get(params.otherUser.id, params.otherUser)
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
    read: () => (self.unread = false),
    clear: () => {
      self.media = null
      self.content = ''
      self.id = uuid()
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

export const MessagePaginableList = createPaginable<IMessage>(Message)
export interface IMessageList extends IPaginable<IMessage> {}

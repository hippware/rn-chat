import {types, Instance, SnapshotIn, flow, getParent} from 'mobx-state-tree'
import {Profile} from './Profile'
import {File} from './File'
import * as utils from '../transport/utils'
import {Base} from './Base'
import {createUploadable} from './Uploadable'
import {Timeable} from './Timeable'
import {createPaginable, IPaginable} from './PaginableList'
const moment = require('moment')
import uuid from 'uuid/v1'

const MessageBase = types.model('MessageBase', {
  id: types.optional(types.string, () => uuid()),
  otherUser: types.reference(Profile),
  content: '',
  media: FileRef,
  unread: false,
  isOutgoing: types.boolean,
})

export const Message = types
  .compose(
    Timeable,
    createUploadable('media', (self: any) => `user:${self.to}@${self.service.host}`)
    MessageBase
  )
  .named('Message')
  .views(self => ({
    get date() {
      return moment(self.time).calendar()
    },
  }))
  .actions(self => ({
    read: () => (self.unread = false),
    clear: () => {
      self.media = undefined
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

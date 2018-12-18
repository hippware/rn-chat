import {types, Instance, SnapshotIn, flow} from 'mobx-state-tree'
import {Profile} from './Profile'
import {FileRef} from './File'
import * as utils from '../transport/utils'
import {Base} from './Base'
import {createUploadable} from './Uploadable'
import {Timeable} from './Timeable'
import {createPaginable, IPaginable} from './PaginableList'
const moment = require('moment')

export const Message = types
  .compose(
    types.compose(
      Base,
      Timeable,
      createUploadable('media', (self: any) => `user:${self.to}@${self.service.host}`)
    ),
    types.model('Message', {
      id: types.optional(types.string, utils.generateID),
      // archiveId: '',
      from: types.reference(Profile),
      to: types.reference(Profile),
      media: FileRef,
      unread: false,
      body: '',
      createdAt: types.maybe(types.Date),
    })
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
      self.media = null
      self.body = ''
      self.id = utils.generateID()
    },
    setBody: (text: string) => {
      self.body = text
    },
  }))
  .actions(self => ({
    send: flow(function*() {
      self.time = Date.now()
      yield self.service._sendMessage(self)
      self.clear()
    }),
  }))
export interface IMessage extends Instance<typeof Message> {}
export interface IMessageIn extends SnapshotIn<typeof Message> {}

export const MessagePaginableList = createPaginable<IMessage>(Message)
export interface IMessageList extends IPaginable<IMessage> {}

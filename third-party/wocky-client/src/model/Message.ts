import {types, Instance} from 'mobx-state-tree'
import {Profile} from './Profile'
import {FileRef} from './File'
import * as utils from '../transport/utils'
import {Base} from './Base'
import {createUploadable} from './Uploadable'
import {Timeable} from './Timeable'
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
      archiveId: '',
      from: types.maybeNull(types.reference(Profile)),
      to: '', // todo: should this be a profile ref?
      media: FileRef,
      unread: false,
      body: '',
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
    send: () => {
      self.time = Date.now()
      self.service._sendMessage(self)
      self.clear()
    },
  }))
export interface IMessage extends Instance<typeof Message> {}

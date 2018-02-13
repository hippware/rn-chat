// tslint:disable-next-line:no_unused-variable
import {types, flow, IModelType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
import {Profile} from './Profile'
import {File} from './File'
import utils from '../store/utils'
import {Base} from './Base'
import {createUploadable} from './Uploadable'
import {Timeable} from './Timeable'

const moment = require('moment')

export const Message = types
  .compose(
    types.compose(Base, Timeable, createUploadable('media', (self: any) => `user:${self.to}@${self.service.host}`)),
    types.model('Message', {
      id: types.optional(types.string, utils.generateID),
      archiveId: '',
      from: types.maybe(types.reference(Profile)),
      to: '',
      media: types.maybe(types.reference(File)),
      unread: false,
      body: ''
    })
  )
  .named('Message')
  .views(self => ({
    get date() {
      return moment(self.time).calendar()
    }
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
    }
  }))
  .actions(self => ({
    send: () => {
      self.service._sendMessage(self)
      self.clear()
    }
  }))
export type IMessage = typeof Message.Type

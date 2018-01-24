// tslint:disable-next-line:no_unused-variable
import {types, flow, IModelType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
import {Profile} from './Profile'
import {File} from './File'
import utils from '../store/utils'
import moment = require('moment')

export const Message = types
  .model('Message', {
    id: types.optional(types.identifier(types.string), utils.generateID),
    archiveId: '',
    isArchived: false,
    from: types.reference(Profile),
    to: '',
    media: types.maybe(File),
    unread: false,
    time: types.optional(types.number, () => Date.now()),
    body: ''
  })
  .named('Message')
  .views(self => ({
    get date() {
      return moment(self.time).calendar()
    }
  }))
  .actions(self => ({
    read: () => (self.unread = false)
  }))
export type IMessage = typeof Message.Type

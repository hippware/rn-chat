// tslint:disable-next-line:no_unused-variable
import {types, IModelType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
import {File} from './File'
import {Profile} from './Profile'
import {createPaginable} from './PaginableList'

const moment = require('moment')

export const BotPost = types
  .model('BotPost', {
    id: types.identifier(types.string),
    content: '',
    title: '',
    image: types.maybe(types.reference(File)),
    profile: types.reference(Profile),
    time: types.optional(types.number, () => Date.now())
  })
  .volatile(self => ({
    imageSaving: false
  }))
  .views(self => ({
    get date(): Date {
      return new Date(self.time)
    },
    get dateAsString(): string {
      return moment(self.time).calendar()
    },
    get relativeDateAsString(): string {
      return moment(self.time).fromNow(true)
    }
  }))

export type IBotPost = typeof BotPost.Type
export const BotPostPaginableList = createPaginable(BotPost)
export type IBotPostPaginableList = typeof BotPostPaginableList.Type

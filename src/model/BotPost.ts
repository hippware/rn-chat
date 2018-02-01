// tslint:disable-next-line:no_unused-variable
import {types, flow, getParent, IModelType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
import {File} from './File'
import {Profile} from './Profile'
import {Base} from './Base'
import {createPaginable} from './PaginableList'
import {createUploadable} from './Uploadable'
import {Timeable} from './Timeable'

export const BotPost = types
  .compose(
    types.compose(Base, Timeable),
    createUploadable('image', (self: any) => `redirect:${getParent(self).server}/bot/${getParent(self).id}`),
    types.model('BotPost', {
      id: types.identifier(types.string),
      content: '',
      title: '',
      image: types.maybe(types.reference(File)),
      profile: types.reference(Profile)
    })
  )
  .named('BotPost')
  .actions(self => ({
    setContent: (content: string) => (self.content = content),
    setTitle: (title: string) => (self.title = title),
    publish: flow(function*() {
      yield self.service._publishBotPost(self)
    })
  }))

export type IBotPost = typeof BotPost.Type
export const BotPostPaginableList = createPaginable(BotPost)
export type IBotPostPaginableList = typeof BotPostPaginableList.Type

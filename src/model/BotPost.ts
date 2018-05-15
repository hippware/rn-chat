// tslint:disable-next-line:no_unused-variable
import {types, flow, getParent, IModelType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
import {FileRef} from './File'
import {ProfileRef} from './Profile'
import {Base} from './Base'
import {Loadable} from './Loadable'
import {createPaginable, IPaginable} from './PaginableList'
import {IBot} from './Bot'
import {createUploadable} from './Uploadable'
import {Timeable} from './Timeable'

// known typescript issue: https://github.com/mobxjs/mobx-state-tree#known-typescript-issue-5938
export type __IPaginable = IPaginable
export type __IBot = IBot

export const BotPost = types
  .compose(
    types.compose(Base, Timeable, Loadable),
    createUploadable(
      'image',
      (self: any) => `redirect:${self.service.host}/bot/${getParent(getParent(getParent(self))).id}`
    ),
    types.model('BotPost', {
      id: types.identifier(types.string),
      content: '',
      title: '',
      image: FileRef,
      profile: ProfileRef,
    })
  )
  .named('BotPost')
  .actions(self => ({
    setContent: (content: string) => (self.content = content),
    setTitle: (title: string) => (self.title = title),
    publish: flow(function*() {
      yield self.service._publishBotPost(self)
    }),
  }))

export type IBotPost = typeof BotPost.Type
export const BotPostPaginableList = createPaginable(BotPost)
// export type IBotPostPaginableList = typeof BotPostPaginableList.Type

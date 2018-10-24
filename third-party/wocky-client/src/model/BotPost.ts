import {types, flow, getParent} from 'mobx-state-tree'
import {FileRef} from './File'
import {ProfileRef} from './Profile'
import {Base} from './Base'
import {Loadable} from './Loadable'
import {createPaginable} from './PaginableList'
import {createUploadable} from './Uploadable'
import {Timeable} from './Timeable'

export const BotPost = types
  .compose(
    types.compose(Base, Timeable, Loadable),
    createUploadable(
      'image',
      (self: any) => `redirect:${self.service.host}/bot/${getParent(getParent(getParent(self))).id}`
    ),
    types.model('BotPost', {
      id: types.identifier,
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
export const BotPostPaginableList = createPaginable<IBotPost>(BotPost)

export interface IBotPostData {
  id: string
  content?: string
  title?: string
  image?: any
  profile: string
}

import {types, flow, getParent, IAnyModelType, Instance} from 'mobx-state-tree'
import {FileRef} from './File'
import {Base} from './Base'
import {Loadable} from './Loadable'
import {createPaginable} from './PaginableList'
import {createUploadable} from './Uploadable'
import {Timeable} from './Timeable'
import {Profile} from './Profile'

const BotPostProfileRef = types.late('LazyProfileRef', (): IAnyModelType => Profile)

const BotPostData = types.model('BotPostData', {
  id: types.identifier,
  content: '',
  title: '',
  image: FileRef,
  profile: types.reference(BotPostProfileRef),
})

export const BotPost = types
  .compose(
    types.compose(Base, Timeable, Loadable),
    createUploadable(
      'image',
      (self: any) =>
        `redirect:${self.service.host}/bot/${(getParent(getParent(getParent(self))) as any).id}`
    ),
    BotPostData
  )
  .named('BotPost')
  .actions(self => ({
    setContent: (content: string) => (self.content = content),
    setTitle: (title: string) => (self.title = title),
    publish: flow(function*() {
      yield self.service._publishBotPost(self)
    }),
  }))

export interface IBotPost extends Instance<typeof BotPost> {}

export const BotPostPaginableList = createPaginable<IBotPost>(BotPost)

export interface IBotPostData extends Instance<typeof BotPostData> {}

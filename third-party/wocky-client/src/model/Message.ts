import {types, Instance, SnapshotIn, flow} from 'mobx-state-tree'
import {Profile} from './Profile'
import {FileRef} from './File'
import {createUploadable} from './Uploadable'
import {Timeable} from './Timeable'
import {createPaginable} from './PaginableList'
import _ from 'lodash'
import {Base} from './Base'

enum Status {
  Init = 0,
  Sending = 1,
  Sent = 2,
  Error = 3,
}

const MessageBase = types.compose(
  Base,
  types.model('MessageBase', {
    id: types.identifier,
    otherUser: types.reference(Profile),
    content: '',
    media: FileRef,
    unread: false,
    isOutgoing: types.boolean,
  })
)

export function createMessage(params: any, service: any): IMessage {
  if (params.otherUser) {
    params.otherUser = service.profiles.get(params.otherUser.id, params.otherUser)
  }
  if (params.media) {
    params.media = service.files.get(params.media.id, params.media)
  }
  return Message.create(params)
}

export const Message = types
  .compose(
    Timeable,
    createUploadable('media', (self: any) => `user:${self.otherUser.id}@${self.service.host}`),
    MessageBase
  )
  .volatile(self => ({
    status: Status.Init,
  }))
  .named('Message')
  .actions(self => ({
    setStatus: (state: Status) => {
      self.status = state
    },
    setUnread: (unread: boolean) => (self.unread = unread),
    clear: () => {
      self.status = Status.Init
      self.media = null
      self.content = ''
    },
    setBody: (text: string) => {
      self.content = text
    },
  }))
  .actions(self => ({
    send: flow(function*() {
      try {
        self.setStatus(Status.Sending)
        // check if file is not uploaded
        if (self.file && !self.uploaded) {
          yield self.upload()
        }
        yield self.transport.sendMessage(
          (self.otherUser!.id || self.otherUser!) as string,
          self.content.length ? self.content : undefined,
          self.media ? self.media.id : undefined
        )
        self.setStatus(Status.Sent)
      } catch (e) {
        throw e
        self.setStatus(Status.Error)
      }
    }),
  }))

export interface IMessage extends Instance<typeof Message> {}
export interface IMessageIn extends SnapshotIn<typeof Message> {}

export const MessagePaginableList = createPaginable<IMessage>(Message, 'MessageList')

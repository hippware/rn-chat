import {types, Instance, SnapshotIn, getParentOfType} from 'mobx-state-tree'
import {Message, MessagePaginableList} from './Message'
import {Wocky} from '../store/Wocky'
import {Profile} from './Profile'
const moment = require('moment')
import uuid from 'uuid/v1'

export const Chat = types
  .model('Chat', {
    id: types.string, // NOTE: id === otherUser.id
    loaded: false,
    otherUser: types.reference(Profile),
    messages: types.optional(MessagePaginableList, {}),
    message: types.maybeNull(Message),
    active: false,
  })
  .volatile(() => ({
    loading: false,
  }))
  .views(self => ({
    get sortedMessages() {
      return self.messages.list!.sort((a, b) => a.time - b.time)
    },
    get unreadCount(): number {
      return self.messages.list.reduce((prev, current) => prev + (current.unread ? 1 : 0), 0)
    },
  }))
  .views(self => ({
    get time() {
      return self.messages.last ? self.messages.last.time : Date.now()
    },
  }))
  .views(self => ({
    get date() {
      return moment(self.time).calendar()
    },
  }))
  .actions(self => {
    return {
      setActive: (active: boolean) => (self.active = active),
      readAll: () => self.messages.list.forEach(msg => msg.setUnread(false)),
    }
  })
  .actions((self: any) => ({
    afterAttach: () => {
      // todo: strong typing
      const service: any = getParentOfType(self, Wocky)
      self.message = Message.create({
        // todo
        id: uuid(),
        otherUser: self.id,
        isOutgoing: true,
      })
      self.messages.setRequest(service._loadChatMessages.bind(service, self.id))
    },
  }))

export interface IChat extends Instance<typeof Chat> {}
export interface IChatIn extends SnapshotIn<typeof Chat> {}

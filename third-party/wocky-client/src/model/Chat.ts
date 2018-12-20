import {types, Instance, SnapshotIn, getParentOfType} from 'mobx-state-tree'
import {Message, MessagePaginableList, IMessageList} from './Message'
import {Wocky} from '../store/Wocky'
import {Profile} from './Profile'
const moment = require('moment')

export const Chat = types
  .model('Chat', {
    id: types.string, // NOTE: id === otherUser.id
    active: false,
    loaded: false,
    otherUser: types.reference(Profile),
    messages: types.optional(MessagePaginableList, {}),
    message: types.maybeNull(Message),
  })
  .volatile(() => ({
    loading: false,
  }))
  .views(self => ({
    get sortedMessages() {
      return (self.messages as IMessageList).list!.sort((a, b) => a.time - b.time)
    },
    get unreadCount(): number {
      return (self.messages as IMessageList).list!.reduce(
        (prev, current) => prev + (current.unread ? 1 : 0),
        0
      )
    },
  }))
  .views(self => ({
    get time() {
      return (self.messages as IMessageList).last ? self.messages.last.time : Date.now()
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
      readAll: () => (self.messages as IMessageList).list.forEach(msg => msg.read()),
    }
  })
  .actions((self: any) => ({
    afterAttach: () => {
      // todo: strong typing
      const service: any = getParentOfType(self, Wocky)
      self.message = Message.create({
        otherUser: self.id,
        isOutgoing: true,
      })
      ;(self.messages as IMessageList).setRequest(service._loadChatMessages.bind(service, self.id))
    },
  }))

export interface IChat extends Instance<typeof Chat> {}
export interface IChatIn extends SnapshotIn<typeof Chat> {}

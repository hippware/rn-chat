import {types, Instance, SnapshotIn} from 'mobx-state-tree'
import {Profile} from './Profile'
import {Message, MessagePaginableList, IMessageList} from './Message'
import {Base} from './Base'
const moment = require('moment')

export const Chat = types
  .compose(
    Base,
    types.model('Chat', {
      id: types.string, // HACK: id of `otherUser`
      active: false,
      loaded: false,
      requestedId: types.maybeNull(types.string),
      isPrivate: true,
      otherUser: types.reference(Profile),
      messages: types.optional(MessagePaginableList, {}),
      message: types.maybeNull(Message),
    })
  )
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
  .actions(self => ({
    afterAttach: () => {
      self.message = self.service.create(Message, {to: self.id, from: self.service.username!})
      ;(self.messages as IMessageList).setRequest(
        self.service._loadChatMessages.bind(self.service, self.id)
      )
    },
  }))

export interface IChat extends Instance<typeof Chat> {}
export interface IChatIn extends SnapshotIn<typeof Chat> {}

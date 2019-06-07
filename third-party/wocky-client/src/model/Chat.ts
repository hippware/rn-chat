import {types, flow, Instance, SnapshotIn} from 'mobx-state-tree'
import {Message, MessagePaginableList} from './Message'
import {Profile} from './Profile'
const moment = require('moment')
import uuid from 'uuid/v1'
import {Base} from './Base'
import {IChat} from '../model/Chat'
import {createMessage, IMessageIn} from '../model/Message'
import {PaginableLoadPromise} from '../transport/Transport'

export const Chat = types
  .compose(
    Base,
    types.model('Chat', {
      id: types.string, // NOTE: id === otherUser.id
      loaded: false,
      otherUser: types.reference(Profile),
      messages: types.optional(MessagePaginableList, {}),
      message: types.maybeNull(Message),
      active: false,
    })
  )
  .volatile(() => ({
    loading: false,
  }))
  .views(self => ({
    get sortedMessages() {
      return self.messages.list!.sort((a, b) => b.time - a.time)
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
  .actions(self => ({
    setActive: (active: boolean) => (self.active = active),
    readAll: () => self.messages.list.forEach(msg => msg.setUnread(false)),
    _loadMessages: flow(function*(lastId?: string, max: number = 20) {
      const {list, count, cursor} = yield self.transport.loadChatMessages(self.id, lastId, max)
      return {
        count,
        cursor,
        list: list.map(m => createMessage(m, self.service)),
      }
    }) as (userId: string, lastId?: string, max?: number) => PaginableLoadPromise<IMessageIn>,
  }))
  .actions((self: any) => ({
    afterAttach: () => {
      self.message = Message.create({
        id: uuid(),
        otherUser: self.id,
        isOutgoing: true,
      })
      self.messages.setRequest(self._loadMessages)
    },
    sendMessage(file?: any) {
      const id = Date.now() + ''
      self.messages.addToTop({
        ...self.message,
        id,
        time: Date.now(),
        otherUser: self.message.otherUser.id,
      })
      if (file) {
        self.messages.first.setFile(file)
      }
      self.messages.first.send()
      self.message.clear()
    },
  }))
  .postProcessSnapshot((snapshot: any) => {
    const res: any = {...snapshot}
    delete res.active
    // delete res.messages
    return res
  })

export interface IChat extends Instance<typeof Chat> {}
export interface IChatIn extends SnapshotIn<typeof Chat> {}

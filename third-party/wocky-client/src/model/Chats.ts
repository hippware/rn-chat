import {types, Instance, flow} from 'mobx-state-tree'
import {Chat, IChat, IChatIn} from './Chat'
import {createMessage, IMessageIn} from '../model/Message'
import {Base} from './Base'

export const Chats = types
  .compose(
    Base,
    types.model('Chats', {
      _list: types.optional(types.array(Chat), []),
    })
  )
  .named('Chats')
  .views(self => ({
    get _filteredList() {
      return self._list.filter(chat => chat.messages.first)
    },
  }))
  .views(self => ({
    get list() {
      return self._filteredList.sort((a, b) => b.messages.first!.time - a.messages.first!.time)
    },
    get unreadCount(): number {
      return self._filteredList.reduce((prev: number, current) => prev + current.unreadCount, 0)
    },
    get(id: string): IChat | undefined {
      return self._list.find(el => el.id === id)
    },
  }))
  .actions(self => ({
    clear: () => self._list.clear(),
    remove: (id: string) => self._list.replace(self._list.filter(el => el.id !== id)),
    add: (chat: IChatIn): IChat => {
      let toReturn = self.get(chat.otherUser as string)
      if (!toReturn) {
        self._list.push(Chat.create(chat))
        toReturn = self.get(chat.otherUser as string)
      }
      return toReturn!
    },
  }))
  .actions(self => ({
    createChat: (otherUserId: string): IChat => {
      let chat: IChat | undefined = self.get(otherUserId)
      if (!chat) {
        chat = self.add({id: otherUserId, otherUser: otherUserId})
      }
      return chat
    },
  }))
  .actions(self => ({
    addMessage: (message?: IMessageIn, unread = false): void => {
      if (!message) return
      const {otherUser} = message
      const otherUserId = (otherUser as any).id || otherUser
      let existingChat = self.get(otherUserId)
      const msg = createMessage(message, self.service)
      if (existingChat) {
        existingChat.messages.addToTop(msg)
        if (existingChat.active) {
          existingChat.readOne(msg)
        } else {
          msg!.setUnread(unread)
        }
      } else {
        existingChat = self.createChat(otherUserId)
        existingChat.messages.addToTop({
          ...message,
          otherUser: otherUserId,
          unread: !existingChat.active ? unread : false,
        })
      }
    },
    loadChats: flow(function*(max: number = 50) {
      const items: Array<{chatId: string; message: IMessageIn}> = yield self.transport.loadChats(
        max
      )
      items.forEach(item => {
        const msg = createMessage(item.message, self.service)
        const chat = self.createChat(item.chatId)
        chat.messages.addToTop(msg)
      })
    }) as (max?: number) => Promise<void>,
  }))

export interface IChats extends Instance<typeof Chats> {}

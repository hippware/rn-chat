import {types, Instance} from 'mobx-state-tree'
import {Chat, IChat, IChatIn} from './Chat'

export const Chats = types
  .model('Chats', {
    _list: types.optional(types.array(Chat), []),
  })
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

export interface IChats extends Instance<typeof Chats> {}

import {types, Instance} from 'mobx-state-tree'
import {Chat, IChat} from './Chat'

export const Chats = types
  .model('Chats', {
    _list: types.optional(types.array(Chat), []),
  })
  .named('Chats')
  .views(self => ({
    get _filteredList() {
      return self._list.filter(chat => chat.last && chat.followedParticipants.length)
    },
  }))
  .views(self => ({
    get list() {
      return self._filteredList.slice().sort((a, b) => b.last!.time - a.last!.time)
    },
    get unread() {
      return self._filteredList.reduce((prev: number, current) => prev + current.unread, 0)
    },
    get(id: string): IChat | undefined {
      return self._list.find(el => el.id === id)
    },
  }))
  .actions(self => ({
    clear: () => self._list.splice(0),
    remove: (id: string) => self._list.replace(self._list.filter(el => el.id !== id)),
    add: (chat: IChat): IChat => {
      let toReturn = self.get(chat.id)
      if (!toReturn) {
        self._list.push(chat)
        toReturn = self.get(chat.id)
      }
      return toReturn!
    },
  }))

export interface IChats extends Instance<typeof Chats> {}

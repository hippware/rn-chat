// tslint:disable-next-line:no_unused-variable
import {types, flow, IModelType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
import {Chat, IChat} from './Chat'
import {IProfile} from './Profile'
import {IBot} from './Bot'

// known typescript issue: https://github.com/mobxjs/mobx-state-tree#known-typescript-issue-5938
export type __IProfile = IProfile
export type __IBot = IBot

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
      return self._filteredList.sort((a, b) => b.last!.time - a.last!.time)
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
    add: (chat: IChat): IChat => self.get(chat.id) || ((self._list.push(chat) && chat) as IChat),
  }))

export type IChats = typeof Chats.Type

import {types, flow, getEnv} from 'mobx-state-tree'
import {IObservableArray} from 'mobx'
import {Profile, IProfile} from './Profile'
import {Message, IMessage} from './Message'
import {Base} from './Base'
import {IBot} from './Bot'
const moment = require('moment')

// known typescript issue: https://github.com/mobxjs/mobx-state-tree#known-typescript-issue-5938
export type __IObservableArray = IObservableArray<any>
export type __IBot = IBot

export const Chat = types
  .compose(
    Base,
    types.model('Chat', {
      id: types.identifier(types.string),
      active: false,
      loaded: false,
      requestedId: types.maybe(types.string),
      isPrivate: true,
      participants: types.optional(types.array(types.reference(Profile)), []),
      _messages: types.optional(types.array(Message), []),
      message: types.optional(Message, {}),
    })
  )
  .volatile(() => ({
    loading: false,
  }))
  // .named('Chat')
  .views(self => ({
    get messages() {
      return self._messages.sort((a, b) => a.time - b.time)
    },
    get unread(): number {
      return self._messages.reduce(
        (prev: number, current: IMessage) => prev + (current.unread ? 1 : 0),
        0
      )
    },
    get followedParticipants() {
      return self.participants.filter(p => p.isFollowed)
    },
  }))
  .views(self => ({
    get last(): IMessage | null {
      return self.messages.length ? self.messages[self.messages.length - 1] : null
    },
    get first(): IMessage | null {
      return self.messages.length ? self.messages[0] : null
    },
  }))
  .views(self => ({
    get time() {
      return self.last ? self.last!.time : Date.now()
    },
  }))
  .views(self => ({
    get date() {
      return moment(self.time).calendar()
    },
  }))
  .actions(self => {
    const {logger} = getEnv(self)
    return {
      setActive: (active: boolean) => (self.active = active),
      readAll: () => self._messages.forEach((msg: IMessage) => msg.read()),
      load: flow(function*() {
        if (
          !self.loaded &&
          !self.loading &&
          (!self.first || self.requestedId !== self.first!.archiveId)
        ) {
          self.requestedId = self.first ? self.first!.archiveId : null
          self.loading = true
          try {
            const data = yield self.service.loadChat(self.id, self.requestedId)
            if (
              data &&
              data.fin &&
              data.fin.set &&
              data.fin.set.first &&
              data.fin.set.first.index === '0'
            ) {
              self.loaded = true
            }
          } catch (e) {
            logger.log('error loading chat: ', e)
          } finally {
            self.loading = false
          }
        }
      }),
      addMessage: (msg: IMessage) => {
        if (!self._messages.find(el => msg.id === el.id)) {
          self._messages.push(msg)
        }
      },
      addParticipant: (profile: IProfile) => {
        if (!self.participants.find(el => el.id === profile.id)) {
          self.participants.push(profile)
        }
      },
    }
  })
  .actions(self => ({
    afterAttach: () => {
      self.message = self.service.create(Message, {to: self.id, from: self.service.username!})
      self.addParticipant(self.service.profiles.get(self.id))
    },
  }))

export type IChatType = typeof Chat.Type
export interface IChat extends IChatType {}

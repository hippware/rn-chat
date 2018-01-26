// tslint:disable-next-line:no_unused-variable
import {types, flow, getEnv, IModelType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
import {Profile} from './Profile'
import {Message, IMessage} from './Message'
import {IProfile} from '../index'
import {Base} from './Base'
import moment = require('moment')

export const Chat = types
  .compose(
    Base,
    types.model('Chat', {
      id: types.identifier(types.string),
      active: false,
      loaded: false,
      requestedId: types.maybe(types.string),
      isPrivate: true,
      time: types.optional(types.number, () => Date.now()),
      participants: types.optional(types.array(types.reference(Profile)), []),
      _messages: types.optional(types.array(Message), [])
    })
  )
  .volatile(self => ({
    loading: false
  }))
  .named('Chat')
  .views(self => ({
    get date() {
      return moment(self.time).calendar()
    },
    get messages() {
      return self._messages.sort((a, b) => a.time - b.time)
    },
    get unread(): number {
      return self._messages.reduce((prev: number, current: IMessage) => prev + (current.unread ? 1 : 0), 0)
    },
    get followedParticipants() {
      return self.participants.filter(p => p.isFollowed)
    }
  }))
  .views(self => ({
    get last(): IMessage | null {
      return self.messages.length ? self.messages[self.messages.length - 1] : null
    },
    get first(): IMessage | null {
      return self.messages.length ? self.messages[0] : null
    }
  }))
  .actions(self => {
    const {logger} = getEnv(self)
    return {
      setActive: (active: boolean) => (self.active = active),
      readAll: () => self._messages.forEach((msg: IMessage) => msg.read()),
      load: flow(function*() {
        if (!self.loaded && !self.loading && (!self.first || self.requestedId !== self.first!.archiveId)) {
          self.requestedId = self.first ? self.first!.archiveId : null
          self.loading = true
          try {
            const data = yield self.service.loadChat(self.id, self.requestedId)
            if (data && data.fin && data.fin.set && data.fin.set.first && data.fin.set.first.index === '0') {
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
      }
    }
  })

export type IChat = typeof Chat.Type

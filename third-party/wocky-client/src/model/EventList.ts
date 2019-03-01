import {types, flow, Instance} from 'mobx-state-tree'
import {EventBotCreate} from './EventBotCreate'
import {EventBotPost, EventBotPostType} from './EventBotPost'
import {EventBotGeofence, EventBotGeofenceType} from './EventBotGeofence'
import {EventDelete} from './EventDelete'
import {EventFriendInvite, EventFriendInviteType} from './EventFriendInvite'
import {EventBotInvite, EventBotInviteType, EventBotInviteResponseType} from './EventBotInvite'
import {createPaginable} from './PaginableList'
import {Base} from './Base'
import {RequestType} from '../model/PaginableList'
import {IEventData} from '../model/Event'
import {PaginableLoadType} from '../transport/Transport'
import {waitFor} from '../transport/utils'
import {EventLocationShare, EventLocationShareType} from './EventLocationShare'
import {EventLocationShareEnd} from './EventLocationShareEnd'

export const EventRequestTypes = [EventFriendInviteType, EventBotInviteType]
export const EventUpdatesTypes = [
  EventBotPostType,
  EventBotGeofenceType,
  EventBotInviteResponseType,
  EventLocationShareType,
]

export const EventEntity = types.union(
  EventBotPost,
  EventBotCreate,
  EventBotGeofence,
  EventDelete,
  EventFriendInvite,
  EventBotInvite,
  EventLocationShare,
  EventLocationShareEnd
)
export type IEventEntity = typeof EventEntity.Type

export function createEvent(params: any, service: any): IEventEntity {
  if (params.user) {
    params.user = service.profiles.get(params.user.id, params.user)
  }
  if (params.profile) {
    params.profile = service.profiles.get(params.profile.id, params.profile)
  }
  if (params.bot) {
    params.bot = service.bots.get(params.bot.id, params.bot)
  }
  if (params.image) {
    params.image = service.files.get(params.image.id, params.image)
  }
  return EventEntity.create(params)
}

export const EventList = types
  .compose(Base, createPaginable<IEventEntity>(EventEntity, 'EventList'))
  .postProcessSnapshot(snapshot => {
    if (snapshot.result.length > 20) {
      const result = snapshot.result.slice(0, 20)
      const cursor = result[result.length - 1].cursor
      return {...snapshot, result, cursor}
    }
    return snapshot
  })
  .props({
    mode: 1,
  })
  .views(self => ({
    get updates() {
      return self.list.filter(x => !x.isRequest)
    },
    get requests() {
      return self.list.filter(x => x.isRequest)
    },
  }))
  .views(self => ({
    get hasUnread() {
      return self.list.filter(x => x.unread).length > 0
    },
    get hasUnreadRequests() {
      return self.requests.filter(x => x.unread).length > 0
    },
    get data() {
      return self.mode === 1 ? self.updates : self.requests
    },
    get title() {
      return self.mode === 1 ? 'Updates' : 'Requests'
    },
    get emptyTitle() {
      return self.mode === 1 ? 'No new updates' : 'No new requests'
    },
  }))
  .actions(self => ({
    _loadNotifications: flow(function*(lastId: string, max: number = 20) {
      yield waitFor(() => self.connected)
      const {list, count}: PaginableLoadType<IEventData> = yield self.transport.loadNotifications({
        beforeId: lastId,
        limit: max,
        types: self.mode === 1 ? EventUpdatesTypes : EventRequestTypes,
      })
      return {list: list.map(data => createEvent({...data, unread: false}, self.service)), count}
    }) as RequestType,
  }))
  .actions(self => ({
    afterCreate() {
      self.setRequest(self._loadNotifications)
    },
    readAll() {
      self.data.forEach(x => x.read())
    },
  }))
  .actions(self => ({
    setMode: (mode: number) => {
      self.mode = mode
      self.readAll()
    },
  }))

export interface IEventList extends Instance<typeof EventList> {}

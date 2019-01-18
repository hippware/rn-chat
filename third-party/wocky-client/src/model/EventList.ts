import {types, Instance} from 'mobx-state-tree'
import {EventBotCreate} from './EventBotCreate'
import {EventBotPost} from './EventBotPost'
import {EventBotGeofence} from './EventBotGeofence'
import {EventDelete} from './EventDelete'
import {EventFriendInvite} from './EventFriendInvite'
import {EventBotInvite} from './EventBotInvite'
import {createPaginable} from './PaginableList'
import {IWocky} from '../index'

export const EventEntity = types.union(
  EventBotPost,
  EventBotCreate,
  EventBotGeofence,
  EventDelete,
  EventFriendInvite,
  EventBotInvite
)
export type IEventEntity = typeof EventEntity.Type

export function createEvent(params: any, service: IWocky): IEventEntity {
  if (params.user) {
    params.user = service.profiles.get(params.user.id, params.user)
  }
  if (params.bot) {
    params.bot = service.bots.get(params.bot.id, params.bot)
  }
  if (params.image) {
    params.image = service.files.get(params.image.id, params.image)
  }
  return EventEntity.create(params)
}

export const EventList = createPaginable<IEventEntity>(
  EventEntity,
  'EventList'
).postProcessSnapshot(snapshot => {
  if (snapshot.result.length > 20) {
    const result = snapshot.result.slice(0, 20)
    const cursor = result[result.length - 1].cursor
    return {...snapshot, result, cursor}
  }
  return snapshot
})

export interface IEventList extends Instance<typeof EventList> {}

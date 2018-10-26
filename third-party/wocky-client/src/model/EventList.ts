import {types} from 'mobx-state-tree'
import {EventBotCreate} from './EventBotCreate'
import {EventBotPost} from './EventBotPost'
import {EventBotNote} from './EventBotNote'
import {EventBotShare} from './EventBotShare'
import {EventBotGeofence} from './EventBotGeofence'
import {EventDelete} from './EventDelete'
import {EventUserFollow} from './EventUserFollow'
import {EventBotInvite} from './EventBotInvite'
import {createPaginable, IPaginable} from './PaginableList'

export const EventEntity = types.union(
  EventBotPost,
  EventBotNote,
  EventBotShare,
  EventBotCreate,
  EventBotGeofence,
  EventDelete,
  EventUserFollow,
  EventBotInvite
)
export type IEventEntity = typeof EventEntity.Type

export const EventList: IPaginable<IEventEntity> = createPaginable<IEventEntity>(
  EventEntity
).postProcessSnapshot((snapshot: any) => {
  if (snapshot.result.length > 20) {
    const result = snapshot.result.slice(0, 20)
    const cursor = result[result.length - 1].cursor
    return {...snapshot, result, cursor}
  }
  return snapshot
})

export type IEventListType = typeof EventList.Type
export interface IEventList extends IEventListType {}

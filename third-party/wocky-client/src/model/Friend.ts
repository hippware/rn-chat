import {types, Instance, SnapshotIn} from 'mobx-state-tree'
import {Profile} from './Profile'
import {createPaginable} from './PaginableList'

export enum FriendShareTypeEnum {
  ALWAYS = 'ALWAYS',
  DISABLED = 'DISABLED',
  NEARBY = 'NEARBY',
}

export const FriendShareType = types.enumeration([...Object.values(FriendShareTypeEnum)])

export const FriendShareConfig = types.model({
  nearbyCooldown: types.integer,
  nearbyDistance: types.integer,
})

export const DefaultFriendShareConfig = {nearbyCooldown: 100, nearbyDistance: 500}

export interface IFriendShareConfig extends SnapshotIn<typeof FriendShareConfig> {}

export const Friend = types
  .model('Friend', {
    id: types.identifier,
    createdAt: types.optional(types.Date, () => new Date()),
    user: types.reference(Profile),
    shareType: types.optional(FriendShareType, FriendShareTypeEnum.DISABLED),
    shareConfig: types.optional(FriendShareConfig, DefaultFriendShareConfig),
  })
  .views(self => ({
    get isNew() {
      const days = Math.trunc(
        (new Date().getTime() - self.createdAt.getTime()) / (60 * 60 * 1000 * 24)
      )
      return days <= 7
    },
  }))
export interface IFriend extends Instance<typeof Friend> {}
export interface IFriendIn extends SnapshotIn<typeof Friend> {}

export const FriendPaginableList = createPaginable<IFriend>(Friend, 'FriendList')

import {types, SnapshotIn} from 'mobx-state-tree'

export enum FriendShareTypeEnum {
  ALWAYS = 'ALWAYS',
  DISABLED = 'DISABLED',
  NEARBY = 'NEARBY',
}

export const FriendShareType = types.enumeration([...Object.values(FriendShareTypeEnum)])

export const FriendShareConfig = types.model('FriendShareConfigInput', {
  nearbyCooldown: types.integer,
  nearbyDistance: types.integer,
})

export interface IFriendShareConfig extends SnapshotIn<typeof FriendShareConfig> {}

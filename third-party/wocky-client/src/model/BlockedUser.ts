import {types, Instance, SnapshotIn} from 'mobx-state-tree'
import {Profile} from './Profile'
import {createPaginable} from './PaginableList'

export const BlockedUser = types.model('BlockedUser', {
  id: types.identifier,
  createdAt: types.optional(types.Date, () => new Date()),
  user: types.reference(Profile),
})
export interface IBlockedUser extends Instance<typeof BlockedUser> {}
export interface IBlockedUserIn extends SnapshotIn<typeof BlockedUser> {}

export const BlockedUserPaginableList = createPaginable<IBlockedUser>(
  BlockedUser,
  'BlockedUserList'
)

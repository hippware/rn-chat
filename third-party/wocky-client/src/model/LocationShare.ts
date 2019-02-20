import {types, Instance, SnapshotIn} from 'mobx-state-tree'
import {Profile} from './Profile'
import {createPaginable} from './PaginableList'

export const LocationShare = types.model('LocationShare', {
  id: types.identifier,
  createdAt: types.optional(types.Date, () => new Date()),
  expiresAt: types.Date,
  sharedWith: types.reference(Profile),
})
export interface ILocationShare extends Instance<typeof LocationShare> {}
export interface ILocationShareIn extends SnapshotIn<typeof LocationShare> {}

export const LocationSharePaginableList = createPaginable<ILocationShare>(
  LocationShare,
  'LocationShareList'
)

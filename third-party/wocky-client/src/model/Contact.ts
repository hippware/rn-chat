import {types, Instance, SnapshotIn} from 'mobx-state-tree'
import {Profile} from './Profile'
import {createPaginable} from './PaginableList'

export const Contact = types.model('Contact', {
  createdAt: types.Date,
  name: types.maybe(types.string),
  user: types.reference(Profile),
})
export interface IContact extends Instance<typeof Contact> {}
export interface IContactIn extends SnapshotIn<typeof Contact> {}

export const ContactPaginableList = createPaginable<IContact>(
  types.reference(Contact),
  'ContactList'
)

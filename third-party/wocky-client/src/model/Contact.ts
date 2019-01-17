import {types, Instance, SnapshotIn} from 'mobx-state-tree'
import {Profile} from './Profile'
import {createPaginable} from './PaginableList'

export const Contact = types
  .model('Contact', {
    id: types.identifier,
    createdAt: types.optional(types.Date, () => new Date()),
    name: types.maybe(types.string),
    user: types.reference(Profile),
  })
  .views(self => ({
    get isNew() {
      const days = Math.trunc(
        (new Date().getTime() - self.createdAt.getTime()) / (60 * 60 * 1000 * 24)
      )
      return days <= 7
    },
  }))
export interface IContact extends Instance<typeof Contact> {}
export interface IContactIn extends SnapshotIn<typeof Contact> {}

export const ContactPaginableList = createPaginable<IContact>(Contact, 'ContactList')

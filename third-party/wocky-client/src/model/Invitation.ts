import {types, Instance, SnapshotIn} from 'mobx-state-tree'
import {Profile} from './Profile'
import {createPaginable} from './PaginableList'

export const Invitation = types.model('Invitation', {
  createdAt: types.Date,
  recipient: types.reference(Profile),
  sender: types.reference(Profile),
})

export interface IInvitation extends Instance<typeof Invitation> {}
export interface IIInvitationIn extends SnapshotIn<typeof Invitation> {}

export const InvitationPaginableList = createPaginable<IInvitation>(
  types.reference(Invitation),
  'InvitationList'
)

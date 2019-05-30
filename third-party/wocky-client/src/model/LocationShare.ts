import {types, Instance, SnapshotIn, getRoot} from 'mobx-state-tree'
import {Profile} from './Profile'
import {createPaginable} from './PaginableList'
import moment from 'moment'

export const LocationShare = types
  .model('LocationShare', {
    id: types.identifier,
    createdAt: types.optional(types.Date, () => new Date()),
    expiresAt: types.Date,
    sharedWith: types.reference(Profile),
  })
  .views(self => ({
    get forDuration(): string {
      const now: Date = (getRoot(self) as any).wocky.timer.minute
      return self.expiresAt.getTime() - now.getTime() > 1000 * 3600 * 72
        ? 'Until you turn it off'
        : 'for ' +
            moment
              .duration(moment(self.expiresAt).diff(moment(now)))
              .humanize()
              .replace('d', ' days')
              .replace('h', ' hours')
              .replace('m', ' minutes')
              .replace('1 hours', '1 hour')
    },
  }))

export interface ILocationShare extends Instance<typeof LocationShare> {}
export interface ILocationShareIn extends SnapshotIn<typeof LocationShare> {}

export const LocationSharePaginableList = createPaginable<ILocationShare>(
  LocationShare,
  'LocationShareList'
)

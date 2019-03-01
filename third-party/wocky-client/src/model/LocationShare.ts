import {types, Instance, SnapshotIn} from 'mobx-state-tree'
import {Profile} from './Profile'
import {createPaginable} from './PaginableList'
import moment from 'moment'

export const LocationShare = types
  .model('LocationShare', {
    id: types.identifier,
    createdAt: types.optional(types.Date, () => new Date()),
    expiresAt: types.Date,
    sharedWith: types.reference(Profile),
    forDuration: '',
  })
  .actions(self => ({
    setDuration() {
      const duration =
        self.expiresAt.getTime() - Date.now() > 1000 * 3600 * 72
          ? 'Until you turn it off'
          : 'for ' +
            moment
              .duration(moment(self.expiresAt).diff(moment(new Date())))
              .humanize()
              .replace('d', ' days')
              .replace('h', ' hours')
              .replace('m', ' minutes')
              .replace('1 hours', '1 hour')
      self.forDuration = duration
    },
  }))
  .actions(self => {
    let timer
    return {
      // use setInterval to update self.forDuration time once per minute
      afterAttach() {
        timer = setInterval(() => {
          self.setDuration()
        }, 1000 * 60)
        self.setDuration()
      },
      beforeDestroy() {
        clearInterval(timer)
      },
    }
  })

export interface ILocationShare extends Instance<typeof LocationShare> {}
export interface ILocationShareIn extends SnapshotIn<typeof LocationShare> {}

export const LocationSharePaginableList = createPaginable<ILocationShare>(
  LocationShare,
  'LocationShareList'
)

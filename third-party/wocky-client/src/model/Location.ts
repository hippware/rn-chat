import {types, Instance, SnapshotIn} from 'mobx-state-tree'
import moment from 'moment'
import {UserActivityType} from '../transport/types'

export const createLocation = ({
  lat,
  lon,
  accuracy,
  createdAt,
  activity,
  activityConfidence,
}: {
  lat: number
  lon: number
  accuracy: number
  createdAt: Date
  activity: UserActivityType | '' | null
  activityConfidence: number | null
}) => {
  return Location.create({
    latitude: lat,
    longitude: lon,
    accuracy,
    createdAt,
    activity: activity && activity.length ? activity : undefined,
    activityConfidence: activityConfidence || undefined,
  })
}

export const Location = types
  .model('Location', {
    latitude: types.number,
    longitude: types.number,
    accuracy: types.maybeNull(types.number),
    createdAt: types.maybe(types.Date),
    fromNow: '',
    // todo: make this an enumeration?
    activity: types.maybe(
      types.enumeration(['still', 'on_foot', 'walking', 'in_vehicle', 'on_bicycle', 'running'])
    ),
    activityConfidence: types.maybe(types.number),
  })
  .volatile(() => ({
    isCurrent: false,
  }))
  .actions(self => ({
    setFromNow() {
      if (self.createdAt) {
        self.fromNow = moment(self.createdAt).fromNow(true) + ' ago'
      }
    },
  }))
  .actions(self => {
    let timer
    return {
      load: (data: any) => {
        Object.assign(self, data)
        self.setFromNow()
      },
      // use setInterval to update self.fromNow time once per minute
      afterAttach() {
        if (self.createdAt) {
          timer = setInterval(() => {
            self.setFromNow()
          }, 1000 * 60)
          self.setFromNow()
        }
      },
      beforeDestroy() {
        if (timer !== undefined) {
          clearInterval(timer)
        }
      },
    }
  })
  .postProcessSnapshot((snapshot: any) => {
    const res: any = {...snapshot}
    delete res.createdAt
    delete res.fromNow
    return res
  })

export interface ILocation extends Instance<typeof Location> {}
export interface ILocationSnapshot extends SnapshotIn<typeof Location> {}

import {types, Instance, SnapshotIn} from 'mobx-state-tree'
import {UserActivityType} from '../transport/types'

export const createLocation = ({
  lat,
  lon,
  accuracy,
  createdAt,
  activity,
  activityConfidence,
  id,
}: {
  lat: number
  lon: number
  accuracy: number
  createdAt: Date
  activity: UserActivityType | 'unknown' | '' | null
  activityConfidence: number | null
  id?: string
}) => {
  return Location.create({
    latitude: lat,
    longitude: lon,
    accuracy,
    createdAt,
    activity: activity && activity.length && activity !== 'unknown' ? activity : undefined,
    activityConfidence: activityConfidence || undefined,
    id: id || undefined,
  })
}

export const Location = types
  .model('Location', {
    latitude: types.number,
    longitude: types.number,
    accuracy: types.maybeNull(types.number),
    createdAt: types.optional(types.Date, new Date()),
    activity: types.maybe(
      types.enumeration(['still', 'on_foot', 'walking', 'in_vehicle', 'on_bicycle', 'running'])
    ),
    activityConfidence: types.maybe(types.number),
    id: types.maybe(types.string),
  })
  .volatile(() => ({
    isCurrent: false,
  }))
  .actions(self => ({
    load: (data: any) => {
      Object.assign(self, data)
    },
  }))

export interface ILocation extends Instance<typeof Location> {}
export interface ILocationSnapshot extends SnapshotIn<typeof Location> {}

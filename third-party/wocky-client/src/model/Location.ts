import {types, Instance, SnapshotIn} from 'mobx-state-tree'

export const createLocation = ({
  lat,
  lon,
  accuracy,
  createdAt,
}: {
  lat: number
  lon: number
  accuracy: number
  createdAt: Date
}) => {
  return Location.create({latitude: lat, longitude: lon, accuracy, createdAt})
}
export const Location = types
  .model('Location', {
    latitude: types.number,
    longitude: types.number,
    accuracy: types.maybeNull(types.number),
    createdAt: types.optional(types.Date, new Date()),
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

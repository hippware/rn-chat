import {types, Instance, SnapshotIn} from 'mobx-state-tree'
import moment from 'moment'

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
    createdAt: types.maybe(types.Date),
    fromNow: '',
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

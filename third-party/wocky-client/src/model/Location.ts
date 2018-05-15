import {types, ISnapshottable} from 'mobx-state-tree'
const GEOLOC_NS = 'http://jabber.org/protocol/geoloc'

export const Location = types
  .model('Location', {
    latitude: types.number,
    longitude: types.number,
    accuracy: types.maybe(types.number)
  })
  .volatile(() => ({
    isCurrent: false
  }))
  .actions(self => ({
    load: (data: any) => {
      Object.assign(self, data)
    },
    addToIQ: (iq: any) => {
      iq
        .c('geoloc', {xmlns: GEOLOC_NS})
        .c('lat')
        .t(self.latitude)
        .up()
        .c('lon')
        .t(self.longitude)
        .up()

      if (self.accuracy) {
        iq.c('accuracy').t(self.accuracy)
      }
    }
  }))

export type ILocationSnapshot = ISnapshottable<typeof Location.SnapshotType>

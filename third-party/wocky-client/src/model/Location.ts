import {types, Instance} from 'mobx-state-tree'

export const Location = types
  .model('Location', {
    latitude: types.number,
    longitude: types.number,
    accuracy: types.maybeNull(types.number),
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
export type ILocationSnapshot = typeof Location.SnapshotType

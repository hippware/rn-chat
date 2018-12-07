import {types, Instance, SnapshotIn} from 'mobx-state-tree'

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
export interface ILocationSnapshot extends SnapshotIn<typeof Location> {}

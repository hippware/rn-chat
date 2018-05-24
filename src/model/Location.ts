import {types, ISnapshottable} from 'mobx-state-tree'

export const Location = types
  .model('Location', {
    latitude: types.number,
    longitude: types.number,
    accuracy: types.maybe(types.number),
  })
  .volatile(() => ({
    isCurrent: false,
  }))
  .actions(self => ({
    load: (data: any) => {
      Object.assign(self, data)
    },
  }))

export type ILocationSnapshot = ISnapshottable<typeof Location.SnapshotType>

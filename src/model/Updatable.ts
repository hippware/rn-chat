import {types, flow} from 'mobx-state-tree'

export function createUpdatable(update: (self: any, data: any) => (self) => void) {
  return types
    .model('Updatable', {})
    .volatile(() => ({
      updated: false,
      updating: false,
    }))
    .actions(self => ({
      update: flow(function*(data: any) {
        self.updated = false
        if (!self.updating) {
          try {
            self.updating = true
            const res = yield update(self, data)
            // update own state
            if (data) {
              Object.assign(self, data)
            }
            // allow to update some props after successful execution of update script
            if (res) {
              Object.assign(self, res)
            }
            self.updated = true
          } finally {
            self.updating = false
          }
        }
      }),
    }))
    .actions(self => ({
      save: flow(function*() {
        yield self.update({})
      }),
    }))
}

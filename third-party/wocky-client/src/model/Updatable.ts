import {types, flow, getSnapshot, applySnapshot} from 'mobx-state-tree'

export function createUpdatable(update: (self: any, data: any) => (self) => void) {
  return types
    .model('Updatable', {})
    .volatile(() => ({
      updated: false,
      updating: false,
      updateError: ''
    }))
    .actions(self => ({
      update: flow(function*(data: any) {
        self.updated = false
        self.updateError = ''
        const oldSnapshot = getSnapshot(self)
        if (data) {
          Object.assign(self, data)
        }
        if (!self.updating) {
          try {
            self.updating = true
            const res = yield update(self, data)
            // allow to update some props after successful execution of update script
            if (res) {
              Object.assign(self, res)
            }
            self.updated = true
          } catch (e) {
            self.updateError = e.message
            // revert to old data!
            applySnapshot(self, oldSnapshot)
          } finally {
            self.updating = false
          }
        }
      })
    }))
    .actions(self => ({
      save: flow(function*() {
        yield self.update({})
      })
    }))
}

// tslint:disable-next-line:no_unused-variable
import {types, onSnapshot, getEnv, flow, getParent, IModelType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'

export function createUpdatable(update: (self: any) => Function) {
  return types
    .model('Updatable', {})
    .volatile(self => ({
      updated: false,
      updating: false,
      updateError: ''
    }))
    .actions(self => ({
      load: (data: any) => {
        Object.assign(self, data)
      },
      update: flow(function*(data: any) {
        self.updated = false
        self.updateError = ''
        if (data) {
          Object.assign(self, data)
        }
        if (!self.updating) {
          try {
            self.updating = true
            const res = yield update(self)
            // allow to update some props after successful execution of update script
            if (res) {
              Object.assign(self, res)
            }
            self.updated = true
          } catch (e) {
            console.error(e)
            self.updateError = e
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

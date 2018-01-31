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
    .actions((self: any) => ({
      update: (data: any) => {
        self.updated = false
        self.updatedError = ''
        Object.assign(self, data)
      },
      _onChanged: flow(function*() {
        if (!self.updating) {
          try {
            self.updating = true
            self.updated = false
            const data = yield update(self)
            // allow to update some props after successful execution of update script
            if (data) {
              Object.assign(self, data)
            }
            self.updated = true
          } catch (e) {
            console.error(e)
            self.updateError = e
          } finally {
            self.updating = false
          }
        }
      }),
      afterCreate: () => {
        // listen to new snapshots
        onSnapshot(self, async snapshot => {
          await self._onChanged(snapshot)
        })
      }
    }))
}

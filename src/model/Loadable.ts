// tslint:disable-next-line:no_unused-variable
import {types, onSnapshot, getEnv, flow, getParent, IModelType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'

export function createLoadable(load: (self: any) => Function) {
  return types
    .model('Loadable', {loaded: false})
    .volatile(self => ({
      loading: false,
      loadError: ''
    }))
    .actions(self => ({
      load: (data: any) => {
        Object.assign(self, data)
        self.loaded = true
      }
    }))
    .actions(self => ({
      request: flow<any>(function*() {
        if (!self.loading) {
          try {
            self.loading = true
            const res = yield load(self)
            if (res) {
              self.load(res)
            }
          } catch (e) {
            console.error(e)
            self.loadError = e
          } finally {
            self.loading = false
          }
        }
      })
    }))
}

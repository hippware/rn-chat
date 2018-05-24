import {types, flow} from 'mobx-state-tree'

export const Loadable = types.model({loaded: false}).actions((self: any) => ({
  load: (data: any) => {
    if (data && Object.keys(data).length) {
      Object.assign(self, data)
      self.loaded = true
    }
  },
}))

export type ILoadable = typeof Loadable.Type

export function createLoadable(load: (self: any) => (self) => void) {
  return types
    .compose(
      Loadable,
      types.model({}).volatile(() => ({
        loading: false,
        loadError: '',
      }))
    )
    .named('Loadable')
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
            // console.error(e) TODO
            self.loadError = e
          } finally {
            self.loading = false
          }
        }
      }),
    }))
}

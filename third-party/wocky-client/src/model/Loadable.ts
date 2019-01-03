import {types} from 'mobx-state-tree'

export const Loadable = types
  .model({loaded: types.optional(types.maybeNull(types.boolean), false)})
  .actions((self: any) => ({
    load: data => {
      if (data && Object.keys(data).length) {
        Object.assign(self, data)
        self.loaded = true
      }
      return self
    },
  }))

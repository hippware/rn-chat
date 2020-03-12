import {types} from 'mobx-state-tree'

export const Loadable = types
  .model({
    loaded: types.optional(types.maybeNull(types.boolean), false),
    // _accessedAt is a field that we compute. It does not exist at the server.
    _accessedAt: 0,
  })
  .actions((self: any) => ({
    load: data => {
      if (data && Object.keys(data).length) {
        const accessedAt = data._accessedAt || new Date().getTime()
        // Only assign if _accessedAt is newer
        if (self._accessedAt < accessedAt) {
          Object.assign(self, data)
          self.loaded = true
          self._accessedAt = accessedAt
        }
      }
      return self
    },
  }))

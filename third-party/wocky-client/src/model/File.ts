import {types} from 'mobx-state-tree'
export const File = types
  .model('File', {
    id: types.identifier,
    uri: types.maybe(types.string),
    width: types.maybeNull(types.number),
    height: types.maybeNull(types.number),
  })
  .actions(self => ({
    load({uri}: any) {
      // Object.assign(self, data)
      self.uri = uri
    },
  }))
  .named('File')
export type IFile = typeof File.Type

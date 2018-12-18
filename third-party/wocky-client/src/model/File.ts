import {types} from 'mobx-state-tree'
export const File = types
  .model('File', {
    id: types.identifier,
    uri: types.maybe(types.string),
    width: types.maybeNull(types.number),
    height: types.maybeNull(types.number),
  })
  .actions(self => ({
    load({id, ...data}: any) {
      Object.assign(self, data)
    },
  }))
  .named('File')
export type IFile = typeof File.Type

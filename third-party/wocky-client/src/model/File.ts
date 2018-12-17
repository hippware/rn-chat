import {types} from 'mobx-state-tree'
export const File = types
  .model('File', {
    id: types.string,
    uri: types.string,
    contentType: types.maybeNull(types.string),
    width: types.maybeNull(types.number),
    height: types.maybeNull(types.number),
  })
  .named('File')
export type IFile = typeof File.Type

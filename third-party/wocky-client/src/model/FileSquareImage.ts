import {types, flow} from 'mobx-state-tree'
import {FileImage} from './FileImage'

export const FileSquareImage = types
  .compose(
    FileImage,
    types.model({
      isSquare: types.boolean,
    })
  )
  .named('FileSquareImage')
  .actions(self => ({
    downloadURL: flow(function*() {
      const urls = yield self.transport.downloadTROS(self.id)
      return urls.thumbnail
    }),
  }))

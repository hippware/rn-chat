import {types, flow} from 'mobx-state-tree'
import {FileImage} from './FileImage'

export const FileAspectImage = types
  .compose(
    FileImage,
    types.model({
      isAspect: types.boolean,
    })
  )
  .named('FileAspectImage')
  .actions(self => ({
    downloadURL: flow(function*() {
      const urls = yield self.transport.downloadTROS(self.id)
      return urls.aspectThumbnailUrl
    }),
  }))

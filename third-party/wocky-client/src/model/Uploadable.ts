import {types, flow} from 'mobx-state-tree'
import {Base} from './Base'

export function createUploadable(property: string, access: string | ((self) => void)) {
  return types
    .compose(Base, types.model('Uploadable', {}))
    .volatile(() => ({
      uploading: false,
      uploaded: false,
    }))
    .actions((self: any) => ({
      upload: flow(function*({file, size, width, height}: any) {
        if (!self.uploading) {
          try {
            self.uploaded = false
            self.uploading = true
            const url = yield self.service._requestUpload({
              file,
              size,
              width,
              height,
              access: typeof access === 'function' ? access(self) : access,
            })
            self.service.files.get(url)
            self.uploaded = true
            self[property] = url
          } finally {
            self.uploading = false
          }
        }
      }),
    }))
}

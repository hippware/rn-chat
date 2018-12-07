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
      upload: flow(function*({file, size}: any) {
        if (!self.uploading) {
          try {
            self.uploaded = false
            self.uploading = true
            const url = yield self.service._requestUpload({
              file,
              size,
              access: typeof access === 'function' ? access(self) : access,
            })
            self.uploaded = true
            const fileRef = self.service.files.get(url)
            // set source to local file (or test file)
            fileRef.setSource({uri: file.uri || file.fileName})
            self[property] = fileRef
          } finally {
            self.uploading = false
          }
        }
      }),
    }))
}

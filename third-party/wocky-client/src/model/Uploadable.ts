import {types, flow} from 'mobx-state-tree'

export function createUploadable(property: string, access: string | ((self) => void)) {
  return types
    .model('Uploadable', {})
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
            const id = yield self.service._requestUpload({
              file,
              size,
              access: typeof access === 'function' ? access(self) : access,
            })
            self.uploaded = true
            // update image
            self.load({[property]: {id, uri: file.uri || file.fileName}})
          } finally {
            self.uploading = false
          }
        }
      }),
    }))
}

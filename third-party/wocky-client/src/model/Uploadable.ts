import {flow} from 'mobx-state-tree'
import {Base} from './Base'

type UploadType = {
  file: {
    name: string
    type: string
    uri?: string
    height?: number
    width?: number
    fileName?: string
  }
  size: number
  height?: number
  width?: number
}

export function createUploadable(property: string, access: string | ((self) => void)) {
  return Base.named('Uploadable')
    .volatile(() => ({
      uploading: false,
      uploaded: false,
    }))
    .actions((self: any) => ({
      upload: flow(function*({file, size, height, width}: UploadType) {
        if (!height) {
          height = file.height
        }
        if (!width) {
          width = file.width
        }
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
            fileRef.setSource({uri: file.uri || file.fileName, height, width})
            self[property] = fileRef
          } finally {
            self.uploading = false
          }
        }
      }) as ({file, size}: UploadType) => Promise<void>,
    }))
}

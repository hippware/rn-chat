import {flow, types, getEnv} from 'mobx-state-tree'
import {Base} from './Base'
import {IFileService} from '../store/IFileService'
import {MediaUploadParams} from '../store/types'

type FileType = {
  name: string
  type: string
  uri?: string
  height: number
  width: number
  size: number
  fileName?: string
}

export function createUploadable(property: string, accessParam: string | ((self) => void)) {
  return Base.named('Uploadable')
    .props({
      file: types.maybe(types.frozen()),
    })
    .volatile(() => ({
      uploading: false,
      uploaded: false,
    }))
    .actions(self => ({
      requestUpload: flow(function*({file, size, access}) {
        const fs: IFileService = getEnv(self).fileService
        const {isEmulator} = getEnv(self).deviceInfo
        const data = yield self.transport.requestUpload({file, size, access})
        try {
          yield fs.upload({...data, isEmulator})
          return data.reference_url
        } catch (e) {
          yield self.transport.removeUpload(data.reference_url)
          throw e
        }
      }) as ({file, size, access}: MediaUploadParams) => Promise<string>,
    }))
    .views(self => ({
      get getUpload() {
        return self[property] || (self.file && {thumbnail: self.file})
      },
    }))
    .actions(self => {
      return {
        setFile(fileParam: FileType) {
          self.file = fileParam
        },
      }
    })
    .actions((self: any) => ({
      upload: flow(function*() {
        if (!self.file) {
          throw new Error('File is not set')
        }
        const file = self.file
        const {size, width, height} = file
        if (!self.uploading) {
          try {
            self.uploaded = false
            self.uploading = true
            const url = yield self.requestUpload({
              file,
              size,
              access: typeof accessParam === 'function' ? accessParam(self) : accessParam,
            })
            self.uploaded = true
            const fileRef = self.service.files.get(url)
            // set source to local file (or test file)
            fileRef.setSource({uri: file.uri || file.fileName, height, width})
            self[property] = fileRef
            self.file = null
          } finally {
            self.uploading = false
          }
        }
      }),
    }))
}

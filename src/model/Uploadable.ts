// tslint:disable-next-line:no_unused-variable
import {types, getEnv, flow, getParent, IModelType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
import {File} from './File'
import {Base} from './Base'

export function createUploadable(property: string, access: string | Function) {
  let props: any = {}
  props[property] = types.maybe(types.reference(File))
  return types
    .compose(Base, types.model('Uploadable', props))
    .volatile(self => ({
      uploading: false,
      uploaded: false,
      uploadError: ''
    }))
    .actions((self: any) => ({
      upload: flow(function*({file, size, width, height}: any) {
        if (!self.uploading) {
          try {
            self.uploaded = false
            self.uploading = true
            const url = yield self.service._requestUpload({file, size, width, height, access: typeof access === 'function' ? access(self) : access})
            self.service.createFile(url)
            self[property] = url
            self.uploaded = true
          } catch (e) {
            self.uploadError = e
          } finally {
            self.uploading = false
          }
        }
      })
    }))
}

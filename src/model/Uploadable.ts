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
    .props({uploaded: false})
    .volatile(self => ({
      uploading: false
    }))
    .actions((self: any) => ({
      upload: flow(function*({file, size, width, height}: any) {
        const url = yield self.service._requestUpload({file, size, width, height, access: typeof access === 'function' ? access(self) : access})
        self.service.createFile(url)
        self[property] = url
      })
    }))
}

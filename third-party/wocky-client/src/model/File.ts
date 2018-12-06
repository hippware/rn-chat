import {types, isAlive, flow, IModelType, IType} from 'mobx-state-tree'
import {Base} from './Base'
export type __IModelType = IModelType<any, any>
export type __IType = IType<any, any, any>
export const FileSource = types
  .model('FileSource', {
    uri: types.string,
    contentType: types.maybeNull(types.string),
    width: types.maybeNull(types.number),
    height: types.maybeNull(types.number),
    cached: false,
  })
  .named('FileSource')
export type IFileSource = typeof FileSource.Type
export const File = types
  .compose(
    Base,
    types.model('File', {
      id: types.identifier,
      source: types.maybeNull(FileSource),
      thumbnail: types.maybeNull(FileSource),
      url: '',
    })
  )
  .named('File')
  .volatile(() => ({
    loading: false,
    isNew: false,
    error: '',
  }))
  .views(self => ({
    get loaded() {
      return self.thumbnail !== null // self.source !== null
    },
  }))
  .postProcessSnapshot((snapshot: any) => {
    const res: any = {...snapshot}
    delete res.source
    delete res.thumbnail
    delete res.url
    return res
  })
  .actions(self => {
    return {
      setURL: (url: string) => {
        self.url = url
      },
      setSource: (source: any) => {
        self.source = source
        self.thumbnail = source
      },
      downloadThumbnail: flow(function*() {
        if (!self.loading && !self.thumbnail && self.url) {
          try {
            self.error = ''
            self.loading = true
            self.thumbnail = yield self.service.downloadThumbnail(self.url, self.id)
            self.url = ''
            self.loading = false
          } catch (e) {
            self.error = e
            self.url = ''
            self.loading = false
          }
        }
      }),
    }
  })
  .actions(self => ({
    afterAttach: flow(function*() {
      if (self.url) {
        yield self.downloadThumbnail()
      }
    }),
  }))
export type IFileType = typeof File.Type
export interface IFile extends IFileType {}

export const FileRef = types.maybeNull(
  types.reference(File, {
    get(id: string, parent: any) {
      return (
        parent.service &&
        parent.service.files &&
        isAlive(parent.service.files.get(id)) &&
        parent.service.files.get(id)
      )
    },
    set(value: IFile) {
      return value.id
    },
  })
)

// tslint:disable-next-line:no_unused-variable
import {types, IType, isAlive, flow, IModelType} from 'mobx-state-tree'
import {Base} from './Base'

export const FileSource = types
  .model('FileSource', {
    uri: types.string,
    contentType: types.maybe(types.string),
    width: types.maybe(types.number),
    height: types.maybe(types.number),
    cached: false
  })
  .named('FileSource')
export type IFileSource = typeof FileSource.Type
export const File = types
  .compose(
    Base,
    types.model('File', {
      id: types.identifier(types.string),
      source: types.maybe(FileSource),
      thumbnail: types.maybe(FileSource),
      url: ''
    })
  )
  .named('File')
  .volatile(self => ({
    loading: false,
    isNew: false,
    error: ''
  }))
  .views(self => ({
    get loaded() {
      return self.thumbnail !== null // self.source !== null
    },
    get snapshot() {
      const res: any = {...self._snapshot}
      delete res.source
      delete res.thumbnail
      delete res.url
      return res
    }
  }))
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
          } catch (e) {
            self.error = e
          } finally {
            self.loading = false
          }
        }
      }),
      download: flow(function*() {
        if (!self.source && !self.loading) {
          try {
            self.error = ''
            self.loading = true
            self.thumbnail = self.source = yield self.service.downloadTROS(self.id)
          } catch (e) {
            self.error = e
          } finally {
            self.loading = false
          }
        }
      })
    }
  })
  .actions(self => ({
    afterAttach: flow(function*() {
      if (self.url) {
        yield self.downloadThumbnail()
      } else {
        yield self.download()
      }
    })
  }))
export type IFileType = typeof File.Type
export interface IFile extends IFileType {}

export const FileRef = types.maybe(
  types.reference(File, {
    get(id: string, parent: any) {
      return parent.service && parent.service.files && isAlive(parent.service.files.get(id)) && parent.service.files.get(id)
    },
    set(value: IFile) {
      return value.id
    }
  })
)

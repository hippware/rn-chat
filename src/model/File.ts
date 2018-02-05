// tslint:disable-next-line:no_unused-variable
import {types, IType, flow, IModelType} from 'mobx-state-tree'
import {Base} from './Base'
import {waitFor} from './utils'

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
      item: types.maybe(types.string)
    })
  )
  .named('File')
  .volatile(self => ({
    _source: null,
    _thumbnail: null,
    loading: false,
    isNew: false,
    url: '',
    error: ''
  }))
  .views(self => ({
    get loaded() {
      return self._source !== null
    },
    get thumbnail(): IFileSource | null {
      return self._thumbnail
    },
    get source(): IFileSource | null {
      return self._source
    }
  }))
  .actions(self => {
    return {
      setURL: (url: string) => {
        self.url = url
      },
      downloadThumbnail: flow(function*() {
        const service = self.service
        if (!self.loading && !self.thumbnail && self.url) {
          try {
            self.error = ''
            self.loading = true
            self._thumbnail = yield self.service.downloadThumbnail(self.url, self.id)
            self.url = ''
          } catch (e) {
            self.error = e
          } finally {
            self.loading = false
          }
        }
      }),
      download: flow(function*() {
        if (!self._source && !self.loading) {
          try {
            self.error = ''
            self.loading = true
            self._thumbnail = self._source = yield self.service.downloadTROS(self.id)
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
      yield waitFor(() => self.service.connected)
      if (self.url) {
        yield self.downloadThumbnail()
      } else {
        yield self.download()
      }
    })
  }))
export type IFile = typeof File.Type

export const FileRef = types.maybe(
  types.reference(File, {
    get(id: string, parent: any) {
      if (!parent.service.files.get(id)) {
        parent.service.files.put(File.create({id}))
      }
      return parent.service.files.get(id)
    },
    set(value: IFile) {
      return value.id
    }
  })
)

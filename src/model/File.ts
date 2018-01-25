// tslint:disable-next-line:no_unused-variable
import {types, flow, IModelType} from 'mobx-state-tree'
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
      item: types.maybe(types.string),
      source: types.maybe(FileSource),
      thumbnail: types.maybe(FileSource),
      url: '',
      isNew: false
    })
  )
  .named('File')
  .volatile(self => ({
    loading: false,
    error: ''
  }))
  .views(self => ({
    get loaded() {
      return self.source !== null
    }
  }))
  .actions(self => {
    return {
      downloadThumbnail: flow(function*() {
        const service = self.service
        if (!self.loading && !self.thumbnail && self.url) {
          try {
            self.error = ''
            self.loading = true
            self.thumbnail = yield self.service.downloadThumbnail(self.url, self.id)
            self.url = ''
          } catch (e) {
            self.error = e
            console.warn(e)
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
            self.source = yield self.service.downloadTROS(self.id)
            self.thumbnail = self.source
          } catch (e) {
            console.warn(e)
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
      if (!self.thumbnail) {
        if (self.url) {
          yield self.downloadThumbnail()
        } else {
          yield self.download()
        }
      }
    })
  }))
export type IFile = typeof File.Type

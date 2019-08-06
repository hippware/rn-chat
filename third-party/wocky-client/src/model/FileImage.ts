import {types, getEnv, flow} from 'mobx-state-tree'
import {File} from './File'

export const Image = types.model('FileSource', {
  uri: types.string,
  contentType: types.maybeNull(types.string),
  width: types.maybeNull(types.number),
  height: types.maybeNull(types.number),
  cached: false,
})

export const FileImage = types
  .compose(
    File,
    types.model({
      id: types.identifier,
      source: types.maybeNull(Image),
      thumbnail: types.maybeNull(Image),
      url: '',
    })
  )
  .views(self => ({
    get loaded() {
      return self.thumbnail !== null
    },
  }))
  .postProcessSnapshot((snapshot: any) => {
    const res: any = {...snapshot}
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
      downloadURL: () => {
        throw new Error('It is abstract method!')
      },
      downloadThumbnail: flow(function*() {
        if (!self.loading && !self.thumbnail && self.url) {
          try {
            self.error = ''
            self.loading = true
            self.thumbnail = yield self.downloadFile(self.id, 'thumbnail', self.url)
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
    load({url, ...data}: any) {
      if (url) {
        if (!self.thumbnail) {
          self.setSource(undefined)
          self.setURL(url)
          self.downloadThumbnail()
        }
      } else {
        Object.assign(self, data)
      }
    },
    afterAttach: flow(function*() {
      const {fileService} = getEnv(self)
      // check if file cache is not cleared
      if (self.thumbnail) {
        const exists = yield fileService.fileExists(self.thumbnail.uri)
        if (!exists) {
          self.setSource(null)
        }
      }
      if (!self.thumbnail && !self.url) {
        self.url = yield self.downloadURL()
        yield self.downloadThumbnail()
      }
    }),
  }))
export type IFileImage = typeof FileImage.Type

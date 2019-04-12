import {types, isAlive, flow, Instance, getEnv} from 'mobx-state-tree'
import {Base} from './Base'

export const FileSource = types.model('FileSource', {
  uri: types.string,
  contentType: types.maybeNull(types.string),
  width: types.maybeNull(types.number),
  height: types.maybeNull(types.number),
  cached: false,
})

export const File = types
  .compose(
    Base,
    types.model({
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
        self.url = yield self.transport.downloadTROS(self.id)
        yield self.downloadThumbnail()
      }
    }),
  }))

export interface IFile extends Instance<typeof File> {}

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

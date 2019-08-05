import {types, getEnv, flow} from 'mobx-state-tree'
import {Base} from './Base'
import {IFileService} from '../transport/FileService'

export const File = types
  .compose(
    Base,
    types.model({
      id: types.identifier,
    })
  )
  .named('File')
  .volatile(() => ({
    loading: false,
    isNew: false,
    error: '',
  }))
  .actions(self => {
    const fs: IFileService = getEnv(self).fileService
    return {
      downloadFile: flow(function*(tros: string, name: string, sourceUrl: string) {
        const folder = `${fs.tempDir}/${tros.split('/').slice(-1)[0]}`
        if (!(yield fs.fileExists(folder))) {
          yield fs.mkdir(folder)
        }
        // check main cached picture first
        let fileName = `${folder}/main.jpeg`
        let cached = yield fs.fileExists(fileName)

        // check thumbnail
        if (!cached && name !== 'main') {
          fileName = `${folder}/${name}.jpeg`
          cached = yield fs.fileExists(fileName)
        }
        if (!cached) {
          yield fs.downloadHttpFile(sourceUrl, fileName, {})
        }
        const {width, height} = yield fs.getImageSize(fileName)
        return {uri: 'file://' + fileName, width, height}
      }),
    }
  })

export type IFile = typeof File.Type

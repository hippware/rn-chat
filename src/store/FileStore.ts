// tslint:disable-next-line:no_unused-variable
import {types, flow, getEnv, IModelType, isAlive, ISnapshottable, IExtendedObservableMap} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {autorun, when, reaction, IReactionDisposer, IObservableArray} from 'mobx'
import register from './RegisterStore'
import {Storages} from './Factory'

const NS = 'hippware.com/hxep/http-file'

export interface IFileService {
  tempDir: string
  fileExists(filename: string): Promise<boolean>
  mkdir(name: string): Promise<void>
  getImageSize(filename: string): Promise<{width: number; height: number}>
  downloadHttpFile(url: string, filename: string, headers: any): Promise<any>
  removeFile(filename: string): Promise<any>
}

export const FileStore = types
  .compose(register, Storages)
  .named('FileStore')
  .actions(self => ({
    _upload: flow(function*({method, headers, url, file}: any) {
      return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest()
        request.open(method, url, true)
        const resheaders: any = {}
        let headerArr = headers.header ? headers.header : []
        if (!Array.isArray(headerArr)) {
          headerArr = [headerArr]
        }
        for (const header of headerArr) {
          resheaders[header.name] = header.value
          request.setRequestHeader(header.name, header.value)
        }
        request.send(process.env.NODE_ENV === 'test' ? file.body : {uri: file.uri})
        request.onreadystatechange = function(oEvent) {
          if (request.readyState === 4) {
            if (request.status === 200) {
              resolve()
            } else {
              reject(new Error(`fileStore.upload error: ${request.responseText}`))
            }
          }
        }
      })
    })
  }))
  .actions(self => {
    return {
      downloadURL: flow(function*(tros: string) {
        const iq = $iq({type: 'get'})
          .c('download-request', {xmlns: NS})
          .c('id', {})
          .t(tros)
        let data = yield self.sendIQ(iq)
        if (!data) {
          throw 'invalid data'
        }
        if (!data.download) {
          throw 'file data should be defined'
        }
        data = data.download
        const headers: any = {}
        if (data.headers && data.headers.header) {
          let arr = data.headers.header
          if (!Array.isArray(arr)) {
            arr = [arr]
          }
          for (const header of arr) {
            headers[header.name] = header.value
          }
        }
        return {url: data.url, headers}
      })
    }
  })
  .actions(self => {
    const {fileService}: {fileService: IFileService} = getEnv(self)
    return {
      downloadFile: flow(function*(tros: string, name: string, sourceUrl: string) {
        const folder = `${fileService.tempDir}/${tros.split('/').slice(-1)[0]}`
        if (!(yield fileService.fileExists(folder))) {
          yield fileService.mkdir(folder)
        }
        const mainFileName = `${folder}/main.jpeg`
        const fileName = `${folder}/${name}.jpeg`
        const res: any = {uri: fileName, contentType: 'image/jpeg'}

        // check main file first
        if (yield fileService.fileExists(mainFileName)) {
          const response = yield fileService.getImageSize(mainFileName)
          if (response) {
            res.uri = mainFileName
            res.width = response.width
            res.height = response.height
            res.cached = true
            return res
          }
        }
        if (mainFileName !== fileName && (yield fileService.fileExists(fileName))) {
          const response = yield fileService.getImageSize(fileName)
          if (response) {
            res.width = response.width
            res.height = response.height
            res.cached = true
            return res
          }
        }
        try {
          let url = sourceUrl,
            headers = null
          if (!sourceUrl) {
            const data = yield self.downloadURL(tros)
            url = data.url
            headers = data.headers
          }
          yield fileService.downloadHttpFile(url, fileName, headers)
        } catch (e) {
          try {
            yield fileService.removeFile(fileName)
          } catch (err) {}
          throw e
        }
        res.cached = true
        const response = yield fileService.getImageSize(fileName)
        if (response) {
          res.width = response.width
          res.height = response.height
        }
        return res
      })
    }
  })
  .actions(self => {
    return {
      downloadThumbnail: flow(function*(url: string, tros: string) {
        return yield self.downloadFile(tros, 'thumbnail', url)
      }),
      downloadTROS: flow(function*(tros: string) {
        return yield self.downloadFile(tros, 'main', '')
      }),
      _requestUpload: flow(function*({file, size, width, height, access}: any) {
        const iq = $iq({type: 'set'})
          .c('upload-request', {xmlns: NS})
          .c('filename', {})
          .t(file!.name!)
          .up()
          .c('size', {})
          .t(size!)
          .up()
          .c('mime-type', {})
          .t(file.type!)
          .up()
          .c('width', {})
          .t(width!)
          .up()
          .c('height', {})
          .t(height!)
          .up()
        if (access) {
          iq.c('access', {}).t(access)
        }
        // pass file to the result
        const stanza = yield self.sendIQ(iq)
        const data = {...stanza.upload, file}
        // run upload in background
        self._upload(data)
        return data.reference_url
      })
    }
  })

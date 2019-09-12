import fs from 'react-native-fs'
import {Image} from 'react-native'
import {IFileService} from 'wocky-client'
import {Platform} from 'react-native'

class FileService implements IFileService {
  get tempDir() {
    return fs.CachesDirectoryPath
  }

  fileExists(filePath) {
    return fs.exists(filePath)
  }

  mkdir(folder) {
    return fs.mkdir(folder)
  }

  async upload({method, headers, url, file, isEmulator}: any) {
    const headerArr = headers.header ? headers.header : []
    // weird bug with emulator and upload files
    if (Platform.OS === 'ios' && isEmulator) {
      const resheaders: any = {}
      for (const header of headerArr) {
        resheaders[header.name] = header.value
      }
      const res = await fs.uploadFiles({
        toUrl: url,
        method,
        headers: resheaders,
        files: [{name: file.name, filename: file.name, filetype: 'image/jpeg', filepath: file.uri}],
      }).promise
      if (res.statusCode !== 200) {
        throw new Error('Server error')
      }
    } else {
      return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest()
        request.open(method, url, true)
        for (const header of headerArr) {
          request.setRequestHeader(header.name, header.value)
        }
        request.send(process.env.NODE_ENV === 'test' ? file.body : {uri: file.uri})
        request.onreadystatechange = () => {
          if (request.readyState === 4) {
            if (request.status === 200) {
              resolve()
            } else {
              reject(new Error(`fileStore.upload error: ${request.responseText}`))
            }
          }
        }
      })
    }
  }

  async getImageSize(uri: string): Promise<{width: number; height: number}> {
    return new Promise<{width; height}>((resolve, reject) =>
      Image.getSize(
        `file://${uri}`,
        (width, height) => {
          if (!width || !height) {
            reject(new Error(`Invalid image file: ${uri}`))
          } else {
            resolve({width, height})
          }
        },
        err => reject(err)
      )
    )
  }

  async downloadHttpFile(fromUrl: string, toFile: string, headers: any) {
    const {promise} = fs.downloadFile({
      fromUrl,
      toFile,
      headers,
      background: true,
      discretionary: true,
      readTimeout: 5 * 60 * 1000, // 5 min
    })
    const {statusCode} = await promise
    if (statusCode !== 200) {
      try {
        await this.removeFile(toFile)
      } catch (e) {
        // do nothing
      }
      throw new Error(`Cannot download file ${fromUrl}`)
    }
  }
  async removeFile(name: string) {
    await fs.unlink(name)
  }
}

const fileService = new FileService()
export default fileService

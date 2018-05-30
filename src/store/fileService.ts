import fs from 'react-native-fs'
import {Image} from 'react-native'
import {IFileService} from 'wocky-client'
export class FileService implements IFileService {
  get tempDir() {
    return fs.CachesDirectoryPath
  }

  fileExists(filePath) {
    return fs.exists(filePath)
  }

  mkdir(folder) {
    return fs.mkdir(folder)
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
    const {promise} = fs.downloadFile({fromUrl, toFile, headers})
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

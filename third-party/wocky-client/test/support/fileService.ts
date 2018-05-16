import {IFileService} from '../../src/store/FileStore'
const fs = require('fs')
const denodeify = require('denodeify')
const mkdir = denodeify(fs.mkdir)

export class FileService implements IFileService {
  get tempDir() {
    return require('os').tmpdir()
  }

  fileExists(filePath: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      fs.stat(filePath, function(error: any, stat: any): void {
        if (error) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    })
  }
  mkdir(folder: string) {
    return mkdir(folder)
  }
  getImageSize(filename: string): Promise<{width: number; height: number}> {
    return new Promise((resolve, reject) => resolve({width: 0, height: 0}))
  }
  downloadHttpFile(urlString: string, fileName: string, headers: any): Promise<any> {
    const URL = require('url')
    const http = require('http')
    const url = URL.parse(urlString)

    return new Promise((resolve, reject) => {
      http
        .get(
          {
            host: url.hostname,
            port: url.port,
            path: url.path,
            headers,
          },
          (response: any) => {
            if (response.statusCode !== 200) {
              reject(`Invalid status code ${response.statusCode}`)
              return
            }
            const file = fs.createWriteStream(fileName)
            response.pipe(file)
            file.on('finish', () => {
              file.close(resolve(fileName)) // close() is async, call cb after close completes.
            })
          }
        )
        .on('error', (err: any) => {
          // Handle errors
          reject(err.message)
        })
    })
  }
  removeFile = denodeify(fs.unlink)
}

const fileService = new FileService()
export default fileService

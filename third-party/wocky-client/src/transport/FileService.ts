export interface IFileService {
  tempDir: string
  fileExists(filename: string): Promise<boolean>
  mkdir(name: string): Promise<void>
  getImageSize(filename: string): Promise<{width: number; height: number}>
  downloadHttpFile(url: string, filename: string, headers: any): Promise<any>
  removeFile(filename: string): Promise<any>
  loadCachedFile(tros: string, name: string): Promise<any>
}

export class AbstractFileService implements IFileService {
  get tempDir(): string {
    throw new Error('Not supported')
  }
  fileExists(filename: string): Promise<boolean> {
    throw new Error('Not supported')
  }
  mkdir(name: string): Promise<void> {
    throw new Error('Not supported')
  }
  getImageSize(filename: string): Promise<{width: number; height: number}> {
    throw new Error('Not supported')
  }
  downloadHttpFile(url: string, filename: string, headers: any): Promise<any> {
    throw new Error('Not supported')
  }
  removeFile(filename: string): Promise<any> {
    throw new Error('Not supported')
  }
  async loadCachedFile(tros: string, name: string) {
    const folder = `${this.tempDir}/${tros.split('/').slice(-1)[0]}`
    if (!await this.fileExists(folder)) {
      await this.mkdir(folder)
    }
    const mainFileName = `${folder}/main.jpeg`
    const fileName = `${folder}/${name}.jpeg`
    const res: any = {uri: fileName, contentType: 'image/jpeg'}

    // check main file first
    if (await this.fileExists(mainFileName)) {
      const response = await this.getImageSize(mainFileName)
      if (response) {
        res.uri = mainFileName
        res.width = response.width
        res.height = response.height
        res.cached = true
        return res
      }
    }
    if (mainFileName !== fileName && (await this.fileExists(fileName))) {
      const response = await this.getImageSize(fileName)
      if (response) {
        res.width = response.width
        res.height = response.height
        res.cached = true
        return res
      }
    }
    return null
  }
}

export async function upload({method, headers, url, file}: any) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.open(method, url, true)
    const resheaders: any = {}
    const headerArr = headers.header ? headers.header : []
    for (const header of headerArr) {
      resheaders[header.name] = header.value
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

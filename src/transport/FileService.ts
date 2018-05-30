export interface IFileService {
  tempDir: string
  fileExists(filename: string): Promise<boolean>
  mkdir(name: string): Promise<void>
  getImageSize(filename: string): Promise<{width: number; height: number}>
  downloadHttpFile(url: string, filename: string, headers: any): Promise<any>
  removeFile(filename: string): Promise<any>
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

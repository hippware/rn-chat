import XmppStropheV2 from '../../src/store/XmppStropheV2'
import {Wocky, IWocky} from '../../src'
import fileService from './fileService'
import {simpleActionLogger} from 'mst-middlewares'
import {addMiddleware} from 'mobx-state-tree'
import {when} from 'mobx'
const fs = require('fs')

export function testFile() {
  const fileName = `${__dirname}/../img/test.jpg`
  const file = {name: fileName.substring(fileName.lastIndexOf('/') + 1), body: fs.readFileSync(fileName), type: 'image/jpeg'}
  const data = {height: 300, width: 300, size: 3801, file}
  return data
}

export function expectedImage() {
  const fileNameThumbnail = `${__dirname}/../img/test-thumbnail.jpg`
  const expectedBuf = fs.readFileSync(fileNameThumbnail)
  return expectedBuf.toString()
}
export async function createXmpp(num: number): Promise<IWocky> {
  try {
    const provider = new XmppStropheV2()
    const phoneNumber = `000000${num.toString()}`
    const service = Wocky.create(
      {resource: 'testing', host: 'testing.dev.tinyrobot.com'},
      {provider, fileService, logger: {log: (msg: string, ...params: Array<any>) => console.log(msg, ...params)}}
    )
    addMiddleware(service, simpleActionLogger)
    await service.testRegister({phoneNumber})
    await service.login()
    return service
  } catch (e) {
    console.error(e)
    throw e
  }
}

export async function waitFor(condition: () => boolean) {
  return new Promise((resolve, reject) => {
    when(
      () => {
        let res = false
        try {
          res = condition()
        } catch (e) {
          reject(e)
        }
        return res
      },
      () => {
        resolve()
      }
    )
  })
}

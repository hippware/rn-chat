import XmppStropheV2 from '../../src/store/XmppStropheV2'
import {Wocky, IWocky} from '../../src'
import fileService from './fileService'
import {simpleActionLogger} from 'mst-middlewares'
import {addMiddleware} from 'mobx-state-tree'
import {when} from 'mobx'

export async function createXmpp(num: number): Promise<IWocky> {
  const provider = new XmppStropheV2(console.log)
  const phoneNumber = `000000${num.toString()}`
  const service = Wocky.create({resource: 'testing', host: 'testing.dev.tinyrobot.com'}, {provider, fileService, logger: {log: () => {}}})
  addMiddleware(service, simpleActionLogger)
  await service.testRegister({phoneNumber})
  await service.login()
  return service
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

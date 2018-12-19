import {Wocky, IWocky, NextGraphQLTransport} from '../../src'
import {AppInfo} from '../../src/store/AppInfo'
import fileService from './fileService'
import {simpleActionLogger} from 'mst-middlewares'
import {addMiddleware, setLivelynessChecking} from 'mobx-state-tree'
import {when} from 'mobx'
import _ from 'lodash'

setLivelynessChecking('error')

const SERVER_NAME = 'testing'
const appInfo = AppInfo.create({
  deviceId: 'test',
  uniqueId: 'test',
  systemName: 'unitTest',
  jsVersion: '9.9.9',
  nativeVersion: '9.9.9',
  systemVersion: '1.0',
})
// tslint:disable:no-console

const fs = require('fs')

export function timestamp() {
  console.log('TIME: ', new Date().toLocaleString())
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

export function testFile() {
  const fileName = `${__dirname}/../img/test.jpg`
  const file = {
    name: fileName.substring(fileName.lastIndexOf('/') + 1),
    body: fs.readFileSync(fileName),
    type: 'image/jpeg',
  }
  const data = {height: 300, width: 300, size: 3801, file}
  return data
}

export function expectedImage() {
  const fileNameThumbnail = `${__dirname}/../img/test-thumbnail.jpg`
  const expectedBuf = fs.readFileSync(fileNameThumbnail)
  return expectedBuf.toString()
}

export async function createUser(num?: number, phoneNum?: string): Promise<IWocky> {
  try {
    const transport = new NextGraphQLTransport(SERVER_NAME)
    const phoneNumber =
      phoneNum ||
      (num
        ? `+1555000000${num.toString()}`
        : _.padStart(`+1555${Math.trunc(Math.random() * 10000000).toString()}`, 7, '0'))
    const host = process.env.WOCKY_LOCAL ? 'localhost' : `${SERVER_NAME}.dev.tinyrobot.com`
    const service = Wocky.create(
      {host},
      {
        appInfo,
        transport,
        fileService,
        logger: console,
      }
    )
    addMiddleware(service, simpleActionLogger)

    await service.login({
      phoneNumber,
    })
    return service
  } catch (e) {
    console.error(e)
    throw e
  }
}

export async function waitFor(
  condition: () => boolean,
  errorMessage: string = '',
  timeout: number = 3000
) {
  const promise = new Promise((resolve, reject) => {
    when(() => {
      let res = false
      try {
        res = condition()
      } catch (e) {
        reject(e)
      }
      return res
    }, resolve)
  })
  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(
      () => reject(`waitFor timed out in ${timeout} milliseconds.\r\n${errorMessage}`),
      timeout
    )
  })
  return Promise.race([promise, timeoutPromise])
}

import {Wocky, IWocky, Transport} from '../../src'
import {IBot} from '../../src/model/Bot'
import fileService from './fileService'
import {simpleActionLogger} from 'mst-middlewares'
import {addMiddleware, setLivelynessChecking} from 'mobx-state-tree'
import {when} from 'mobx'
import _ from 'lodash'
import jsrsasign from 'jsrsasign'
import uuid from 'uuid/v1'

setLivelynessChecking('error')

const SERVER_NAME = 'testing'
// tslint:disable:no-console
const fs = require('fs')

function token(credentials: any) {
  const payload = {
    aud: 'Wocky',
    jti: uuid(),
    iss: 'TinyRobot/9.9.9 unitTest 1.0; test',
    dvc: 'test',
    ...credentials,
  }

  const magicKey = '0xszZmLxKWdYjvjXOxchnV+ttjVYkU1ieymigubkJZ9dqjnl7WPYLYqLhvC10TaH'
  const header = {alg: 'HS512', typ: 'JWT'}
  const jwt = jsrsasign.jws.JWS.sign('HS512', header, payload, {utf8: magicKey})
  return jwt
}

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
    const transport = new Transport(SERVER_NAME)
    const phoneNumber =
      phoneNum ||
      (num
        ? `+1555000000${num.toString()}`
        : _.padStart(`+1555${Math.trunc(Math.random() * 10000000).toString()}`, 7, '0'))
    const host = process.env.WOCKY_LOCAL ? 'localhost' : `${SERVER_NAME}.dev.tinyrobot.com`
    const service = Wocky.create(
      {host},
      {
        transport,
        fileService,
        logger: console,
      }
    )
    addMiddleware(service, simpleActionLogger)

    await service.login(
      token({
        phone_number: phoneNumber,
        typ: 'bypass',
        sub: phoneNumber,
      })
    )
    return service
  } catch (e) {
    console.error(e)
    throw e
  }
}

// Fills in some common fields with commonly-used patterns
export async function fillAndSaveProfile(user: IWocky, firstName: string, lastName: string) {
  const handle = 'user' + user.profile!.phoneNumber!.replace('+', '')
  await user.profile!.update({
    handle,
    firstName,
    lastName,
    // @hippware.com is useful for debugging
    email: handle + (process.env.WOCKY_VERBOSE ? '@hippware.com' : '@example.com'),
  })
  await user.profile!.save()
}

export async function dumpProfile(user: IWocky, label: string = 'USER') {
  console.log(
    `${label}: ${JSON.stringify({
      id: user.profile!.id,
      firstName: user.profile!.firstName,
      lastName: user.profile!.lastName,
      handle: user.profile!.handle,
      phoneNumber: user.profile!.phoneNumber,
      email: user.profile!.email,
    })}`
  )
}

export async function dumpBot(bot: IBot, label: string = 'BOT') {
  console.log(`${label}: ${JSON.stringify(bot)}`)
}

export async function waitFor(
  condition: () => boolean,
  errorMessage: string = '',
  timeout: number = 10000
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

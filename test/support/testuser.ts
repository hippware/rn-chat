import XmppStropheV2 from '../../src/transport/XmppStropheV2'
import {Wocky, XmppTransport, IWocky, HybridTransport, GraphQLTransport} from '../../src'
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
    const xmppTransport = new XmppTransport(provider, fileService, 'testing')
    const gql = new GraphQLTransport('testing')
    const transport = new HybridTransport(xmppTransport, gql)
    // const provider = new XmppStropheV2(console.log)
    const phoneNumber = `000000${num.toString()}`
    const service = Wocky.create({host: 'testing.dev.tinyrobot.com'}, {transport, fileService, logger: {log: (msg: string, ...params: Array<any>) => console.log(msg, ...params)}})
    addMiddleware(service, simpleActionLogger)
    await service.register({
      userID: `000000${phoneNumber}`,
      phoneNumber: `+1555${phoneNumber}`,
      authTokenSecret: '',
      authToken: '',
      emailAddressIsVerified: false,
      'X-Auth-Service-Provider': 'http://localhost:9999',
      emailAddress: '',
      'X-Verify-Credentials-Authorization': ''
    })
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
export const homestreamTestData = {
  from: '3b6cc090-09b4-11e8-8634-0a580a0206c7@testing.dev.tinyrobot.com',
  to: '3b6cc090-09b4-11e8-8634-0a580a0206c7@testing.dev.tinyrobot.com/testing',
  id: 'f5e516ee-5911-4aa9-9e18-9fc3f688f3e4:iq',
  type: 'result',
  xmlns: 'jabber:client',
  items: {
    xmlns: 'hippware.com/hxep/publishing',
    node: 'home_stream',
    version: '2018-02-04T14:04:10.944022Z',
    item: [
      {
        id: 'testing.dev.tinyrobot.com/bot/f9002b8a-0a52-11e8-b066-0a580a0206c7/description',
        version: '2018-02-05T09:00:19.675377Z',
        from: 'testing.dev.tinyrobot.com/bot/f9002b8a-0a52-11e8-b066-0a580a0206c7',
        message: {
          type: 'headline',
          'bot-description-changed': {
            xmlns: 'hippware.com/hxep/bot',
            bot: {
              xmlns: 'hippware.com/hxep/bot',
              field: [
                {var: 'subscribed', type: 'bool', value: 'true'},
                {var: 'image_items', type: 'int', value: '1'},
                {var: 'total_items', type: 'int', value: '2'},
                {var: 'jid', type: 'jid', value: 'testing.dev.tinyrobot.com/bot/f9002b8a-0a52-11e8-b066-0a580a0206c7'},
                {var: 'address', type: 'string'},
                {var: 'address_data', type: 'string', value: 'null'},
                {var: 'alerts', type: 'int', value: '0'},
                {var: 'description', type: 'string', value: 'New description2'},
                {var: 'id', type: 'string', value: 'f9002b8a-0a52-11e8-b066-0a580a0206c7'},
                {
                  var: 'image',
                  type: 'string',
                  value: 'tros:f57c6690-0a52-11e8-bc08-0a580a02057d@testing.dev.tinyrobot.com/file/fab30420-0a52-11e8-ba6a-0a580a0206c7'
                },
                {var: 'location', type: 'geoloc', geoloc: {xmlns: 'http://jabber.org/protocol/geoloc', lat: '1.300000', lon: '2.300000'}},
                {var: 'visibility', type: 'int', value: '100'},
                {var: 'radius', type: 'float', value: '3.00000000000000000000e+01'},
                {var: 'server', type: 'string', value: 'testing.dev.tinyrobot.com'},
                {var: 'shortname', type: 'string'},
                {var: 'subscribers+size', type: 'int', value: '1'},
                {var: 'subscribers+hash', type: 'string', value: '28b6abe8d4038edbf742297f13af0786'},
                {var: 'title', type: 'string', value: 'Test bot!'},
                {var: 'type', type: 'string'},
                {var: 'updated', type: 'timestamp', value: '2018-02-05T09:00:19.649618Z'},
                {var: 'owner', type: 'jid', value: 'f57c6690-0a52-11e8-bc08-0a580a02057d@testing.dev.tinyrobot.com'}
              ],
              tags: [{var: 'tags', type: 'tags'}, null],
              subscribed: 'true',
              image_items: '1',
              total_items: '2',
              jid: 'testing.dev.tinyrobot.com/bot/f9002b8a-0a52-11e8-b066-0a580a0206c7',
              address_data: 'null',
              alerts: '0',
              description: 'New description2',
              id: 'f9002b8a-0a52-11e8-b066-0a580a0206c7',
              image: {
                thumbnail_url:
                  'https://s3-us-west-2.amazonaws.com/wocky-kube-tros-testing/testing.dev.tinyrobot.com-6774/fab30420-0a52-11e8-ba6a-0a580a0206c7-thumbnail?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJOOG6KJT7K4EHNCA%2F20180205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20180205T090019Z&X-Amz-Expires=600&X-Amz-SignedHeaders=host&X-Amz-Signature=b554b0a4cfe6bba954d6a91d04ead0017221e0542878be5479c4a9b1eef61446',
                full_url:
                  'https://s3-us-west-2.amazonaws.com/wocky-kube-tros-testing/testing.dev.tinyrobot.com-6774/fab30420-0a52-11e8-ba6a-0a580a0206c7?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJOOG6KJT7K4EHNCA%2F20180205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20180205T090019Z&X-Amz-Expires=600&X-Amz-SignedHeaders=host&X-Amz-Signature=0b19a49e6893c31a7c5ccb071cd2c88dd17951c2256a7af1745c7f56628d376e',
                '#text': 'tros:f57c6690-0a52-11e8-bc08-0a580a02057d@testing.dev.tinyrobot.com/file/fab30420-0a52-11e8-ba6a-0a580a0206c7'
              },
              location: {geoloc: {xmlns: 'http://jabber.org/protocol/geoloc', lat: '1.300000', lon: '2.300000'}},
              visibility: '100',
              radius: '3.00000000000000000000e+01',
              server: 'testing.dev.tinyrobot.com',
              subscribers: {size: '1', hash: '28b6abe8d4038edbf742297f13af0786'},
              title: 'Test bot!',
              updated: '2018-02-05T09:00:19.649618Z',
              owner: 'f57c6690-0a52-11e8-bc08-0a580a02057d@testing.dev.tinyrobot.com'
            }
          }
        }
      },
      {
        id: 'testing.dev.tinyrobot.com/bot/45f3c018-09b4-11e8-a764-0a580a02057d',
        version: '2018-02-04T14:04:10.944022Z',
        from: 'testing.dev.tinyrobot.com',
        message: {
          type: 'headline',
          bot: {
            xmlns: 'hippware.com/hxep/bot',
            jid: 'testing.dev.tinyrobot.com/bot/45f3c018-09b4-11e8-a764-0a580a02057d',
            id: '45f3c018-09b4-11e8-a764-0a580a02057d',
            server: 'testing.dev.tinyrobot.com',
            action: 'show'
          }
        }
      },
      {
        id: 'testing.dev.tinyrobot.com/bot/3d577dbe-09b4-11e8-b7e5-0a580a02057d',
        version: '2018-02-04T14:03:56.742476Z',
        from: '39e09af8-09b4-11e8-80d4-0a580a02057d@testing.dev.tinyrobot.com/testing',
        message: {
          from: '39e09af8-09b4-11e8-80d4-0a580a02057d@testing.dev.tinyrobot.com',
          type: 'headline',
          to: 'testing.dev.tinyrobot.com',
          body: 'hello followers!',
          bot: {
            xmlns: 'hippware.com/hxep/bot',
            jid: 'testing.dev.tinyrobot.com/bot/3d577dbe-09b4-11e8-b7e5-0a580a02057d',
            id: '3d577dbe-09b4-11e8-b7e5-0a580a02057d',
            server: 'testing.dev.tinyrobot.com',
            action: 'share'
          }
        }
      }
    ],
    set: {
      xmlns: 'http://jabber.org/protocol/rsm',
      first: {index: '0', '#text': 'testing.dev.tinyrobot.com/bot/3d577dbe-09b4-11e8-b7e5-0a580a02057d'},
      last: 'testing.dev.tinyrobot.com/bot/45f3c018-09b4-11e8-a764-0a580a02057d',
      count: '2'
    },
    'extra-data': {
      bot: [
        {
          xmlns: 'hippware.com/hxep/bot',
          field: [
            {var: 'subscribed', type: 'bool', value: 'false'},
            {var: 'image_items', type: 'int', value: '1'},
            {var: 'total_items', type: 'int', value: '2'},
            {var: 'jid', type: 'jid', value: 'testing.dev.tinyrobot.com/bot/3d577dbe-09b4-11e8-b7e5-0a580a02057d'},
            {var: 'address', type: 'string'},
            {var: 'address_data', type: 'string', value: 'null'},
            {var: 'alerts', type: 'int', value: '0'},
            {var: 'description', type: 'string', value: 'New description'},
            {var: 'id', type: 'string', value: '3d577dbe-09b4-11e8-b7e5-0a580a02057d'},
            {
              var: 'image',
              type: 'string',
              value: 'tros:39e09af8-09b4-11e8-80d4-0a580a02057d@testing.dev.tinyrobot.com/file/3efde978-09b4-11e8-98a0-0a580a02057d'
            },
            {var: 'location', type: 'geoloc', geoloc: {xmlns: 'http://jabber.org/protocol/geoloc', lat: '1.300000', lon: '2.300000'}},
            {var: 'visibility', type: 'int', value: '100'},
            {var: 'radius', type: 'float', value: '3.00000000000000000000e+01'},
            {var: 'server', type: 'string', value: 'testing.dev.tinyrobot.com'},
            {var: 'shortname', type: 'string'},
            {var: 'subscribers+size', type: 'int', value: '0'},
            {var: 'subscribers+hash', type: 'string', value: 'd41d8cd98f00b204e9800998ecf8427e'},
            {var: 'title', type: 'string', value: 'Test bot!'},
            {var: 'type', type: 'string'},
            {var: 'updated', type: 'timestamp', value: '2018-02-04T14:03:59.953149Z'},
            {var: 'owner', type: 'jid', value: '39e09af8-09b4-11e8-80d4-0a580a02057d@testing.dev.tinyrobot.com'}
          ],
          tags: [{var: 'tags', type: 'tags'}, null],
          subscribed: 'false',
          image_items: '1',
          total_items: '2',
          jid: 'testing.dev.tinyrobot.com/bot/3d577dbe-09b4-11e8-b7e5-0a580a02057d',
          address_data: 'null',
          alerts: '0',
          description: 'New description',
          id: '3d577dbe-09b4-11e8-b7e5-0a580a02057d',
          image: {
            thumbnail_url:
              'https://s3-us-west-2.amazonaws.com/wocky-kube-tros-testing/testing.dev.tinyrobot.com-26b1/3efde978-09b4-11e8-98a0-0a580a02057d-thumbnail?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJOOG6KJT7K4EHNCA%2F20180204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20180204T140415Z&X-Amz-Expires=600&X-Amz-SignedHeaders=host&X-Amz-Signature=8712360347540deaf778ce626b3af91c5713f7a047ab8d39a5020c4104dc2619',
            full_url:
              'https://s3-us-west-2.amazonaws.com/wocky-kube-tros-testing/testing.dev.tinyrobot.com-26b1/3efde978-09b4-11e8-98a0-0a580a02057d?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJOOG6KJT7K4EHNCA%2F20180204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20180204T140415Z&X-Amz-Expires=600&X-Amz-SignedHeaders=host&X-Amz-Signature=74c8bc9f6404c17a51a32daee57303d59da4e072c9fa24311e788cc0d35cf9f3',
            '#text': 'tros:39e09af8-09b4-11e8-80d4-0a580a02057d@testing.dev.tinyrobot.com/file/3efde978-09b4-11e8-98a0-0a580a02057d'
          },
          location: {geoloc: {xmlns: 'http://jabber.org/protocol/geoloc', lat: '1.300000', lon: '2.300000'}},
          visibility: '100',
          radius: '3.00000000000000000000e+01',
          server: 'testing.dev.tinyrobot.com',
          subscribers: {size: '0', hash: 'd41d8cd98f00b204e9800998ecf8427e'},
          title: 'Test bot!',
          updated: '2018-02-04T14:03:59.953149Z',
          owner: '39e09af8-09b4-11e8-80d4-0a580a02057d@testing.dev.tinyrobot.com'
        },
        {
          xmlns: 'hippware.com/hxep/bot',
          field: [
            {var: 'subscribed', type: 'bool', value: 'false'},
            {var: 'image_items', type: 'int', value: '0'},
            {var: 'total_items', type: 'int', value: '0'},
            {var: 'jid', type: 'jid', value: 'testing.dev.tinyrobot.com/bot/45f3c018-09b4-11e8-a764-0a580a02057d'},
            {var: 'address', type: 'string'},
            {var: 'address_data', type: 'string', value: 'null'},
            {var: 'alerts', type: 'int', value: '0'},
            {var: 'description', type: 'string'},
            {var: 'id', type: 'string', value: '45f3c018-09b4-11e8-a764-0a580a02057d'},
            {var: 'image', type: 'string'},
            {var: 'location', type: 'geoloc', geoloc: {xmlns: 'http://jabber.org/protocol/geoloc', lat: '1.200000', lon: '2.200000'}},
            {var: 'visibility', type: 'int', value: '100'},
            {var: 'radius', type: 'float', value: '3.00000000000000000000e+01'},
            {var: 'server', type: 'string', value: 'testing.dev.tinyrobot.com'},
            {var: 'shortname', type: 'string'},
            {var: 'subscribers+size', type: 'int', value: '0'},
            {var: 'subscribers+hash', type: 'string', value: 'd41d8cd98f00b204e9800998ecf8427e'},
            {var: 'title', type: 'string', value: 'Test bot2'},
            {var: 'type', type: 'string'},
            {var: 'updated', type: 'timestamp', value: '2018-02-04T14:04:10.911004Z'},
            {var: 'owner', type: 'jid', value: '39e09af8-09b4-11e8-80d4-0a580a02057d@testing.dev.tinyrobot.com'}
          ],
          tags: [{var: 'tags', type: 'tags'}, null],
          subscribed: 'false',
          image_items: '0',
          total_items: '0',
          jid: 'testing.dev.tinyrobot.com/bot/45f3c018-09b4-11e8-a764-0a580a02057d',
          address_data: 'null',
          alerts: '0',
          id: '45f3c018-09b4-11e8-a764-0a580a02057d',
          location: {geoloc: {xmlns: 'http://jabber.org/protocol/geoloc', lat: '1.200000', lon: '2.200000'}},
          visibility: '100',
          radius: '3.00000000000000000000e+01',
          server: 'testing.dev.tinyrobot.com',
          subscribers: {size: '0', hash: 'd41d8cd98f00b204e9800998ecf8427e'},
          title: 'Test bot2',
          updated: '2018-02-04T14:04:10.911004Z',
          owner: '39e09af8-09b4-11e8-80d4-0a580a02057d@testing.dev.tinyrobot.com'
        }
      ]
    }
  }
}

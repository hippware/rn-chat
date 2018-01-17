import XmppStropheV2 from '../../src/XmppStropheV2'
import XmppService, { IXmppService } from '../../src/index'

export async function createXmpp(num: any): Promise<IXmppService> {
  const data = testDataNew(num)
  const provider = new XmppStropheV2()
  const service = XmppService.create({ resource: data.resource, host: 'testing.dev.tinyrobot.com' }, { provider, logger: {log: () => {}} })
  await service.register(data.provider_data)
  await service.login()
  return service
}
const testUser = {
  userID: '000000',
  phoneNumber: '+1555000000',
  authTokenSecret: '',
  authToken: '',
  emailAddressIsVerified: false,
  'X-Auth-Service-Provider': 'http://localhost:9999',
  emailAddress: '',
  'X-Verify-Credentials-Authorization': ''
}

// export default function createTestUser(num, callback){
//    UserService.delegate = {onLoginSuccess: callback};
//    UserService.login({...testUser, userID: testUser.userID+num, phoneNumber: testUser.phoneNumber+num});
// }
export function testData(num: number, data = {}) {
  return {
    ...testUser,
    resource: 'testing',
    userID: testUser.userID + num,
    phoneNumber: testUser.phoneNumber + num,
    ...data
  }
}

export function testDataNew(num: number) {
  return {
    resource: 'testing',
    provider_data: {
      ...testUser,
      userID: testUser.userID + num,
      phoneNumber: testUser.phoneNumber + num
    }
  }
}

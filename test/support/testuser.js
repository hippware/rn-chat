import Promise from 'promise';
import XmppService from '../../src/store/xmpp/XmppService';
import XmppStropheV2 from '../../src/store/xmpp/XmppStropheV2';

export async function createXmpp(num) {
  const data = testDataNew(num);
  const provider = new XmppStropheV2('testing.dev.tinyrobot.com', console.log);
  const service = new XmppService(provider);
  const {user, password} = await service.register(data.resource, data.provider_data);
  await service.login(user, password, data.resource);
  return service;
}
const testUser = {
  userID: '000000',
  phoneNumber: '+1555000000',
  authTokenSecret: '',
  authToken: '',
  emailAddressIsVerified: false,
  'X-Auth-Service-Provider': 'http://localhost:9999',
  emailAddress: '',
  'X-Verify-Credentials-Authorization': '',
};

// export default function createTestUser(num, callback){
//    UserService.delegate = {onLoginSuccess: callback};
//    UserService.login({...testUser, userID: testUser.userID+num, phoneNumber: testUser.phoneNumber+num});
// }
export function testData(num, data = {}) {
  return {
    ...testUser,
    resource: 'testing',
    userID: testUser.userID + num,
    handle: testUser.handle + num,
    phoneNumber: testUser.phoneNumber + num,
    ...data,
  };
}

export function testDataNew(num) {
  return {
    resource: 'testing',
    provider_data: {...testUser, userID: testUser.userID + num, phoneNumber: testUser.phoneNumber + num},
  };
}

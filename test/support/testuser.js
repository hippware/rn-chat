import UserService from '../../src/services/UserService';
import Promise from 'promise';
const testUser = {
    userID:'000000',
    phoneNumber:'+1555000000',
    resource:'testing',
    authTokenSecret: '',
    authToken: '',
    handle: 'testUser',
    emailAddressIsVerified: false,
    'X-Auth-Service-Provider': 'http://localhost:9999',
    emailAddress: '',
    'X-Verify-Credentials-Authorization': ''
};

//export default function createTestUser(num, callback){
//    UserService.delegate = {onLoginSuccess: callback};
//    UserService.login({...testUser, userID: testUser.userID+num, phoneNumber: testUser.phoneNumber+num});
//}
export default function createTestUser(num, data = {}){
    return UserService.login({...testUser, userID: testUser.userID+num, handle: testUser.handle+num, phoneNumber: testUser.phoneNumber+num, ...data});
}
export function testData(num, data={}){
    return {...testUser, userID: testUser.userID+num, handle: testUser.handle+num, phoneNumber: testUser.phoneNumber+num, ...data};
}

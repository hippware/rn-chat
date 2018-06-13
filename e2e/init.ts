const detox1 = require('detox')
const config = require('../package.json').detox
require('../third-party/wocky-client/test/support/setup.js')
import {createXmpp} from '../third-party/wocky-client/test/support/testuser'

before(async () => {
  await clearTestUser()
  await detox1.init(config)
  // set permissions before running any tests: https://github.com/wix/detox/blob/master/docs/APIRef.DeviceObjectAPI.md#devicelaunchappparams
  await device.launchApp({permissions: {location: 'always', notifications: 'YES'}})
})

after(async () => {
  await clearTestUser()
  await detox1.cleanup()
})

async function clearTestUser(): Promise<void> {
  // full phone number = +155500000044
  const testUser = await createXmpp(44)
  await testUser.remove()
}

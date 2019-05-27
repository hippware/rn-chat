import detox from 'detox'
const config = require('../package.json').detox
import adapter from 'detox/runners/jest/adapter'
import specReporter from 'detox/runners/jest/specReporter'

// Set the default timeout
jest.setTimeout(120000)
jasmine.getEnv().addReporter(adapter)

// This takes care of generating status logs on a per-spec basis. By default, jest only reports at file-level.
// This is strictly optional.
jasmine.getEnv().addReporter(specReporter)

beforeAll(async () => {
  await detox.init(config)
})

beforeEach(async () => {
  await adapter.beforeEach()
})

afterAll(async () => {
  await adapter.afterAll()
  await detox.cleanup()
})

// todo: create and destroy test user after each full test run
// before(async () => {
//   await clearTestUser()
//   await detox1.init(config)
//   // set permissions before running any tests: https://github.com/wix/detox/blob/master/docs/APIRef.DeviceObjectAPI.md#devicelaunchappparams
//   await device.launchApp({permissions: {location: 'always', notifications: 'YES'}})
// })

// after(async () => {
//   await clearTestUser()
//   await detox1.cleanup()
// })

// async function clearTestUser(): Promise<void> {
//   // full phone number = +155500000044
//   const testUser = await createXmpp(44)
//   await testUser.remove()
// }

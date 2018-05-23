const detox1 = require('detox')
const config = require('../package.json').detox

before(async () => {
  await detox1.init(config)
  // set permissions before running any tests: https://github.com/wix/detox/blob/master/docs/APIRef.DeviceObjectAPI.md#devicelaunchappparams
  await device.launchApp({permissions: {location: 'always', notifications: 'YES'}})
})

after(async () => {
  await detox1.cleanup()
})

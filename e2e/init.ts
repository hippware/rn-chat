import detox from 'detox'
const config = require('../package.json').detox
import adapter from 'detox/runners/jest/adapter'
import specReporter from 'detox/runners/jest/specReporter'

// Set the default timeout
jest.setTimeout(120000)
;(jasmine as any).getEnv().addReporter(adapter)

// This takes care of generating status logs on a per-spec basis. By default, jest only reports at file-level.
// This is strictly optional.
;(jasmine as any).getEnv().addReporter(specReporter)

beforeAll(async () => {
  await detox.init(config)
  // set permissions before running any tests: https://github.com/wix/detox/blob/master/docs/APIRef.DeviceObjectAPI.md#devicelaunchappparams
  await device.launchApp({
    newInstance: true,
    permissions: {location: 'always', notifications: 'YES', motion: 'YES'},
  })

  // todo: install fbsimctl with brew? If we want tests for screens that depend on specific locations this would be mandatory
  // https://github.com/wix/detox/blob/master/docs/APIRef.DeviceObjectAPI.md#devicesetlocationlat-lon
  // await device.setLocation(34.078169, -118.3870989)
})

beforeEach(async () => {
  await adapter.beforeEach()
})

afterAll(async () => {
  await adapter.afterAll()
  await detox.cleanup()
})

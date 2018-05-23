const detox1 = require('detox')
const config = require('../package.json').detox

before(async () => {
  await detox1.init(config)
})

after(async () => {
  await detox1.cleanup()
})

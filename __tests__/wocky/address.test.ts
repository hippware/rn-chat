import {Address} from '../../src/model/Address'
import {Bot} from '../../src/model/Bot'

describe('Address', () => {
  it('location short', async done => {
    try {
      const address = Address.create({city: 'Koper', country: 'Slovenia'})
      expect(address.locationShort).toEqual('Koper, Slovenia')
      const address2 = Address.create({city: 'San Jose', country: 'US', state: 'CA'})
      expect(address2.locationShort).toEqual('San Jose, CA')
      done()
    } catch (e) {
      done(e)
    }
  })
  it('bot address', async done => {
    try {
      const data =
        '{"city":"Los Angeles","country":"United States","state":"CA","county":"Los Angeles County","address":""}'
      const bot = Bot.create({id: '1', owner: '1'})
      bot.load({addressData: data})
      expect(bot.addressData!.city).toEqual('Los Angeles')
      expect(bot.addressData!.country).toEqual('United States')
      expect(bot.addressData!.state).toEqual('CA')
      expect(bot.addressData!.county).toEqual('Los Angeles County')
      done()
    } catch (e) {
      done(e)
    }
  })
})

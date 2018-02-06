import {expect} from 'chai'
import {Address} from '../src/model/Address'
import {Bot} from '../src/model/Bot'

describe('Address', () => {
  it('location short', async done => {
    try {
      const address = Address.create({city: 'Koper', country: 'Slovenia'})
      expect(address.locationShort).to.be.equal('Koper, Slovenia')
      const address2 = Address.create({city: 'San Jose', country: 'US', state: 'CA'})
      expect(address2.locationShort).to.be.equal('San Jose, CA')
      done()
    } catch (e) {
      done(e)
    }
  })
  it('bot address', async done => {
    try {
      const data = '{"city":"Los Angeles","country":"United States","state":"CA","county":"Los Angeles County","address":""}'
      const bot = Bot.create({id: '1', owner: '1'})
      bot.load({addressData: data})
      expect(bot.addressData!.city).to.be.equal('Los Angeles')
      expect(bot.addressData!.country).to.be.equal('United States')
      expect(bot.addressData!.state).to.be.equal('CA')
      expect(bot.addressData!.county).to.be.equal('Los Angeles County')
      done()
    } catch (e) {
      done(e)
    }
  })
})

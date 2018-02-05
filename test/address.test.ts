import {expect} from 'chai'
import {Address} from '../src/model/Address'

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
})

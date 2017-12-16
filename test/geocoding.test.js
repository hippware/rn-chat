import {expect} from 'chai';
import {when, spy} from 'mobx';
import geocoding from '../src/store/geocodingStore';

describe('geocoding', () => {
  step('details', async (done) => {
    const data = await geocoding.details('ChIJ6czj85Noe0cReoO-BaTEhLE');
    console.log('DATA:', data);
    done();
  });

  step('query2', async (done) => {
    try {
      const data = await geocoding.query('23 Marušičeva ulica, Koper 6000, Slovenia', {latitude: 45.547289, longitude: 13.733324});
      console.log('DATA:', JSON.stringify(data));
      expect(data.length).to.be.equal(1);
      expect(data[0].place_id).to.be.equal('ChIJE1inAZRoe0cR9O5X1ZDu6zk');
      expect(data[0].main_text).to.be.equal('23 Marušičeva ulica');
      expect(data[0].main_text_matched_substrings).to.be.deep.equal([{length: 2, offset: 0}, {length: 16, offset: 3}]);
      expect(data[0].secondary_text).to.be.equal('Koper 6000, Slovenia');
      expect(data[0].secondary_text_matched_substrings).to.be.deep.equal([{length: 5, offset: 0}, {length: 4, offset: 6}, {length: 8, offset: 12}]);
      expect(geocoding.formatText(data[0].main_text, data[0].main_text_matched_substrings, a => `<b>${a}</b>`).join('')).to.be.equal('<b>23</b> <b>Marušičeva ulica</b>');
      expect(geocoding.formatText(data[0].secondary_text, data[0].secondary_text_matched_substrings, a => `<b>${a}</b>`).join('')).to.be.equal('<b>Koper</b> <b>6000</b>, <b>Slovenia</b>');
      done();
    } catch (e) {
      done(e);
    }
  });

  step('query', async (done) => {
    const data = await geocoding.query('Quebec', {latitude: 33.6875431, longitude: -95.4431142});
    expect(data.length).to.be.equal(5);
    done();
  });

  step('reverse', async (done) => {
    const data = await geocoding.reverse({latitude: 33.6875431, longitude: -95.4431142});
    expect(data.address).to.be.equal('121 County Rd 42370, Paris, TX 75462, USA');
    done();
  });

  // step('live query', async (done) => {
  //   const address = new AddressHelper({latitude: 33.6875431, longitude: -95.4431142});
  //   address.text = 'Quebec';
  //   when(() => address.suggestions.length === 5, done);
  // });
  // step("live location", async function (done) {
  //     try {
  //         const bot = botFactory.create();
  //         bot.location = new Location({latitude: 33.6875431, longitude: -95.4431142});
  //
  //         when(() => bot.address === '121 County Rd 42370, Paris, TX 75462, USA', done);
  //     } catch (e) {
  //         done(e);
  //     }
  // });
});

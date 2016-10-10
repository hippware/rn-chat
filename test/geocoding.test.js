import {expect} from 'chai';
import {when, spy} from 'mobx';
import geocoding from '../src/store/geocoding';
import Address from '../src/model/Address';
import Bot from '../src/model/Bot';
import botFactory from '../src/factory/bot';
import Location from '../src/model/Location';

describe("geocoding", function() {
  step("query", async function(done){
    const data = await geocoding.query("Montreal Quebec", { latitude: 33.6875431, longitude: -95.4431142 });
    console.log("DATA:", data);
    expect(data.length).to.be.equal(5);
    done();
  });
  
  step("reverse", async function(done){
    const data = await geocoding.reverse({ latitude: 33.6875431, longitude: -95.4431142 });
    console.log("DATA:", data);
    expect(data.length).to.be.equal(5);
    done();
  });
  
  step("live query", async function(done){
    const address = new Address({ latitude: 33.6875431, longitude: -95.4431142 });
    address.text = 'Montreal Quebec';
    when(()=>address.suggestions.length === 5, done);
  });
  
  
  step("live location", async function(done){
    try {
      const bot = botFactory.create();
      bot.location = new Location({latitude: 33.6875431, longitude: -95.4431142});
  
      when(()=>bot.address === '420 County Road 43830, Paris, Texas 75462, United States', done);
    } catch (e){
      done(e);
    }
  });
  
  
  
});
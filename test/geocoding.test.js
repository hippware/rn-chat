import {expect} from 'chai';
import {when, spy} from 'mobx';
import geocoding from '../src/store/geocodingStore';
import AddressHelper from '../src/model/AddressHelper';
import Bot from '../src/model/Bot';
import botFactory from '../src/factory/botFactory';
import Location from '../src/model/Location';

describe("geocoding", function () {
    step("details", async function (done) {
        const data = await geocoding.details('ChIJ6czj85Noe0cReoO-BaTEhLE');
        console.log("DATA:", data);
        done();
    });

    step("query2", async function (done) {
        const data = await geocoding.query("Zlaticeva 5 Koper", {latitude: 45.547289, longitude: 13.733324});
        console.log("DATA:", data);
        expect(data.length).to.be.equal(1);
        expect(data[0].place_id).to.be.equal('ChIJ6czj85Noe0cReoO-BaTEhLE');
        done();
    });

    step("query", async function (done) {
        const data = await geocoding.query("Quebec", {latitude: 33.6875431, longitude: -95.4431142});
        console.log("DATA:", data);
        expect(data.length).to.be.equal(5);
        done();
    });

    step("reverse", async function (done) {
        const data = await geocoding.reverse({latitude: 33.6875431, longitude: -95.4431142});
        console.log("DATA:", data);
        expect(data[0].place_name).to.be.equal('121 County Rd 42370, Paris, TX 75462, USA');
        done();
    });

    step("live query", async function (done) {
        const address = new AddressHelper({latitude: 33.6875431, longitude: -95.4431142});
        address.text = 'Quebec';
        when(() => address.suggestions.length === 5, done);
    });
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
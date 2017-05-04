import {expect, assert} from 'chai';
import {when, spy} from 'mobx';
import {testDataNew} from './support/testuser';
import * as xmpp from '../src/store/xmpp/xmpp';
import {settings} from '../src/globals';
import push from '../src/store/xmpp/pushService';
import pushStore from '../src/store/pushStore';
import profile from '../src/store/profileStore';
import model from '../src/model/model';

describe("push", function () {
    step("enable", async function (done) {
        try {
            const data = testDataNew(11);
            const shortname = 'shortname15';
            const description = 'bot desc';
            const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
            const logged = await xmpp.connect(user, password, server);
            const res = await push.enable('123');
            expect(res.id).to.be.not.undefined;
            expect(res.enabled).to.be.not.undefined;
            // test pushStore
            pushStore.start();
            settings.token = '1234';
            model.connected = true;
            ///
            done();
        } catch (e) {
            done(e)
        }
    });

    step("disable", async function (done) {
        try {
            const res = await push.disable();
            expect(res.id).to.be.not.undefined;
            expect(res.disabled).to.be.not.undefined;
            await profile.remove();
            done();
        } catch (e) {
            done(e)
        }
    });


});
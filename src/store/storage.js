import {USE_IOS_XMPP} from '../globals';
import autobind from 'autobind-decorator';
import {deserialize, serialize} from 'serializr';
import model, {Model} from '../model/model';
import {autorunAsync, action, autorun} from 'mobx';
import EventWelcome from '../model/EventWelcome';
import EventContainer from '../model/EventContainer';

let Provider;
if (USE_IOS_XMPP) {
    console.log('real RealmStore');
    Provider = require('./storage/LocalStorageStore').default;
    //  Provider = require('./storage/RealmStore').default;
} else {
    console.log('mock AsyncStorage');
    Provider = require('./storage/TestStorage').default;
}

@autobind class Storage {
    provider = new Provider();

    constructor() {
        autorunAsync(() => {
            try {
                const data = serialize(model);
                this.provider.save(data);
            } catch (e) {
                console.log('STORE ERROR', e);
                model.clear();
            }
        });
    }

    @action async load() {
        let res = await this.provider.load();
        // res={};
        let d = {};
        try {
            d = deserialize(Model, res) || {};
        } catch (e) {
            console.warn('SERIALIZE ERROR:', e);
        }
        model.load(d);
        const list = model.events.list;
        if (!list.length) {
            const welcome = new EventWelcome();
            list.push(new EventContainer(welcome.asMap()));
        }

        if (!model.user || !model.password || !model.server) {
            console.log('STORAGE EMPTY', model.user, model.password, model.server);
            throw '';
        }
        return model;
    }

    save() {
        return model;
    }
}
export default new Storage();

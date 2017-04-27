import Realm from 'realm';
import Profile from '../../model/Profile';
import model, {Model} from '../../model/model';
import File from '../../model/File';
import FileSource from '../../model/FileSource';
import profileStore from '../profileStore';

import autobind from 'autobind-decorator';

@autobind
export default class RealmStore {
    realm;

    constructor() {
        this.realm = new Realm({
            schema: [Profile.schema, Model.schema, File.schema, FileSource.schema],
            schemaVersion: 6,
            migration(oldRealm, newRealm) {},
        });
    }

    load() {
        return new Promise((resolve, reject) => {
            console.log('REALM STORAGE.LOAD');
            // return {user:"94efed34-29b6-11e6-8d1e-0e3188b56121", password:"$T$Qck2RvPau+hVEJMEj3h9I2SKbzIvDbwMb27hpX/AT7E="};
            const loaded = this.realm.objects('Model');
            if (loaded.length) {
                console.log('LOADED:', loaded[0]);
                resolve(loaded[0]);
            } else {
                reject();
            }
        });
    }

    save(data) {
        this.realm.write(() => {
            this.realm.create('Model', data, true);
        });
        return data;
    }
}

import {createModelSchema, ref, list, child} from 'serializr';
import {action, when, observable, toJS as toJSON, computed, autorunAsync} from 'mobx';
import Location from './Location';
import assert from 'assert';
import File from './File';
import model from './model';
import file from '../store/fileStore';
import profile from '../store/profileStore';

export default class Profile {
    user: string;
    @observable firstName: string;
    @observable lastName: string;
    @observable handle: string;
    @observable tagline: string;
    @observable avatar: File = null;
    @observable email: string;
    @observable error: string;
    @observable phoneNumber: string;
    @observable location: Location;
    @observable loaded: boolean = false;
    @observable isFollower: boolean = false;
    @observable isFollowed: boolean = false;
    @observable isNew: boolean = false;
    @observable isBlocked: boolean = false;
    @observable hidePosts: boolean = false;
    @observable status: string;
    @observable botSize: number = undefined;
    @observable followersSize: number = undefined;
    @observable botsSize: number = undefined;

    @computed get isMutual(): boolean {
        return this.isFollower && this.isFollowed;
    }

    get isOwn() {
        return model.profile && model.user === this.user;
    }

    constructor(user, data) {
        // assert(user, "user must be defined");

        try {
            this.user = user;
            if (data) {
                this.load(data);
            } else if (user) {
                when('Profile.when', () => model.profile && model.connected, this.download);
            }
        } catch (e) {
            console.error('ERROR!', e);
        }
    }

    @action download() {
        profile
            .request(this.user, this.isOwn)
            .then(data => {
                this.load(data);
            })
            .catch(e => console.log('PROFILE REQUEST ERROR:', e));
    }

    @action load = (data = {}) => {
        for (let key of Object.keys(data)) {
            if (key === 'avatar') {
                if (data.avatar && typeof data.avatar === 'string') {
                    this.avatar = file.create(data.avatar + '-thumbnail');
                }
            } else {
                this[key] = data[key];
            }
        }
        this.loaded = true;
    };

    @computed get displayName(): string {
        if (this.firstName && this.lastName) {
            return this.firstName + ' ' + this.lastName;
        }
        if (this.firstName) {
            return this.firstName;
        } else if (this.lastName) {
            return this.lastName;
        } else if (this.handle) {
            return this.handle;
        } else {
            return ' '; // this.user;
        }
    }
}

Profile.schema = {
    name: 'Profile',
    primaryKey: 'user',
    properties: {
        firstName: {type: 'string', optional: true},
        lastName: {type: 'string', optional: true},
        email: {type: 'string', optional: true},
        handle: {type: 'string', optional: true},
        phoneNumber: {type: 'string', optional: true},
        isNew: {type: 'bool', optional: true},
        isBlocked: {type: 'bool', optional: true},
        isFollower: {type: 'bool', optional: true},
        isFollowed: {type: 'bool', optional: true},
        avatar: {type: 'File', optional: true},
        user: 'string',
    },
};

createModelSchema(Profile, {
    user: true,
    handle: true,
    tagline: true,
    loaded: true,
    firstName: true,
    lastName: true,
    email: true,
    phoneNumber: true,
    isNew: true,
    isBlocked: true,
    isFollower: true,
    isFollowed: true,
    hidePosts: true,
    botsSize: true,
    followersSize: true,
    followedSize: true,
    avatar: child(File),
});

Profile.serializeInfo.factory = context => profile.create(context.json.user, context.json);

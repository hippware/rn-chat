import Profile from './Profile';
import Location from './Location';
import {createModelSchema, ref, list, child} from 'serializr';
import geocoding from '../store/geocodingStore';
import {observable, computed, reaction, when, autorun} from 'mobx';
import assert from 'assert';
import botFactory from '../factory/botFactory';
import profileFactory from '../factory/profileFactory';
import fileFactory from '../factory/fileFactory';
import File from './File';
import Note from './Note';
import Tag from './Tag';
import autobind from 'autobind-decorator';
import moment from 'moment';
import model from './model';
import bot from '../store/xmpp/botService';
import Utils from '../store/xmpp/utils';

export const LOCATION = 'location';
export const IMAGE = 'image';
export const NOTE = 'note';

export const VISIBILITY_OWNER = 0;
export const VISIBILITY_PUBLIC = 100;

export const SHARE_FOLLOWERS = 'followers';
export const SHARE_FRIENDS = 'friends';
export const SHARE_SELECT = 'select';

@autobind
export default class Bot {
    fullId: string;
    @observable id: string;
    server: string;
    @observable loaded: boolean = false;
    @observable isFollowed = false;
    @observable isSubscribed = false;
    @observable title: string = '';
    @observable shortname: string = null;
    @observable image: File = null;
    @observable _images: [File] = [];
    @observable notes: [Note] = [];
    @observable tags: [Tag] = [];
    @observable imageSaving: boolean = false;
    @observable noteSaving: boolean = false;
    @observable tagSaving: boolean = false;
    removedItems = [];

    newAffiliates = [];
    removedAffiliates = [];
    originalAffiliates;

    @computed get images(): [File] {
        return this._images.filter(x => !!x.source)
    }

    owner: Profile;
    followMe: boolean = false;
    isCurrent: boolean = false;
    followMeMinutes: integer = 0;
    descriptionChanged = false;
    @observable description: string = '';

    setDescription(value) {
        this.descriptionChanged = true;
        this.description = value;
    }

    @observable location: Location;
    @observable radius: integer = 30 * 1000;//30.5;
    @observable address: string;
    @observable visibility: integer = VISIBILITY_OWNER;

    set isPublic(value) {
        this.visibility = value ? VISIBILITY_PUBLIC : VISIBILITY_OWNER;
    }

    @computed get isPublic() {
        return this.visibility === VISIBILITY_PUBLIC;
    }

    @observable visibilityShown = false;
    @observable image_items: integer = 0;

    @computed get imagesCount() {
        return this.image_items;
    }

    @observable followersSize: integer = 0;
    @observable affiliates: [Profile] = [];
    @observable subscribers: [Profile] = [];
    alerts: integer;
    type: string;
    @observable _updated = new Date().getTime();
    @observable isNew: bool = true;

    set updated(value: Date) {
        console.log("SET UPDATED", new Date(value));
        this._updated = value;
    }

    @computed get updated(): Date {
        return new Date(this._updated)
    };

    @computed get date(): string {
        return moment(this.updated).calendar()
    }

    @observable shareSelect: [Profile] = [];
    @observable shareMode;

    @computed get coverColor() {
        return this.id ? Utils.hashCode(this.id) : Math.floor(Math.random() * 1000);
    }

    constructor({id, fullId, server, type, loaded = false, ...data}) {
        console.log("CREATE BOT", fullId, id, data.owner, server, type);
        this.id = id;
        this.server = server;
        this.loaded = loaded;
        if (fullId) {
            this.fullId = fullId;
            this.id = fullId.split('/')[0];
            this.server = fullId.split('/')[1];
            this.isNew = false;
        } else if (id && server) {
            this.fullId = `${id}/${server}`;
            this.isNew = false;
        }
        if (!loaded && !type && this.server) {
            // bot is not loaded yet, lets load it
            when(() => model.connected && model.profile && !this.loaded, async () => {
                try {

                    console.log("DOWNLOAD BOT", this.id);
                    const d = await bot.load({id: this.id, server: this.server});
                    console.log("BOT LOADED:", this.id, JSON.stringify(d));
                    this.load(d);
                    this.loaded = true;
                } catch (e) {
                    console.log("BOT LOAD ERROR", e);
                }

            });
        } else {
            this.type = type;
            this.load(data);
            this.loaded = true;
        }
        autorun(() => {
            if (this.location && !this.address) {
                //console.log("RUN geocoding.reverse", this.location);
                geocoding.reverse(this.location).then(data => {
                    if (data && data.length) {
                        this.address = data[0].place_name;
                        //console.log("ADDRESS", this.address);
                    }
                });
            }
        });
    }

    load({id, jid, fullId, server, owner, location, image, images, ...data} = {}) {
        Object.assign(this, data);
        if (id) {
            this.id = id;
        }
        if (fullId) {
            this.fullId = fullId;
            this.id = fullId.split('/')[0];
            this.server = fullId.split('/')[1];
        }
        if (jid) {
            console.log("JJID:", jid);
            this.jid = jid;
            this.server = jid.split('/')[0];
            this.id = jid.split('/')[2];
            this.fullId = `${this.id}/${this.server}`;
        }
        if (server) {
            this.server = server;
        }
        if (owner) {
            this.owner = typeof owner === 'string' ? profileFactory.create(owner) : owner;
        }
        if (image) {
            this.image = typeof image === 'string' && image ? fileFactory.create(image) : image;
        }
        if (images) {
            images.forEach(image => this.addImage(image.id, image.item));
        }
        if (location) {
            this.location = new Location({...location});
        }
        console.log("BOT LOADED", this.id, data, owner, this.owner);

    }

    insertImage(file) {
        assert(file, "file should be not full");

        // insert into the beginning
        this._images.splice(0, 0, file);
        this.image_items += 1;
    }

    addImage(imageId, item) {
        assert(item, "image item (contentID) is not specified");
        if (this._images.find(image => image.item === item)) {
            console.log("Ignore image, it is already exist");
            return;
        }
        const file = fileFactory.create(imageId, {item, isNew: true});
        file.item = item;

        // insert into the beginning
        this._images.push(file);
    }

    clearImages() {
        this._images.splice(0);
    }

    addNote(itemId, text) {
        this.notes.push(new Note(itemId, text));
    }

    async removeImage(itemId) {
        console.log("Bot.removeImage", itemId, this.images.length);
        assert(itemId, "itemId is not defined");
        const index: File = this._images.findIndex(x => x.item === itemId);
        assert(index !== -1, `image with item: ${itemId} is not found`);
        this._images.splice(index, 1);
        if (this.imag)
            this.removedItems.push(itemId);
        this.image_items -= 1;
    }

    setAffiliates(profiles: [Profile]) {
        console.log("SET AFFILIATES", profiles.length);
        this.newAffiliates = [];
        this.removedAffiliates = [];
        if (!this.originalAffiliates) {
            this.originalAffiliates = [...this.affiliates];
        }

        // determine affiliates to remove
        const isAffiliate = {};
        const isNewAffiliate = {};
        profiles.forEach(profile => {
            isNewAffiliate[profile.user] = true;
        });

        this.originalAffiliates.forEach(profile => {
            isAffiliate[profile.user] = true;
            if (!isNewAffiliate[profile]) {
                this.removedAffiliates.push(profile)
            }
        });

        this.affiliates.splice(0);
        profiles.forEach(profile => {
            if (!isAffiliate[profile.user]) {
                this.newAffiliates.push(profile);
            }
            this.affiliates.push(profile);
        });
        console.log("SET AFFILIATES", this.newAffiliates.length, this.removedAffiliates.length);
    }


}

createModelSchema(Bot, {
    id: true,
    fullId: true,
    server: true,
    title: true,
    isFollowed: true,
    isSubscribed: true,
    _updated: true,
    owner: ref("user", (user, cb) => cb(null, Profile.serializeInfo.factory({json: {user}}))),
    followMe: true,
    description: true,
    location: child(Location),
    notes: list(child(Note)),
    tags: list(child(Tag)),
    radius: true,
    address: true,
    type: true,
    visibility: true,
    subscribers: list(ref("subscriber", (user, cb) => cb(null, Profile.serializeInfo.factory({json: {user}})))),
    affiliates: list(ref("affiliate", (user, cb) => cb(null, Profile.serializeInfo.factory({json: {user}})))),
    image: child(File),
    _images: list(child(File)),
    alerts: true,
    image_items: true,
});


Bot.serializeInfo.factory = (context) => botFactory.create(context.json);

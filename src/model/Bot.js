// @flow

import Profile from './Profile';
import Location from './Location';
import {createModelSchema, ref, list, child} from 'serializr';
import {observable, computed} from 'mobx';
import botFactory from '../factory/botFactory';
import profileFactory from '../factory/profileFactory';
import fileFactory from '../factory/fileFactory';
import File from './File';
import BotPost from './BotPost';
import Tag from './Tag';
import autobind from 'autobind-decorator';
import moment from 'moment';
import Utils from '../store/xmpp/utils';
import Address from './Address';
import * as log from '../utils/log';

export const LOCATION = 'location';
export const IMAGE = 'image';
export const NOTE = 'note';

export const VISIBILITY_OWNER = 0;
export const VISIBILITY_PUBLIC = 100;

export const SHARE_FOLLOWERS = 'followers';
export const SHARE_FRIENDS = 'friends';
export const SHARE_SELECT = 'select';

type BotData = {
  id: string,
  fullId: string,
  server: string,
  type: string,
};

@autobind
export default class Bot {
  fullId: string;
  @observable id: string;
  jid: string;
  server: string;
  @observable isFollowed: boolean = false;
  @observable isSubscribed: boolean = false;
  @observable loading: boolean = false;
  @observable title: string = '';
  @observable shortname: ?string = null;
  @observable image: File = null;
  @observable thumbnail: File = null;
  @observable posts: BotPost[] = [];
  @observable tags: Tag[] = [];
  @observable imageSaving: boolean = false;
  @observable noteSaving: boolean = false;
  @observable tagSaving: boolean = false;
  removedItems = [];

  newAffiliates = [];
  removedAffiliates = [];
  originalAffiliates: any[];

  owner: Profile;
  followMe: boolean = false;
  isCurrent: boolean = false;
  followMeMinutes: number = 0;
  descriptionChanged = false;
  @observable description: string = '';

  setDescription(value: string): void {
    this.descriptionChanged = true;
    this.description = value;
  }

  @observable location: Location;
  @observable radius: number = 30; // 30.5;
  @observable addressData: Address = new Address();
  @observable visibility: number = VISIBILITY_OWNER;

  set isPublic(value: boolean) {
    this.visibility = value ? VISIBILITY_PUBLIC : VISIBILITY_OWNER;
  }

  @computed
  get isPublic(): boolean {
    return this.visibility === VISIBILITY_PUBLIC;
  }

  @observable visibilityShown = false;

  @observable followersSize: number = 0;
  @observable totalItems: number = 0;
  @observable affiliates: Profile[] = [];
  @observable subscribers: Profile[] = [];
  alerts: number;
  type: string;
  @observable _updated = new Date().getTime();
  @observable isNew: boolean = true;
  handlers: Function[] = [];

  set updated(value: Date) {
    this._updated = value;
  }

  @computed
  get updated(): Date {
    return new Date(this._updated);
  }

  @computed
  get date(): string {
    return moment(this.updated).calendar();
  }

  @observable shareSelect: Profile[] = [];
  @observable shareMode: string;

  @computed
  get coverColor(): number {
    return this.id ? Utils.hashCode(this.id) : Math.floor(Math.random() * 1000);
  }

  constructor({id, fullId, server, type, ...data}: BotData) {
    this.id = id;
    this.server = server;
    if (fullId) {
      this.fullId = fullId;
      this.id = fullId.split('/')[0];
      this.server = fullId.split('/')[1];
      this.isNew = false;
    } else if (id && server) {
      this.fullId = `${id}/${server}`;
      this.isNew = false;
    }
    this.type = type;
    if (Object.keys(data).length) {
      this.load(data);
    }
  }
  load({id, jid, fullId, server, owner, location, thumbnail, image, images, address_data, ...data} = {}) {
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
      if (typeof image === 'string') {
        this.thumbnail = fileFactory.create(`${image}-thumbnail`);
        // temporary disable lazy load for cover image
        this.image = fileFactory.create(image, {}, false);
        // this.image = fileFactory.create(image, {}, true);
      } else {
        this.image = image;
      }
    }
    if (thumbnail) {
      this.thumbnail = thumbnail;
    }
    if (location) {
      this.location = new Location({...location});
    }
    // eslint-disable-next-line
    if (address_data) {
      try {
        this.addressData.load(JSON.parse(address_data));
      } catch (err) {
        log.log('Address data parse error', err, data);
      }
    } else if (data.address) {
      this.addressData.address = data.address;
    }
  }

  clearPosts() {
    this.posts.splice(0);
  }

  addPostToTop(post: BotPost) {
    if (this.posts.findIndex(p => post.id === p.id) === -1) {
      this.posts.unshift(post);
    }
  }

  addPost(post: BotPost) {
    if (this.posts.findIndex(p => post.id === p.id) === -1) {
      this.posts.push(post);
    }
  }

  removePost(postId: number) {
    const index = this.posts.findIndex(p => postId === p.id);
    if (index !== -1) {
      this.posts.splice(index, 1);
    }
  }

  setAffiliates(profiles: [Profile]) {
    this.newAffiliates = [];
    this.removedAffiliates = [];
    if (!this.originalAffiliates) {
      this.originalAffiliates = [...this.affiliates];
    }

    // determine affiliates to remove
    const isAffiliate = {};
    const isNewAffiliate = {};
    profiles.forEach((profile) => {
      isNewAffiliate[profile.user] = true;
    });

    this.originalAffiliates.forEach((profile) => {
      isAffiliate[profile.user] = true;
      if (!isNewAffiliate[profile]) {
        this.removedAffiliates.push(profile);
      }
    });

    this.affiliates.splice(0);
    profiles.forEach((profile) => {
      if (!isAffiliate[profile.user]) {
        this.newAffiliates.push(profile);
      }
      this.affiliates.push(profile);
    });
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
  owner: ref('user', (user, cb) => cb(null, Profile.serializeInfo.factory({json: {user}}))),
  followMe: true,
  description: true,
  location: child(Location),
  tags: list(child(Tag)),
  radius: true,
  type: true,
  visibility: true,
  subscribers: list(ref('subscriber', (user, cb) => cb(null, Profile.serializeInfo.factory({json: {user}})))),
  affiliates: list(ref('affiliate', (user, cb) => cb(null, Profile.serializeInfo.factory({json: {user}})))),
  image: child(File),
  thumbnail: child(File),
  totalItems: true,
  alerts: true,
  addressData: child(Address),
});

Bot.serializeInfo.factory = context => botFactory.create(context.json);

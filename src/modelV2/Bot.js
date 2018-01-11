// @flow

import {types, getEnv, applySnapshot, getParent, getRoot} from 'mobx-state-tree';
import File from './File';

export const LOCATION = 'location';
export const IMAGE = 'image';
export const NOTE = 'note';

export const VISIBILITY_OWNER = 0;
export const VISIBILITY_PUBLIC = 100;

export const SHARE_FOLLOWERS = 'followers';
export const SHARE_FRIENDS = 'friends';
export const SHARE_SELECT = 'select';

const Bot = types
  .model('Bot', {
    id: types.identifier(types.string),
    fullId: types.string,
    jid: types.string,
    server: types.string,
    isFollowed: false,
    isSubscribed: false,
    loading: false,
    title: '',
    shortname: '',
    image: types.maybe(File),
    thumbnail: types.maybe(File),
    // posts: BotPost[] = [];
    // tags: Tag[] = [];
    imageSaving: false,
    // noteSaving: boolean = false;
    // tagSaving: boolean = false;
    error: false, // = false;
    // removedItems = [];
    // newAffiliates = [];
    // removedAffiliates = [];
    // originalAffiliates: any[];
    // owner: Profile;
    // followMe: boolean = false;
    // isCurrent: boolean = false;
    // followMeMinutes: number = 0;
    // descriptionChanged = false;
    // description: string = '';
    // @observable location: Location;
    // @observable radius: number = 30; // 30.5;
    // @observable address: string = '';
    // @observable addressData: Address = new Address();
    // @observable visibility: number = VISIBILITY_PUBLIC;
    // @observable visibilityShown = false;
    // @observable followersSize: number = 0;
    // @observable totalItems: number = 0;
    // @observable affiliates: Profile[] = [];
    // @observable subscribers: Profile[] = [];
    // alerts: number;
    // type: string;
    // @observable _updated = new Date().getTime();
    // @observable isNew: boolean = true;
    // handlers: Function[] = [];
    // @observable shareSelect: Profile[] = [];
    // @observable shareMode: string;
    // savingPost: boolean = false; // HACK: use this to prevent reloading bot posts on a change notification in event store
  })
  .actions((self) => {
    const {createProfile} = getRoot(self);

    async function save() {
      const {isNew} = self;
      // this.bot.isSubscribed = true;
      // const params = {...this.bot, isNew};
      // if (this.bot.image) {
      //   params.image = this.bot.image.id;
      // }
      // // NOTE: radius <.5 gets rounded down to 0 which causes an error on the server
      // params.radius = this.bot.radius >= 1 ? this.bot.radius : 1;
      // const data = await botService.create(params);
      // this.bot.isNew && analyticsStore.track('botcreate_complete', toJS(this.bot));
      // model.botsCreatedCount += 1;
      // botFactory.remove(this.bot);
      // this.bot.id = data.id;
      // this.bot.server = data.server;
      // this.bot.isNew = false;
      // this.bot.owner = model.profile;
      // botFactory.add(this.bot);
      // if (isNew) {
      //   // insert new bot at the top of lists
      //   model.subscribedBots.unshift(this.bot);
      //   model.ownBots.unshift(this.bot);
      //   model.geoBots.add(this.bot);
      // }
    }

    return {save};
  });

export default Bot;

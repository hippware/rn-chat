// @flow

import {createModelSchema, ref} from 'serializr';
import {observable, computed} from 'mobx';
import Bot from './Bot';
import Profile from './Profile';
import autobind from 'autobind-decorator';
import EventBot from './EventBot';

@autobind
export default class EventBotGeofence extends EventBot {
  @computed
  get isHidden() {
    return !this.bot || !this.bot.loaded || (this.profile.isOwn && (!this.bot.owner || this.bot.owner.isOwn)) || (this.target ? this._isHidden || this.target.hidePosts : null);
  }

  @observable isEnter: boolean = true;
  @observable profile: Profile;

  @computed
  get target(): Profile {
    return this.profile;
  }

  constructor(id, bot, time, profile, isEnter = true) {
    super(id, bot, time);
    if (profile) {
      this.profile = profile;
    }
    this.isEnter = isEnter;
  }

  presenterClass() {
    return require('../components/EventBotGeofenceCard').default;
  }

  asMap() {
    return {botGeofence: this};
  }
}

createModelSchema(EventBotGeofence, {
  _id: true,
  bot: ref('fullId', (fullId, cb) => cb(null, Bot.serializeInfo.factory({json: {fullId}}))),
  time: true,
  loaded: true,
  isEnter: true,
  profile: ref('user', (user, cb) => cb(null, Profile.serializeInfo.factory({json: {user}}))),
  _isHidden: true,
});

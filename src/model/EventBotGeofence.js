import {createModelSchema, ref, list, child} from 'serializr';
import {observable, computed} from 'mobx';
import Bot from './Bot';
import Event from './Event';
import File from './File';
import Profile from './Profile';
import moment from 'moment';
import autobind from 'autobind-decorator';
import factory from '../factory/bot';
import assert from 'assert';
import EventBot from './EventBot';

@autobind
export default class EventBotGeofence extends EventBot {
  _id;
  @computed get isHidden(){ return !this.bot || !this.bot.loaded || (this.profile.isOwn && (!this.bot.owner || this.bot.owner.isOwn)) ||
    (this.target ? this._isHidden || this.target.hidePosts : null)};
  get id(){ return this._id};
  @observable isEnter: boolean = true;
  @observable profile: Profile;
  @computed get target():Profile { return this.profile }
  
  constructor(id, botId, server, time, profile, isEnter = true){
    super(botId, server, time);
    if (id) {
      this._id = id;
    }
    if (profile) {
      this.profile = profile;
    }
    this.isEnter = isEnter;
  }
  
  presenterClass(){
    return require('../components/EventBotGeofenceCard').default;
  }
  
  asMap(){
    return {botGeofence: this};
  }
  
}

createModelSchema(EventBotGeofence, {
  _id: true,
  bot: ref("fullId", (fullId, cb) =>cb(null, Bot.serializeInfo.factory({json:{fullId}}))),
  time:true,
  loaded: true,
  isEnter: true,
  profile: ref("user", (user, cb) =>cb(null, Profile.serializeInfo.factory({json:{user}}))),
  _isHidden: true,
});

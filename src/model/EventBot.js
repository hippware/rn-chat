// @flow

import {createModelSchema, ref} from 'serializr';
import {observable, computed} from 'mobx';
import Bot from './Bot';
import Event from './Event';
import Profile from './Profile';
import moment from 'moment';
import autobind from 'autobind-decorator';
import factory from '../factory/botFactory';
import model from '../model/model';

// http://momentjs.com/docs/#/customization/relative-time/
moment.updateLocale('en', {
  relativeTime: {
    s: '%ds',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    y: '1y',
    yy: '%dy',
  },
});

// http://momentjs.com/docs/#/customization/relative-time-threshold/
moment.relativeTimeThreshold('d', 365);
moment.relativeTimeThreshold('M', 0);

@autobind
export default class EventBot extends Event {
  _id;
  @observable time = new Date().getTime();
  @observable bot: Bot;

  // don't show card if it is hidden or profile is not followed or no message from that profile
  @computed
  get isHidden() {
    return !this.bot.loaded || (this.target ? this._isHidden || this.target.hidePosts : null);
  }

  get id() {
    return this._id;
  }

  @computed
  get target(): Profile {
    return this.bot && this.bot.owner;
  }

  @computed
  get date(): Date {
    return new Date(this.time);
  }

  @computed
  get dateAsString(): string {
    return this.bot ? moment(this.date).calendar() : '';
  }

  @computed
  get relativeDateAsString(): string {
    return this.bot ? moment(this.date).fromNow(true) : '';
  }

  constructor(id, botId, server, time) {
    super();
    this._id = id;
    if (botId && server) {
      this.bot = factory.create({id: botId, server});
      model.eventBots.add(this.bot);
    }
    if (time) {
      this.time = time;
    }
  }

  asMap() {
    return {bot: this};
  }

  isEqual(event) {
    return event.id === this.id;
    // if (!event.bot){
    //   return false;
    // }
    // if (event.id === this.id) {
    //   return true;
    // }
    // if (!this.target || !event.target)
    //   return this.bot.id === event.bot.id;
    // return this.bot.id === event.bot.id && this.target.user === event.target.user;
  }

  presenterClass() {
    return require('../components/EventBotCard').default;
  }
}

createModelSchema(EventBot, {
  //  chat: child(Chat),
  _id: true,
  bot: ref('fullId', (fullId, cb) => cb(null, Bot.serializeInfo.factory({json: {fullId}}))),
  loaded: true,
  time: true,
  _isHidden: true,
});

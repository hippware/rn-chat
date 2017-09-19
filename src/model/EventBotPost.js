// @flow

import {createModelSchema, ref, child, serializable, object, reference} from 'serializr';
import {observable} from 'mobx';
import Bot from './Bot';
import File from './File';
import autobind from 'autobind-decorator';
import EventBot from './EventBot';
import Profile from './Profile';

@autobind
export default class EventBotPost extends EventBot {
  // TODO: test serialization with this
  @observable image: ?File;
  @observable author: Profile;
  text: string;

  constructor(id: string, bot: Bot, author: Profile, time, image: ?File, text: string) {
    super(id, bot, time);
    this.image = image;
    this.author = author;
    this.text = text;
  }

  presenterClass() {
    return require('../components/EventBotPostCard').default;
  }

  asMap() {
    return {botPost: this};
  }
}

createModelSchema(EventBotPost, {
  _id: true,
  bot: ref('fullId', (fullId, cb) => cb(null, Bot.serializeInfo.factory({json: {fullId}}))),
  time: true,
  loaded: true,
  image: child(File),
  author: child(Profile),
  _isHidden: true,
});

// @flow

import {createModelSchema, ref, child} from 'serializr';
import {observable} from 'mobx';
import Bot from './Bot';
import File from './File';
import autobind from 'autobind-decorator';
import EventBot from './EventBot';

@autobind
export default class EventBotImage extends EventBot {
  @observable image: File;

  constructor(id, bot, time, image) {
    super(id, bot, time);
    this.image = image;
  }

  presenterClass() {
    return require('../components/EventBotImageCard').default;
  }

  asMap() {
    return {botImage: this};
  }
}

createModelSchema(EventBotImage, {
  _id: true,
  bot: ref('fullId', (fullId, cb) => cb(null, Bot.serializeInfo.factory({json: {fullId}}))),
  time: true,
  loaded: true,
  image: child(File),
  _isHidden: true,
});

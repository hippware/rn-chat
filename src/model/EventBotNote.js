// @flow

import {createModelSchema, ref} from 'serializr';
import {observable} from 'mobx';
import Bot from './Bot';
import autobind from 'autobind-decorator';
import EventBot from './EventBot';

@autobind
export default class EventBotNote extends EventBot {
  @observable note: string;

  constructor(id, bot, time, note) {
    super(id, bot, time);
    this.note = note;
    this._id = id;
  }

  presenterClass() {
    return require('../components/event-cards/EventBotNoteCard').default;
  }

  asMap() {
    return {botNote: this};
  }
}

createModelSchema(EventBotNote, {
  _id: true,
  bot: ref('fullId', (fullId, cb) => cb(null, Bot.serializeInfo.factory({json: {fullId}}))),
  time: true,
  loaded: true,
  updated: true,
  note: true,
  _isHidden: true,
});

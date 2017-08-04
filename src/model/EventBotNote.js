// @flow

import {createModelSchema, ref, child} from 'serializr';
import {observable} from 'mobx';
import Bot from './Bot';
import Note from './Note';
import autobind from 'autobind-decorator';
import EventBot from './EventBot';

@autobind
export default class EventBotNote extends EventBot {
  @observable note: Note;

  constructor(id, botId, server, time, note) {
    super(id, botId, server, time);
    this.note = note;
    this._id = id;
  }

  presenterClass() {
    return require('../components/EventBotNoteCard').default;
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
  note: child(Note),
  _isHidden: true,
});

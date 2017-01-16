import {createModelSchema, ref, list, child} from 'serializr';
import {observable, computed} from 'mobx';
import Bot from './Bot';
import Event from './Event';
import Note from './Note';
import Profile from './Profile';
import moment from 'moment';
import autobind from 'autobind-decorator';
import factory from '../factory/bot';
import assert from 'assert';
import EventBot from './EventBot';

@autobind
export default class EventBotNote extends EventBot {
  get id(){ return this.bot.id+"_boteventnote"};
  @observable note: Note;
  
  constructor(botId, server, time, note){
    super(botId, server, time);
    this.note = note;
  }
  
  presenterClass(){
    return require('../components/EventBotNoteCard').default;
  }
  
  asMap(){
    return {botNote: this};
  }
  
}

createModelSchema(EventBotNote, {
//  chat: child(Chat),
  bot: ref("fullId", (fullId, cb) =>cb(null, Bot.serializeInfo.factory({json:{fullId}}))),
  time:true,
  loaded: true,
  updated: true,
  note: child(Note),
  _isHidden: true,
});

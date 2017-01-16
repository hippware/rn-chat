import {createModelSchema, ref, list, child} from 'serializr';
import {observable, computed} from 'mobx';
import Bot from './Bot';
import Event from './Event';
import Message from './Message';
import Profile from './Profile';
import moment from 'moment';
import autobind from 'autobind-decorator';
import factory from '../factory/bot';
import assert from 'assert';
import EventBot from './EventBot';

@autobind
export default class EventBotShare extends EventBot {
  @computed get target():Profile { return this.message.from }
  get id(){ return this._id+"_boteventshare"};
  @observable message: Message;
  
  constructor(id, botId, server, time, message){
    super(botId, server, time);
    this._id = id;
    this.message = message;
  }
  
  presenterClass(){
    return require('../components/EventBotShareCard').default;
  }
  
  asMap(){
    return {botShare: this};
  }
  
}

createModelSchema(EventBotShare, {
//  chat: child(Chat),
  _id: true,
  time:true,
  bot: ref("fullId", (fullId, cb) =>cb(null, Bot.serializeInfo.factory({json:{fullId}}))),
  loaded: true,
  message: child(Message),
  _isHidden: true,
});

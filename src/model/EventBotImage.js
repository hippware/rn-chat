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
export default class EventBotImage extends EventBot {
  _id;
  get id(){ return this._id};
  @observable image: File;
  
  constructor(id, botId, server, time, image){
    super(botId, server, time);
    this._id = id;
    this.image = image;
  }
  
  presenterClass(){
    return require('../components/EventBotImageCard').default;
  }
  
  asMap(){
    return {botImage: this};
  }
  
}

createModelSchema(EventBotImage, {
//  chat: child(Chat),
  bot: ref("fullId", (fullId, cb) =>cb(null, Bot.serializeInfo.factory({json:{fullId}}))),
  time:true,
  loaded: true,
  image: child(File),
  _isHidden: true,
});

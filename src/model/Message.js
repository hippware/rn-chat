import {createModelSchema, ref, list, child} from 'serializr';
import autobind from 'autobind-decorator';
import Profile from './Profile';
import File from './File';
import {observable, computed, autorunAsync} from 'mobx';
import assert from 'assert';
import moment from 'moment';

@autobind
export default class Message {
  id: string;
  isArchived: boolean = false;
  @observable from: Profile;
  @observable to: string;
  @observable media: File;
  @observable unread: boolean = true;
  @observable time: Date;
  @observable body: string;
  @observable composing: boolean;
  @observable paused: boolean;
  @observable isHidden: boolean = false;
  @computed get date(){ return moment(this.time).calendar()}
  
  constructor({id, from, to, media, unread, time, body = '', composing, paused, isArchived} = {}){
    console.log("MESSAGE CONSTRUCTOR:", id);
    this.id = id;
    this.from = from;
    this.to = to;
    this.media = media;
    this.unread = unread === undefined || unread;
    this.time = time || new Date();
    this.body = body;
    this.composing = composing;
    this.paused = paused;
    this.isArchived = isArchived;
  }
  
}

createModelSchema(Message, {
  id: true,
  from: child(Profile),
  to: true,
  media: child(File),
  unread: true,
  time: true,
  body: true,
  composing: true,
  paused: true,
  isHidden: true,
});


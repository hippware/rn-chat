import {createModelSchema, ref, list, child} from 'serializr';
import autobind from 'autobind-decorator';
import Profile from './Profile';
import File from './File';
import {observable, computed, autorunAsync} from 'mobx';
import assert from 'assert';
import moment from 'moment';
import profileFactory from '../factory/profile';
import fileFactory from '../factory/file';
import messageFactory from '../factory/message';

@autobind
export default class Message {
  id: string;
  archiveId: string;
  isArchived: boolean = false;
  @observable from: Profile;
  @observable to: string;
  @observable media: File;
  @observable unread: boolean = true;
  _time = 0;
  set time(value){
    //console.log("SETTING DATE", value);
    this._time = new Date(value).getTime();
  }
  
  get time() {return new Date(this._time)};
  
  @observable body: string;
  @observable composing: boolean;
  @observable paused: boolean;
  @observable isHidden: boolean = false;
  @computed get date(){ return moment(this.time).calendar()}
  
  constructor({id, ...data}){
    this.id = id;
    this.load(data);
  }
  
  load({from, to, archiveId, media, unread, time, body = '', composing, paused, isArchived, image} = {}){
    this.archiveId = archiveId;
    this.from = typeof from === 'string' ? profileFactory.create(from) : from;
    this.to = to;
    this.media = media;
    if (image && image.url){
      this.media = fileFactory.create(image.url);
    }
    this.unread = unread === undefined || unread;
    //console.log("MSGTIME:", time);
    this.time = time || new Date().getTime();
    this.body = body;
    this.composing = composing;
    this.paused = paused;
    this.isArchived = isArchived;
  }
  
}
createModelSchema(Message, {
  id: true,
  archiveId: true,
  from: ref("user", (user, cb) =>cb(null, Profile.serializeInfo.factory({json:{user}}))),
  to: true,
  media: child(File),
  unread: true,
  _time: true,
  body: true,
  composing: true,
  paused: true,
  isHidden: true,
});

Message.serializeInfo.factory = (context) => messageFactory.create(context.json);

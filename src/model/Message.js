import autobind from 'autobind-decorator';
import Profile from './Profile';
import File from './File';
import {observable, computed, autorunAsync} from 'mobx';
import assert from 'assert';
import moment from 'moment'
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
  @computed get date(){ return moment(this.time).calendar()}
  
  constructor({id, from, to, media, unread, time, body = '', composing, paused, isArchived}){
    assert(id, "message id is not defined");
    assert(from, "message from is not defined");
    //assert(body || media, "message body or media is not defined");
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

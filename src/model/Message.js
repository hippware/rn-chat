import autobind from 'autobind-decorator';
import Profile from './Profile';
import File from './File';
import {observable, computed, autorunAsync} from 'mobx';
import assert from 'assert';

@autobind
export default class Message {
  id: string;
  @observable from: Profile;
  @observable to: Profile;
  @observable media: File;
  @observable unread: boolean = true;
  @observable time: Date;
  @observable body: string;
  @observable composing: boolean;
  @observable paused: boolean;
  
  constructor(data = {}){
    assert(data.id, "message id is not defined");
    assert(data.from, "message from is not defined");
    this.id = data.id;
    this.from = data.from;
    this.to = data.to;
    this.media = data.media;
    this.unread = data.unread === undefined || data.unread;
    this.time = data.time || Date();
    this.body = data.body;
    this.composing = data.composing;
    this.paused = data.paused;
  }

}

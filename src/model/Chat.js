import autobind from 'autobind-decorator';
import {action, observable, toJS as toJSON, computed, autorunAsync} from 'mobx';
import Profile from './Profile';
import Message from './Message';
import File from './File';
import assert from 'assert';
import moment from 'moment'

@autobind
export default class Chat {
  id: string;
  time: Date;
  @observable isPrivate: boolean;
  @observable participants : [Profile] = [];
  @observable messages: [Message] = [];
  @computed get unread(){ return this.messages.reduce((prev:number, current: Message)=> prev + current.unread ? 1 : 0, 0) }
  @computed get last(): Message { return this.messages.length ? this.messages[this.messages.length-1] : null };
  @computed get body(): string { return this.last ? this.last.body : ''}
  @computed get date(): string { return this.last ? this.last.date : moment(new Date()).calendar()}
  @computed get from(): Profile { return this.last && this.last.from }
  @computed get media(): File { return this.last && this.last.media }

  constructor(participants: [Profile], id:string, time: Date, isPrivate = true){
    assert(participants, "participants are not defined");
    this.participants = participants;
    this.id = id;
    this.time = time;
    this.isPrivate = isPrivate;
  }
  
  @action addParticipant = (profile: Profile) => {
    if (!this.participants.find(el=>el.user === profile.user)){
      this.participants.push(profile);
    }
  };
  
  @action addMessage = (message: Message) => {
    this.messages.push(message);
    this.messages.sort((a: Message, b: Message) => b.time - a.time);
  };

}
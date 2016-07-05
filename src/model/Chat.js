import autobind from 'autobind-decorator';
import {action, observable, toJS as toJSON, computed, autorunAsync} from 'mobx';
import Profile from './Profile';
import Message from './Message';
import File from './File';
import assert from 'assert';
import moment from 'moment'
import {createModelSchema, ref, child, list} from 'serializr';

const MAX_COUNT = 10;

@autobind
export default class Chat {
  id: string;
  time: Date;
  @observable count: number = MAX_COUNT;
  @observable isPrivate: boolean;
  @observable participants : [Profile] = [];
  @observable _messages: [Message] = [];
  @computed get messages() { return this._messages.sort((a: Message, b: Message) => a.time - b.time)
    .slice(Math.max(0, this._messages.length - this.count))}
  @computed get unread(): number { return this._messages.reduce((prev:number, current: Message)=> prev + current.unread, 0) }
  @computed get last(): Message { return this.messages.length ? this.messages[this.messages.length-1] : null };
  @computed get body(): string { return this.last ? this.last.body : ''}
  @computed get date(): string { return this.last ? this.last.date : moment(new Date()).calendar()}
  @computed get from(): Profile { return this.last && this.last.from }
  @computed get media(): File { return this.last && this.last.media }

  constructor(participants: [Profile], id:string, time: Date, isPrivate = true){
    if (participants && id){
      this.participants = participants;
      this.id = id;
      this.time = time;
      this.isPrivate = isPrivate;
    }
  }
  
  @action addParticipant = (profile: Profile) => {
    if (!this.participants.find(el=>el.user === profile.user)){
      this.participants.push(profile);
    }
  };
  
  @action readAll = () => {
    console.log("Mark all messages as read");
    this._messages.forEach(msg => msg.unread = false);
  };
  
  @action addMessage = (message: Message) => {
    this._messages.push(message);
  };
  
  @action async loadEarlierMessages(){
    setTimeout(()=>{
      return this.count = Math.min(this._messages.length, this.count + MAX_COUNT);
    }, 500);
  }

}

createModelSchema(Chat, {
  id: true,
  _messages: list(child(Message)),
  participants: list(child(Profile)),
});
import {createModelSchema, ref, list, child} from 'serializr';
import autobind from 'autobind-decorator';
import {action, observable, toJS as toJSON, computed, autorunAsync} from 'mobx';
import Profile from './Profile';
import Message from './Message';
import File from './File';
import assert from 'assert';
import moment from 'moment'

const MAX_COUNT = 10;

@autobind
export default class Chat {
  id: string;
  @observable time: Date = Date.now();
  @observable count: number = MAX_COUNT;
  @observable isPrivate: boolean;
  @observable _participants : [Profile] = [];
  @observable _messages: [Message] = [];
  @computed get participants(): [Profile] { return this._participants};
  @computed get followedParticipants(): [Profile] { return this.participants.filter(p=>p.isFollowed) };
  @computed get messages() { return this._messages.sort((a: Message, b: Message) => a.time - b.time)
    .slice(Math.max(0, this._messages.length - this.count))};
    
  // message list of other recepients used by EventList, some individual posts could be hidden
  @computed get otherMessages() { return this.messages.filter((msg: Message) => !msg.from.isOwn && !msg.isHidden) };
  @computed get unread(): number { return this._messages.reduce((prev:number, current: Message)=> prev + current.unread, 0) };
  @computed get last(): Message { return this.messages.length ? this.messages[this.messages.length-1] : {} };
  @computed get lastOther(): Message { return this.otherMessages.length ? this.otherMessages[this.otherMessages.length-1] : {} };

  constructor(id:string, isPrivate = true) {
    //assert(id, "Chat id is not defined");
    this.id = id;
    this.isPrivate = isPrivate;
  }
  
  observe = (listener) => {
    return this._messages.observe(listener);
  };
  
  @action addParticipant = (profile: Profile) => {
    if (!this._participants.find(el=>el.user === profile.user)){
      this._participants.push(profile);
    }
  };
  
  @action readAll = () => {
    console.log("Mark all messages as read");
    this._messages.forEach(msg => msg.unread = false);
  };
  
  @action addMessage = (message: Message) => {
    if (!this._messages.find(el=>el.id === message.id)){
      this._messages.push(message);
    }
  };
  
  @action async loadEarlierMessages(){
    setTimeout(()=>{
      return this.count = Math.min(this._messages.length, this.count + MAX_COUNT);
    }, 500);
  }

}

createModelSchema(Chat, {
  id: true,
  time: true,
  _messages: list(child(Message)),
  _participants: list(child(Profile)),
});


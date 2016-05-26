import autobind from 'autobind-decorator';
import {action, observable, toJS as toJSON, computed, autorunAsync} from 'mobx';
import Profile from './Profile';
import Message from './Message';
import assert from 'assert';

@autobind
export default class Chat {
  id: string;
  @observable profile;
  @observable messages: [Message] = [];
  @observable composing: boolean = true;
  @computed get unread(){ this.messages.reduce((prev:number, current: Message)=> prev + current.unread ? 1 : 0, 0) }
  @computed get last(){ this.messages[this.messages.length-1] };

  constructor(profile: Profile, message: Message){
    assert(profile, "profile is not defined");
    assert(message, "message is not defined");
    this.profile = profile;
    this.messages = [message];
    this.id = profile.user;
  }
  
  @action addMessage(message: Message){
    this.messages.push(message);
    this.messages.sort((a: Message, b: Message) => b.time - a.time);
  }

}
import autobind from 'autobind-decorator';
import model from '../model/model';
import Profile from '../model/Profile';
import Chat from '../model/Chat';
import EventFriend from '../model/EventFriend';
import EventChat from '../model/EventChat';
import message from './message';
import friend from './friend';
import {reaction, action} from 'mobx';
import EventContainer from '../model/EventContainer';


@autobind
export class EventStore {
  disposers = [];
  add(disposer){
    this.disposers.push(disposer);
  }
  
  start() {
    this.add(model.friends.observe(obj =>{
      obj.added && obj.added.forEach(this.onFriend)
    }));
    
    this.add(model.chats.observe(obj =>{
      console.log("OBJ", obj);
      obj.added && obj.added.forEach(this.onChat)
    }));
  }
  
  @action onFriend = (profile: Profile) => {
    console.log("ADD EVENT FRIEND", profile.user);
    if (profile.isFollower){
      model.events.add({chat: new EventChat(message.createChat(profile))});
    } else {
      console.log("IGNORE BECAUSE PROFILE IS NOT FOLLOWER");
    }
  };
  
  @action hidePost = (eventContainer: EventContainer) => {
    const event = eventContainer.event;
    if (event.chat.otherMessages.length){
      event.chat.lastOther.isHidden = true;
    } else {
      event.hide();
    }
  };
  
  @action onChat = (chat: Chat) => {
    console.log("ADD CHAT: ", chat);
    model.events.add({chat: new EventChat(chat)});
  };
  
  finish() {
    this.disposers.forEach(disposer=>disposer());
  }
}

export default new EventStore();

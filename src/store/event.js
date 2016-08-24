import autobind from 'autobind-decorator';
import model from '../model/model';
import Profile from '../model/Profile';
import Chat from '../model/Chat';
import EventFriend from '../model/EventFriend';
import EventChat from '../model/EventChat';
import EventMessage from '../model/EventMessage';
import message from './message';
import friend from './friend';
import {reaction, action} from 'mobx';
import EventContainer from '../model/EventContainer';
import Message from '../model/Message';

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
  
    model.chats.list.forEach(chat => {
        chat.messages.forEach(this.onMessage)
        chat._messages.observe(msg => {
          msg.added && msg.added.forEach(this.onMessage);
        });
      }
    );
    this.add(model.chats.observe(obj =>{
      console.log("OBJ", obj);
      obj.added && obj.added.forEach(chat => {
        chat.messages.forEach(this.onMessage);
        chat._messages.observe(msg => {
          msg.added && msg.added.forEach(this.onMessage);
        });
      });
    }));
  }
  
  @action onFriend = (profile: Profile) => {
    console.log("ADD EVENT FRIEND", profile.user);
    if (profile.isFollower){
      model.events.addMessage(new EventMessage(profile));
      console.log(model.events.list[0].event);
    } else {
      console.log("IGNORE BECAUSE PROFILE IS NOT FOLLOWER");
    }
  };
  
  @action hidePost = (eventContainer: EventContainer) => {
    eventContainer.event.hide();
  };
  
  @action onMessage = (message: Message) => {
    if (!message.from.isOwn){
      console.log("ADD EVENT MESSAGE: ", message);
      model.events.addMessage(new EventMessage(message.from, message));
    }
  };
  
  finish() {
    this.disposers.forEach(disposer=>disposer());
  }
}

export default new EventStore();

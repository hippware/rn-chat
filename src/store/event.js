import autobind from 'autobind-decorator';
import model from '../model/model';
import Profile from '../model/Profile';
import Chat from '../model/Chat';
import EventFriend from '../model/EventFriend';
import EventChat from '../model/EventChat';
import EventMessage from '../model/EventMessage';
import message from './message';
import friend from './friend';
import {reaction, when, action} from 'mobx';
import EventContainer from '../model/EventContainer';
import Message from '../model/Message';
import * as xmpp from './xmpp/xmpp';
import home from './xmpp/home';

@autobind
export class EventStore {
  notifications = xmpp.message.filter(msg=>msg.notification && msg.notification.item);
  // disposers = [];
  //
  // constructor(){
  //   this.add(model.friends.observe(obj =>{
  //     obj.added && obj.added.forEach(this.onFriend)
  //   }));
  //
  //   when(()=>model.chats._list.length, ()=>{
  //     model.chats._list.forEach(chat => {
  //         chat.messages.forEach(this.onMessage)
  //         chat._messages.observe(msg => {
  //           msg.added && msg.added.forEach(this.onMessage);
  //         });
  //       }
  //     );
  //     this.add(model.chats.observe(obj =>{
  //       console.log("OBJ", obj);
  //       obj.added && obj.added.forEach(chat => {
  //         chat.messages.forEach(this.onMessage);
  //         chat._messages.observe(msg => {
  //           msg.added && msg.added.forEach(this.onMessage);
  //         });
  //       });
  //     }));
  //   });
  //
  // }
  // add(disposer){
  //   this.disposers.push(disposer);
  // }
  //
  // @action onFriend = (profile: Profile) => {
  //   console.log("ADD EVENT FRIEND", profile.user);
  //   if (profile.isFollower){
  //     model.events.addMessage(new EventMessage(profile));
  //     console.log(model.events.list[0].event);
  //   } else {
  //     console.log("IGNORE BECAUSE PROFILE IS NOT FOLLOWER");
  //   }
  // };
  //
  // @action hidePost = (eventContainer: EventContainer) => {
  //   eventContainer.event.hide();
  // };
  //
  // @action onMessage = (message: Message) => {
  //   if (!message.from.isOwn){
  //     //console.log("ADD EVENT MESSAGE: ", message);
  //     model.events.addMessage(new EventMessage(message.from, message));
  //   }
  // };
  //
  start() {
    this.notifications.onValue(this.onNotification);
  }
  
  processItem(item){
    console.log("ITEM:", item);
    if (item.message){
      const msg = message.processMessage({from:item.from, to:xmpp.provider.username, ...item.message});
      console.log("ADD EVENT MESSAGE: ", msg);
      model.events.addMessage(new EventMessage(item.id, item.from, msg));
      console.log("EVENTS LENGTH:", model.events.list.length);
    } else {
      console.log("UNSUPPORTED ITEM!", JSON.stringify(item));
    }
  }
  
  hidePosts(eventContainer: EventContainer){
    
  }
  
  onNotification(notification){
    console.log("event.onNotification")
    const item = notification.notification.item;
    this.processItem(item);
  }
  
  finish() {
    this.notifications.offValue(this.onMessage);
  }
  
  
  async request(){
    // request archive if there is no version
    if (!model.events.version){
      const data = await home.items();
      console.log("DATA:", data.items.length, data.version);
      for (const item of data.items){
        this.processItem(item);
      }
      model.events.version = data.version;
      console.log("SET VERSION:", data.version);
    } else {
      console.log("EXISTING VERSION:", model.events.version);
    }
    home.request(model.events.version);
  }
}

export default new EventStore();

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
  
  onNotification(notification){
    const item = notification.notification.item;
    if (item.message){
      const msg = message.processMessage({id: item.id, from:item.from, to:xmpp.provider.username, ...item.message});
      console.log("ADD EVENT MESSAGE: ", msg);
      model.events.addMessage(new EventMessage(item.from, message));
    } else {
      console.log("UNSUPPORTED ITEM!", JSON.stringify(item));
    }
  }
  
  finish() {
    this.notifications.offValue(this.onMessage);
  }
  
  
  requestItems(){
    
  }
}

export default new EventStore();

import autobind from 'autobind-decorator';
import model from '../model/model';
import Profile from '../model/Profile';
import Chat from '../model/Chat';
import EventFriend from '../model/EventFriend';
import EventChat from '../model/EventChat';
import EventBot from '../model/EventBot';
import EventBotGeofence from '../model/EventBotGeofence';
import EventBotImage from '../model/EventBotImage';
import EventBotNote from '../model/EventBotNote';
import EventBotShare from '../model/EventBotShare';
import Note from '../model/Note';
import EventMessage from '../model/EventMessage';
import message from './message';
import friend from './friend';
import {reaction, when, action} from 'mobx';
import EventContainer from '../model/EventContainer';
import Message from '../model/Message';
import * as xmpp from './xmpp/xmpp';
import home from './xmpp/home';
import Utils from './xmpp/utils';

import fileFactory from '../factory/file';
import profileFactory from '../factory/profile';
import botFactory from '../factory/bot';

@autobind
export class EventStore {
  notifications = xmpp.message.filter(msg=>msg.notification);
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
  
  constructor(){
    this.notifications.onValue(this.onNotification);
  }
  start() {
    console.log("SUBSCRIBE TO HOME STREAM EVENTS");
    this.request();
  }
  
  processItem(item, delay, live){
    console.log("PROCESS ITEM", item, item.from, model.user);
    const time = this.get_timestamp(item.version);
    if (item.message && item.message.bot && item.message.bot.action === 'show') {
      model.events.add(new EventBot(item.message.bot.id, item.message.bot.server, time));
    } else if (item.message && item.message.bot && ((item.message.bot.action === 'exit')||(item.message.bot.action === 'enter'))) {
      const userId = Utils.getNodeJid(item.message.bot['user-jid']);
      const profile = profileFactory.create(userId);
      console.log("GEOFENCE ITEM!", item.message.bot.id, item.message.bot.server, JSON.stringify(item), profile.user);
      model.events.add(new EventBotGeofence(item.id, item.message.bot.id, item.message.bot.server, time, profile, item.message.bot.action === 'enter'));
    } else if (item.message && item.message.event && item.message.event.item && item.message.event.item.entry && item.message.event.item.entry.image) {
      const server = item.id.split('/')[0];
      const id = item.message.event.node.split('/')[1];
      console.log("IMAGE ITEM!", server, id, item.message.event.item.entry.image, JSON.stringify(item));
      model.events.add(new EventBotImage(id, server, time, fileFactory.create(item.message.event.item.entry.image)));
    } else if (item.message && item.message.event && item.message.event.item && item.message.event.item.entry && item.message.event.item.entry.content) {
      const server = item.id.split('/')[0];
      const itemId = item.id.split('/')[1];
      const id = item.message.event.node.split('/')[1];
      console.log("NOTE ITEM!", server, id, itemId, item.message.event.item.entry.content);
      const botNote = new EventBotNote(id, server, time,  new Note(itemId, item.message.event.item.entry.content));
      botNote.updated = Utils.iso8601toDate(item.message.event.item.entry.updated).getTime()
      model.events.add(botNote);
    } else if (item.message && item.message.event && item.message.event.retract){
      console.log("RETRACT", item.message.event.retract)
    } else if (item.message && (item.message.body || item.message.media || item.message.image || item.message.bot)){
      const msg: Message = message.processMessage({from:item.from, to:xmpp.provider.username, ...item.message});
      if (!item.message.delay) {
        if (delay && delay.stamp) {
          console.log("PARSE DELAY:", delay.stamp)
          msg.time = Utils.iso8601toDate(delay.stamp).getTime();
        } else {
          msg.time = this.get_timestamp(item.version);
          console.log("GET TIME FOR MESSAGE", msg.date, item.version, this.get_timestamp(item.version));
        }
      }
      // if (live){
      //   msg.unread = true;
      // }
  
      let eventMessage;
      if (item.message.bot){
        console.log("SHARE BOT:", item.message.bot.id, item.message.bot.server, msg.time);
        eventMessage = new EventBotShare(item.id, item.message.bot.id, item.message.bot.server, time, msg);
      } else {
        eventMessage = new EventMessage(item.id, msg.from, msg);
      }
      model.events.add(eventMessage);
    } else {
      console.log("UNSUPPORTED ITEM!", item);
    }
    model.events.version = item.version;
  }
  
  async hidePost(id){
    await home.remove(id);
  }
  
  onNotification({notification, delay}){
    console.log("event.onNotification")
    if (notification.item){
      const item = notification.item;
      this.processItem(item, delay, true);
    } else if (notification.delete){
      const item = notification.delete;
      model.events.remove(item.id);
      model.events.version = item.version;
      
    }
  }
  
  finish() {
  }
  
  
  async request(){
    console.log("REQUEST HOME STREAM", model.events.version);
    // request archive if there is no version
    if (!model.events.version){
      const data = await home.items();
      let latest;
      for (const item of data.items){
        this.processItem(item);
        latest = item.version;
      }
      model.events.version = latest;
      home.request(model.events.version);
      console.log("SET VERSION:", model.events.version);
    } else {
      console.log("EXISTING VERSION:", model.events.version);
      home.request(model.events.version);
    }
  }
// functions to extract time from v1 uuid
  get_time_int = function (uuid_str) {
    var uuid_arr = uuid_str.split( '-' ),
      time_str = [
        uuid_arr[ 2 ].substring( 1 ),
        uuid_arr[ 1 ],
        uuid_arr[ 0 ]
      ].join( '' );
    return parseInt( time_str, 16 );
  };
  
  get_timestamp = function (uuid_str) {
    var int_time = this.get_time_int( uuid_str ) - 122192928000000000,
      int_millisec = Math.floor( int_time / 10000 );
    return int_millisec;
  };
}

export default new EventStore();

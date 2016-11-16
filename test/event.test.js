import model from '../src/model/model';
import Profile from '../src/model/Profile';
import Chat from '../src/model/Chat';
import Message from '../src/model/Message';
import EventFriend from '../src/model/EventFriend';
import EventChat from '../src/model/EventChat';
import EventMessage from '../src/model/EventMessage';
import event from '../src/store/event';
import {when} from 'mobx';

describe("deserialize", function() {
  before(function(){
    event.start();
    model.clear();
  });
  after(function(){
    event.finish();
    model.clear();
  });
  // step("test friend event", function(done){
  //   model.events.clear();
  //   const profile = new Profile("User1");
  //   profile.isFollower = true;
  //   model.friends.add(profile);
  //   when(()=>model.events.list.length === 1 && model.events.list[0].event instanceof EventMessage, ()=>{
  //     done();
  //   })
  // });
    
  // step("test message event", function(done){
  //   model.events.clear();
  //   const chat = new Chat("newChat");
  //   model.chats.add(chat);
  //   chat.addMessage(new Message({id:'id', from:new Profile("test2"), body:'hello'}));
  //   const profile = new Profile("test2");
  //   profile.isFollower = true;
  //   model.friends.add(profile);
  //   when(()=>model.events.list.length === 1 && model.events.list[0].event instanceof EventMessage && model.events.list[0].message != null, done)
  // });
});
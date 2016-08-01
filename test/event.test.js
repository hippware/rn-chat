import model from '../src/model/model';
import Profile from '../src/model/Profile';
import Chat from '../src/model/Chat';
import EventFriend from '../src/model/EventFriend';
import EventChat from '../src/model/EventChat';
import event from '../src/store/event';
import {when} from 'mobx';

describe("deserialize", function() {
  before(function(){
    event.start();
  });
  after(function(){
    event.finish()
  });
  step("test friend event", function(done){
    model.events.clear();
    const profile = new Profile("User1");
    profile.isFollower = true;
    model.friends.add(profile);
    when(()=>model.events.list.length === 1 && model.events.list[0].event instanceof EventChat, done)
  });
    
  step("test message event", function(done){
    model.events.clear();
    const chat = new Chat("newChat");
    chat.addParticipant(new Profile("test2"));
    model.chats.add(chat);
    when(()=>model.events.list.length === 1 && model.events.list[0].event instanceof EventChat, done)
  });
});
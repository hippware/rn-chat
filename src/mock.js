import RootStore from './store/root';
import { Container } from 'constitute'
import XMPP from './store/xmpp/xmpp';
import Kefir from 'kefir';
import Message from './model/Message';

import {isTesting} from './globals';

class MockXMPP {
  connectEmitter;
  disconnectEmitter;

  constructor(){
    this.message = Kefir.stream(emitter=>{});
    this.connected = Kefir.stream(emitter=>{
      this.connectEmitter = emitter;
    });
    this.disconnected = Kefir.stream(emitter=>{
      this.disconnectEmitter = emitter;
    });
  }

  sendStanza(){

  }
  sendIQ(){

  }
  connect(user, token, server){
    console.log("mock connect", user, token);
    return new Promise((resolve, reject)=>{
      this.connectEmitter.emit({user, token, server});
      resolve({user, token, server});
    });
  }
}

const container = new Container();
container.bindClass(XMPP, MockXMPP);
const mock: RootStore = container.constitute(RootStore);

mock.model.profile = mock.profile.create("user1");
mock.model.token = "password1";
mock.model.server = "testserver";

const profile1 = mock.profile.create("user2");
profile1.handle = "joe2";
profile1.firstName = "Joth";
profile1.lastName = "Smith";
if (!isTesting) {
  profile1.avatar = mock.file.create("file1");
  profile1.avatar.source = require('../images/test1.png');
}

const profile2 = mock.profile.create("user3");
profile2.handle = "monica";
profile2.firstName = "Monica";
profile2.lastName = "Belucci";
if (!isTesting) {
  profile2.avatar = mock.file.create("file2");
  profile2.avatar.source = require('../images/test2.png');
}

mock.model.friends.add(profile1);
mock.model.friends.add(profile2);

const message1 = new Message({to: mock.model.profile.user, from: profile1, body: "hello there!..", id:"1"});
// message1.media = new File("media");
// message1.media.source = require('../../images/sofa.png');

const message2 = new Message({from: mock.model.profile, to: 'groupchat', body: "hello there2!", id:"2", time:new Date("2016-05-20"), unread:false });
const message3 = new Message({from: profile2, to:'groupchat', body: "how are you?", id:"3", time:new Date("2016-05-21"), unread:false});
const message4 = new Message({from: profile1, to:'groupchat', body: "i'm fine how are you?", id:"4", time:new Date("2016-05-22"), unread:false});

mock.message.addMessage(message1);
mock.message.addMessage(message2);
mock.message.addMessage(message3);
mock.message.addMessage(message4);

export default mock;

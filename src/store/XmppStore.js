import {autorunAsync, action, observable} from 'mobx';
import Model from '../model/Model';
import XMPP from '../store/xmpp/xmpp';
import { Dependencies } from 'constitute'
import assert from 'assert';
import autobind from 'autobind-decorator';

@Dependencies(Model, XMPP)
@autobind
export default class XmppStore {
  model: Model;
  connectHandler = null;
  xmpp: XMPP;

  constructor(model: Model, xmpp: XMPP){
    this.model = model;
    this.xmpp = xmpp;
    assert(model, "No model is defined");
    assert(xmpp, "No xmpp is defined");

    // connect automatically after register
    this.connectHandler = autorunAsync(()=>{
      !this.model.connected &&
      this.model.tryToConnect &&
      !this.model.error &&
      this.model.token &&
      this.model.profile &&
      this.model.server &&
      this.connect(this.model.profile.user, this.model.token, this.model.server)
    });
  
    this.xmpp.connected.onValue(this.onConnect);
    this.xmpp.disconnected.onValue(this.onDisconnect);
  }

  @action onConnect(){
    console.log("SET MODEL TO CONNECTED!");
    this.model.connected = true;
    this.model.connecting = false;
  }

  @action onDisconnect(){
    this.model.connected = false;
    this.model.connecting = false;
  }

  disconnect(){
    return this.xmpp.disconnect();
  }
  
  @action connect(user, password, server){
    this.model.connecting = true;
    this.xmpp.connect(user, password, server)
      .then(data=>this.model.tryToConnect = false)
      .catch(e => {
        console.log("AUTH ERROR:",e);
        this.model.error = e;
        this.model.token = null;
      });
  }
  
  @action logout(){
    this.model.clear();
    this.disconnect();
  }

  dispose(){
    this.connectHandler();
  }

}
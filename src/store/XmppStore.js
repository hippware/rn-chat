import {autorunAsync, observable} from 'mobx';
import Model from '../model/Model';
import xmpp from '../store/xmpp/xmpp';

export default class XmppStore {
  model: Model;
  connect = null;

  constructor(model: Model){
    this.model = model;

    // connect automatically after register
    this.connect = autorunAsync(()=>{
      !this.model.connected &&
      this.model.tryToConnect &&
      !this.model.error &&
      this.model.token &&
      this.model.profile &&
      this.model.server &&
      xmpp.connect(this.model.profile.user, this.model.token, this.model.server)
        .then(data=>this.model.tryToConnect = false)
        .catch(e => this.model.error = e);
    });

    xmpp.connected.onValue(x=>this.model.connected = true);
    xmpp.disconnected.onValue(x=>this.model.connected = false);
  }

  dispose(){
    this.connect();
  }

}
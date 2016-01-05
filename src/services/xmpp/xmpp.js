import Roster from './plugins/roster';
import Message from './plugins/message';

import {USE_IOS_XMPP, HOST, SERVICE} from '../../globals';

export class XmppService {
    constructor(connect, plugins){
        this.isConnected = false;
        this.connect = connect;
        this.host = connect.host;
        if (!this.host){
            throw new Error("Host is not defined");
        }
        connect.onConnected = this.onConnected.bind(this);
        connect.onDisconnected = this.onDisconnected.bind(this);
        connect.onAuthFail = this.onAuthFail.bind(this);
        connect.onPresence = this.onPresence.bind(this);
        connect.onMessage = this.onMessage.bind(this);
        connect.onIQ = this.onIQ.bind(this);
        this.startTime = null;

        this.delegate = null;
        this.plugins = plugins.map(Class=>new Class(this));

        // add all plugins methods to the service
        this.plugins.forEach(plugin=>{
            Object.getOwnPropertyNames(plugin).forEach(name=>{
                if (typeof plugin[name] === 'function' && !name.startsWith('on')){
                    this[name] = plugin[name];
                }
            });
        });
    }

    onConnected(username, password){
        console.log("XMPP CONNECTED:"+(new Date()-this.startTime)/1000);
        this.isConnected = true;
        this.plugins.forEach(plugin=>plugin.onConnected && plugin.onConnected(username, password));
        this.delegate.onConnected && this.delegate.onConnected(username, password);
    }

    onDisconnected(error){
        this.isConnected = false;
        try {
            this.plugins.forEach(plugin=>plugin.onDisconnected && plugin.onDisconnected(error));
            this.delegate.onDisconnected && this.delegate.onDisconnected();
        } catch (error){
            console.error(error.stack);
        }
    }

    onAuthFail(error){
        try {
            this.plugins.forEach(plugin=>plugin.onAuthFail && plugin.onAuthFail(error));
            this.delegate.onAuthFail && this.delegate.onAuthFail(error);
        } catch (error){
            console.error(error.stack);
        }
    }

    onPresence(data){
        try {
            this.plugins.forEach(plugin=>plugin.onPresence && plugin.onPresence(data));
            this.delegate.onPresence && this.delegate.onPresence(data);
        } catch (error){
            console.error(error.stack);
        }
    }

    onMessage(data){
        try {
            this.plugins.forEach(plugin=>plugin.onMessage && plugin.onMessage(data));
            this.delegate.onMessage && this.delegate.onMessage(data);
        } catch (error){
            console.error(error.stack);
        }
    }

    onIQ(data){
        try {
            this.plugins.forEach(plugin=>plugin.onIQ && plugin.onIQ(data));
            this.delegate.onIQ && this.delegate.onIQ(data);
        } catch (error){
            console.error(error.stack);
        }
    }

    sendMessage(data){
        this.connect.sendMessage(data);
    }

    sendStanza(data){
        this.connect.sendStanza(data);
    }

    sendPresence(data){
        this.connect.sendPresence(data);
    }

    sendIQ(data){
        this.connect.sendIQ(data);
    }

    disconnect(){
        this.connect.disconnect();
    }

    login(username, password){
        this.startTime = new Date();
        this.connect.login(username, password);
    }
}


var connect;
if (USE_IOS_XMPP){
    let XmppConnect = require('./XmppIOS').default;
    connect = new XmppConnect(HOST);
} else {
    let XmppConnect = require('./XmppStrophe').default;
    connect = new XmppConnect(HOST, SERVICE);
}

export default new XmppService(connect, [Roster, Message]);


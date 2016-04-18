import { sideEffect } from 'redux-side-effects';
import {DEBUG} from './globals';
import assert from 'assert';
import user from './services/UserService';
import profile from './services/xmpp/profile';
import file from './services/xmpp/file';
import roster from './services/xmpp/roster';
import xmpp from './services/xmpp/xmpp';
import message from './services/xmpp/message';
import location from './services/LocationService';
import * as actions from './actions';

class API {
    constructor(){
        this.cache = {};
        this.dispatch = (action)=>console.log("Empty dispatch is called for action"+action.type);
        this.onMessage = this.onMessage.bind(this);
        this.requestArchive = this.requestArchive.bind(this);
        this.requestProfile = this.requestProfile.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        xmpp.onDisconnect = this.onDisconnected.bind(this);
        location.dayChangeCallback = isDay=>this.dispatch({isDay, type:actions.SET_IS_DAY});
        location.positionCallback = position=>this.dispatch({...position, type:actions.SET_LOCATION});
        roster.onPresenceUpdate = presence=>this.dispatch({...presence, type:actions.PRESENCE_UPDATE_RECEIVED});
        roster.onSubscribeRequest = presence=>this.dispatch({...presence, type:actions.SUBSCRIBE_REQUEST_RECEIVED});
        message.onMessage = this.onMessage;
        message.onPausing = user=>this.dispatch({type: actions.MESSAGE_PAUSED, user});
        message.onComposing = user=>this.dispatch({type: actions.MESSAGE_COMPOSING, user});
    }

    async login(data){
        const response = await user.login(data);
        const {username, password} = await xmpp.login(response.uuid, response.sessionID);
        this.dispatch({type: actions.CONNECTED, username, password});
        this.username = username;
        location.observe();
        roster.requestRoster().then(roster=>this.dispatch(actions.rosterReceived(roster)));
        return response;
    }

    async requestProfile({user, fields} = {}) {
        assert(user, "user is not defined");
        let isOwn = user == this.username;
        if (!this.cache[user] || isOwn) {
            let res = await profile.requestProfile(user, fields, isOwn);
            // download avatar
            if (res.avatar) {
                if (!this.cache[res.avatar]) {
                    this.cache[res.avatar] = await file.requestDownload(res.avatar);
                }
                res.avatarPath = this.cache[res.avatar];
            }
            this.cache[user] = {...res, cached:true};
            return res;
        } else {
            return this.cache[user];
        }
    }

    updateProfile({user, fields}){
        return profile.updateProfile(user, fields);
    }

    onMessage(msg){
        this.dispatch({type: actions.MESSAGE_RECEIVED, msg:{...msg, profile:this.requestProfile(msg.from)}});
    }

    onDisconnected(dispatch){
        this.dispatch({type:actions.DISCONNECTED});
        location.stop();
    }

    async logout(data){
        await xmpp.disconnect();
        return user.logout(data);
    }

    async requestArchive(){
        const archive = await message.requestArchive();
        console.log("ARCHIVE RECEIVED:", archive);
        for (let i=0;i<archive.length;i++){
            let msg = archive[i];
            let user = msg.own ? msg.to : msg.from;
            console.log("GET INFO FOR USER:", user);
            msg.profile = await this.requestProfile({user});
            console.log("GOT INFO", msg.profile);
        }
        this.dispatch({type: actions.ARCHIVE_RECEIVED, archive});
    }

    async sendMessage({msg}){
        const identMsg = {...msg, id:msg.id || 's'+Date.now()};
        await xmpp.sendMessage(identMsg);
        return identMsg;
    }

    async uploadFile(params) {
        const data = await file.requestUpload(params);
        await this.updateProfile({user:this.username, fields:{avatar: data.referenceURL}});
        return data;
    }

}

const api = new API();
export default api;

export function run(func, action){
    return sideEffect(dispatch=>{
        api.dispatch = dispatch;
        assert(dispatch, "dispatch should be defined");
        assert(func, "No function is defined");
        return func(action).then(data=> {
            if (action && typeof(action) === 'object' && action.type) {
                if (DEBUG){
                    console.log("ACTION COMPLETED:", action.type, data);
                }
                dispatch({type: action.type + actions.SUCCESS, data})
            }
        }).catch(error=>{
            console.error("ERROR:", error, error.stack);
            if (action && typeof(action)==='object' && action.type){
                dispatch({type:action.type+actions.ERROR, error});
            }
        });
    });
}


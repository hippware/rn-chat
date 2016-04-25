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
import {SUCCESS} from './actions';
import {displayName} from './reducers/profile';

class API {
    constructor(){
        this.cache = {};
        this.dispatch = (action)=>console.log("Empty dispatch is called for action"+action.type);
        this.onMessage = this.onMessage.bind(this);
        this.requestArchive = this.requestArchive.bind(this);
        this.requestProfile = this.requestProfile.bind(this);
        this.requestRoster = this.requestRoster.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        xmpp.onConnect = this.onConnected.bind(this);
        xmpp.onDisconnect = this.onDisconnected.bind(this);
        xmpp.onAuthError = error=>this.dispatch({type:actions.LOGIN+actions.ERROR, error});
        location.dayChangeCallback = isDay=>this.dispatch({isDay, type:actions.SET_IS_DAY});
        location.positionCallback = position=>this.dispatch({...position, type:actions.SET_LOCATION});
        roster.onPresenceUpdate = presence=>this.dispatch({...presence, type:actions.PRESENCE_UPDATE_RECEIVED});
        roster.onSubscribeRequest = presence=>this.dispatch({...presence, type:actions.SUBSCRIBE_REQUEST_RECEIVED});
        message.onMessage = this.onMessage;
        message.onPausing = user=>this.dispatch({type: actions.MESSAGE_PAUSED, user});
        message.onComposing = user=>this.dispatch({type: actions.MESSAGE_COMPOSING, user});
    }

    async login(data){
        let response;
        console.log("DATA:", data);
        if (data.sessionID){
            console.log("DON'T RELOGIN WITH EXISTING SESSIONID", data);
            response = data;
        } else {
            response = await user.login(data);
        }
        location.observe();
        return response;
    }

    async requestProfile({user, fields} = {}) {
        assert(user, "user is not defined");
        let isOwn = user == this.username;
        if (!this.cache[user] || isOwn) {
            let res = await profile.requestProfile(user, fields, isOwn);
            res.displayName = displayName(res);
            this.cache[user] = {...res, cached:true};
            return res;
        } else {
            return this.cache[user];
        }
    }

    async requestRoster(){
        const list = await roster.requestRoster();
        for (let i=0;i<list.length;i++){
            const res = list[i];
            console.log("REC:", res.avatar);
            if (res.avatar){
                //if (!this.cache[res.avatar]) {
                //    this.cache[res.avatar] = await file.requestDownload(res.avatar);
                //}
                //res.avatarPath = this.cache[res.avatar];
            }
        }
        return list;
    }

    updateProfile({user, fields}){
        return profile.updateProfile(user, fields);
    }

    async onMessage(msg){
        const profile = await this.requestProfile({user:msg.from});
        this.dispatch({type: actions.MESSAGE_RECEIVED, msg:{...msg, profile}});
    }

    onConnected({username, password}){
        this.dispatch({type: actions.CONNECTED, username, password});
        this.username = username;
    }

    onDisconnected(){
        this.dispatch({type:actions.DISCONNECTED});
        location.stop();
    }

    async logout(data){
        xmpp.disconnect();
        return user.logout(data);
    }

    async requestArchive(){
        const archive = await message.requestArchive();
        for (let i=0;i<archive.length;i++){
            let msg = archive[i];
            let user = msg.own ? msg.to : msg.from;
            msg.profile = await this.requestProfile({user});
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
        const res = func(action);
        if (res) {
            return res.then(data=> {
                if (action && typeof(action) === 'object' && action.type) {
                    if (DEBUG) {
                        console.log("ACTION COMPLETED:", action.type, data);
                    }
                    dispatch({type: action.type + actions.SUCCESS, data})
                }
            }).catch(error=> {
                console.log("ERROR:", error, error.stack);
                if (action && typeof(action) === 'object' && action.type) {
                    dispatch({type: action.type + actions.ERROR, error});
                }
            });
        }
    });
}


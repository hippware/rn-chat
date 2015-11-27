'use strict';
import service from './service';

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export function requestLogin(){
    return { type: REQUEST_LOGIN };
}

export const REQUEST_UNSUBSCRIBE = 'REQUEST_UNSUBSCRIBE';
export function requestUnsubscribe(user){
    return { type: REQUEST_UNSUBSCRIBE, user };
}

export const REQUEST_SUBSCRIBE = 'REQUEST_SUBSCRIBE';
export function requestSubscribe(user){
    return { type: REQUEST_SUBSCRIBE, user };
}

export const REQUEST_AUTHORIZE = 'REQUEST_AUTHORIZE';
export function requestAuthorize(user){
    return { type: REQUEST_AUTHORIZE, user };
}

export const REQUEST_UNAUTHORIZE = 'REQUEST_UNAUTHORIZE';
export function requestUnauthorize(user){
    return { type: REQUEST_UNAUTHORIZE, user };
}

export const CONNECTED = 'CONNECTED';
export function connected(){
    return { type: CONNECTED }
}

export const DISCONNECTED = 'DISCONNECTED';
export function disconnected(){
    return { type: DISCONNECTED }
}

export const AUTHFAIL = 'AUTHFAIL';
export function authfail(){
    return { type: AUTHFAIL }
}

export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';
export function messageReceived(msg){
    return { type: MESSAGE_RECEIVED, msg}
}

export const SUBSCRIBE_REQUEST_RECEIVED = 'SUBSCRIBE_REQUEST_RECEIVED';
export function subscribeRequestReceived(user){
    return { type: SUBSCRIBE_REQUEST_RECEIVED, user}
}

export const ROSTER_RECEIVED = 'ROSTER_RECEIVED';
export function rosterReceived(list){
    return {type: ROSTER_RECEIVED, list};
}

export const MESSAGE_SENT = 'SEND_MESSAGE_REQUEST';
export function messageSent(msg){
    return {type: MESSAGE_SENT, msg};
}

export function sendMessage(msg){
    return dispatch => {
        dispatch(messageSent(msg));
        service.sendMessage(msg);
    }
}

export function subscribe(user) {
    return dispatch => {
        dispatch(requestSubscribe(user));
        service.subscribe(user);
    }
}

export function unsubscribe(user) {
    return dispatch => {
        dispatch(requestUnsubscribe(user));
        service.unsubscribe(user);
    }
}

export function authorize(user) {
    return dispatch => {
        dispatch(requestAuthorize(user));
        service.authorize(user);
    }
}

export function unauthorize(user) {
    return dispatch => {
        dispatch(requestUnauthrize(user));
        service.unauthorize(user);
    }
}

export function disconnect(){
    return dispatch => {
        service.onDisconnected = () => dispatch(disconnected());
        service.disconnect();
    }

}
export function requestRoster(){
    return dispatch => {
        service.requestRoster((result)=> dispatch(rosterReceived(result)));
    }
}
export function processLogin(username, password) {
    return dispatch => {
        dispatch(requestLogin());
        service.onConnected = () => dispatch(connected());
        service.onDisconnected = () => dispatch(disconnected());
        service.onAuthFail = () => dispatch(authfail());
        service.onMessage = (msg) => dispatch(messageReceived(msg));
        service.onSubscribeRequest = (user) => dispatch(subscribeRequestReceived(user));
        service.login(username, password);
    }
}
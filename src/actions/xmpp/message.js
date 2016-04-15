import service from '../../services/xmpp/message';
import xmpp from '../../services/xmpp/xmpp';

export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';
export function messageReceived(msg){
    return { type: MESSAGE_RECEIVED, msg}
}

export const MESSAGE_COMPOSING = 'MESSAGE_COMPOSING';
export const MESSAGE_COMPOSING_REQUEST = 'MESSAGE_COMPOSING_REQUEST';
export function messageComposing(username){
    return { type: MESSAGE_COMPOSING, username}
}

export const MESSAGE_PAUSED = 'MESSAGE_PAUSED';
export function messagePaused(username){
    return { type: MESSAGE_PAUSED, username}
}

export const MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export const MESSAGE_SENT = 'SEND_MESSAGE_SENT';
export const MESSAGE_ERROR = 'SEND_MESSAGE_ERROR';
export function sendMessage(msg){
    return {type: MESSAGE_REQUEST, msg};
}


export const READ_ALL_MESSAGES = 'READ_ALL_MESSAGES';
export function readAllMessages(username){
    return { type: READ_ALL_MESSAGES, username }
}


export const REQUEST_ARCHIVE = 'REQUEST_ARCHIVE';
export function requestArchive(criterias){
    return { type: REQUEST_ARCHIVE, ...criterias }
}


export const ARCHIVE_RECEIVED = 'ARCHIVE_MESSAGE_RECEIVED';

export function receiveMessagesAPI(dispatch){
    service.onMessage = msg=>dispatch({type: MESSAGE_RECEIVED, msg});
    service.onPausing = user=>dispatch({type: MESSAGE_PAUSED, user});
    service.onComposing = user=>dispatch({type: MESSAGE_COMPOSING, user});
}

export async function requestArchiveAPI(dispatch){
    console.log("REQUEST ARCHIVE");
    const archive = await service.requestArchive();
    dispatch({type: ARCHIVE_RECEIVED, archive});
}

export async function sendMessageAPI(dispatch, msg){
    const identMsg = Object.assign({}, msg, {id: msg.id || 's'+Date.now()});
    try {
        await xmpp.sendMessage(identMsg);
        dispatch({type: MESSAGE_SENT, msg:identMsg});
    } catch (error){
        console.log("MESSAGE ERROR", error.stack);
        dispatch({type: MESSAGE_ERROR, error});
    }
}

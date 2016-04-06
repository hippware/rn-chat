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


export const ARCHIVE_MESSAGE_RECEIVED = 'ARCHIVE_MESSAGE_RECEIVED';
export function archiveMessageReceived(msg){
    return { type: ARCHIVE_MESSAGE_RECEIVED, msg }
}


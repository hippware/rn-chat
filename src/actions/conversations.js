'use strict';

export const ADD_CONVERSATION = 'ADD_CONVERSATION';
export function addConversation(username, time){
    return { type: ADD_CONVERSATION, username, time };
}

export const REMOVE_CONVERSATION = 'REMOVE_CONVERSATION';
export function removeConversation(username){
    return { type: REMOVE_CONVERSATION, username };
}


'use strict';

export const ADD_CONVERSATION = 'ADD_CONVERSATION';
export function addConversation(username, time){
    return { type: ADD_CONVERSATION, username, time };
}

export const REMOVE_CONVERSATION = 'REMOVE_CONVERSATION';
export function removeConversation(username){
    return { type: REMOVE_CONVERSATION, username };
}

export const ENTER_CONVERSATION = 'ENTER_CONVERSATION';
export function enterConversation(username){
    return { type: ENTER_CONVERSATION, username };
}

export const EXIT_CONVERSATION = 'EXIT_CONVERSATION';
export function exitConversation(username){
    return { type: EXIT_CONVERSATION, username };
}


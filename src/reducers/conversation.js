import {ADD_CONVERSATION, REMOVE_CONVERSATION} from '../actions/conversations';
import {MESSAGE_SENT, MESSAGE_RECEIVED} from '../actions/xmpp/xmpp';

function addConversation(state, username, lastMsg, time, msg){
    let conversations = Object.assign({}, state.conversations);
    if (conversations[username]){
        conversations[username].time = time;
        conversations[username].lastMsg = lastMsg;
        conversations[username].history = [Object.assign({},msg), ...conversations[username].history];
        return {list: [...state.list], conversations}
    } else {
        conversations[username] = {username, time, lastMsg, history: msg ? [Object.assign({},msg)] : []};
        return {list: [username, ...state.list], conversations}
    }
}

export default function reducer(state = {list: [], conversations:{}}, action) {
    var msg;
    switch (action.type) {
        case ADD_CONVERSATION:
            if (state.conversations[action.username]){
                return state;
            } else {
                const {username, time} = action;
                // add conversation with empty history and last message
                return addConversation(state, username, '', time);
            }

        case REMOVE_CONVERSATION:
            if (!state.conversations[action.username]){
                return state;
            } else {
                let conversations = Object.assign({}, state.conversations);
                delete conversations[action.username];

                const list = state.list.filter((username)=>username!=action.username);
                return {list, conversations}
            }
        case MESSAGE_SENT:
            msg = action.msg;
            return addConversation(state, msg.to, msg.body, msg.time, msg);

        case MESSAGE_RECEIVED:
            msg = action.msg;
            return addConversation(state, msg.from, msg.body, msg.time, msg);

        default:
            return state;
    }
}
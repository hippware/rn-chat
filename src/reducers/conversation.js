import {ADD_CONVERSATION, REMOVE_CONVERSATION, ENTER_CONVERSATION, EXIT_CONVERSATION} from '../actions/conversations';
import {MESSAGE_SENT, MESSAGE_RECEIVED, DISCONNECTED, CONNECTED, READ_ALL_MESSAGES} from '../actions/xmpp/xmpp';

function addConversation(state, username, lastMsg, time, msg){
    // clone conversations
    let conversations = Object.assign({}, state.conversations);
    let list;

    // if user already exists within conversations
    if (conversations[username]){
        // check if this message is returned message with error
        if (msg.from && msg.id && msg.type === 'error'){
            conversations[username].history = conversations[username].history.map(
                (el)=> el.id == msg.id && msg.from == el.to ? Object.assign({}, el, {type: 'error'}) : el );
        } else {
            conversations[username].time = time;
            conversations[username].lastMsg = lastMsg;
            conversations[username].history = [Object.assign({},msg), ...conversations[username].history];
        }
        list = [username, ...state.list.filter(el=>el != username)];
    } else {
        list = [username, ...state.list];
        conversations[username] = {username, time, lastMsg, history: msg ? [Object.assign({},msg)] : []};
    }
    if (msg && msg.unread){
        conversations[username].unread =
            conversations[username].history.map(el=>el.unread ? 1 : 0).reduce((prev,cur)=>prev+cur);
    }
    return Object.assign({}, state, {list, conversations});
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

        case EXIT_CONVERSATION:
            return Object.assign({}, state, {current: undefined});

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
            return addConversation(state, msg.to, msg.body, msg.time, Object.assign({}, msg));

        case MESSAGE_RECEIVED:
            msg = action.msg;
            // mark incoming message as 'unread'
            return addConversation(state, msg.from, msg.body, msg.time,
                 Object.assign({}, msg, {unread: msg.type !== 'error' && msg.from !== state.current }));

        case ENTER_CONVERSATION:
        case READ_ALL_MESSAGES:
            const {username} = action;
            if (state.conversations[username]){
                const conversations = Object.assign({}, state.conversations);
                conversations[username] = Object.assign({}, conversations[username], {unread: 0});
                conversations[username].history = conversations[username].history.map(el=>Object.assign({},el,{unread:false}));
                const map = action.type === ENTER_CONVERSATION ? {current: username} : {};
                return Object.assign({}, state, {conversations}, map);
            } else {
                return state;
            }

        default:
            return state;
    }
}
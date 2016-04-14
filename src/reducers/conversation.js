import {ADD_CONVERSATION, REMOVE_CONVERSATION, ENTER_CONVERSATION, EXIT_CONVERSATION} from '../actions/conversations';
import {MESSAGE_REQUEST, MESSAGE_RECEIVED, READ_ALL_MESSAGES, MESSAGE_PAUSED, MESSAGE_COMPOSING} from '../actions/xmpp/message';
import {LOGOUT_SUCCESS, LOGIN_SUCCESS} from '../actions/profile';

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function compareMessages(a, b){
    return b.time - a.time;
}

function addConversation(state, username, msg){
    // clone conversations
    let conversations = Object.assign({}, state.conversations);
    if (!conversations[username]){
        conversations[username] = [];
    }
    let conv = conversations[username];
    conv.push(msg);
    let unread = 0;
    conv.forEach(el=>unread+=el.unread ? 1 : 0);
    conv.sort(compareMessages);

    let list = state.list.filter(el=>el.username != username);
    list.push({unread, composing:false, time:conv[0].time, lastMsg:conv[0].body, username});
    list.sort(compareMessages);

    // remove empty message
    if (conv.length == 1 && conv[0].body===''){
        conversations[username] = [];
    }
    unread = 0;
    list.forEach(el=>unread+=el.unread);

    return {...state, list, conversations, unread};
}

export default function reducer(state = {list: [], conversations:{}}, action) {
    var msg, conversations;
    switch (action.type) {
        case LOGOUT_SUCCESS:
            return {list: [], conversations:{}};

        case MESSAGE_COMPOSING:
            let list = state.list.map(el=>el.username == action.username ? {...el, composing:true} : el )
            return {...state, list};

        case MESSAGE_PAUSED:
            list = state.list.map(el=>el.username == action.username ? {...el, composing:false} : el )
            return {...state, list};

        case ADD_CONVERSATION:
            if (state.conversations[action.username]){
                return state;
            } else {
                const {username, time} = action;
                // add conversation with empty history and last message
                return addConversation(state, username, {body:'', time});
            }

        case EXIT_CONVERSATION:
            return Object.assign({}, state, {current: undefined});

        case REMOVE_CONVERSATION:
            if (!state.conversations[action.username]){
                return state;
            } else {
                let conversations = Object.assign({}, state.conversations);
                delete conversations[action.username];

                const list = state.list.filter(el=>el.username!=action.username);
                return {...state, list, conversations};
            }
        case MESSAGE_REQUEST:
            msg = action.msg;
            return addConversation(state, msg.to, msg);

        case MESSAGE_RECEIVED:
            msg = action.msg;
            // mark incoming message as 'unread'
            return addConversation(state, msg.from, {...msg, unread: msg.type !== 'error' && msg.from !== state.current });

        case ENTER_CONVERSATION:
        case READ_ALL_MESSAGES:
            const {username} = action;
            if (state.conversations[username]){
                const conversations = Object.assign({}, state.conversations);
                conversations[username] = conversations[username].map(el=>Object.assign({},el,{unread:false}));
                const list = state.list.map(el=>{return el.username==username ? {...el, unread: 0} : el});
                const map = action.type === ENTER_CONVERSATION ? {current: username} : {};
                let unread = 0;
                list.forEach(el=>unread+=el.unread);
                return {...state, list, conversations, ...map, unread};
            } else {
                return state;
            }

        default:
            return state;
    }
}
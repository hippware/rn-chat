import {REQUEST_LOGIN, REQUEST_DISCONNECT} from '../actions/xmpp/xmpp';

export default function reducer(state = {username:'', password:''}, action) {
    switch (action.type) {
        case REQUEST_LOGIN:
            console.log("REQUEST LOGIN"+action.username+ " "+action.password);
            return {username: action.username, password: action.password};

        case REQUEST_DISCONNECT:
            console.log("REQUEST DISCONNECT");
            return {username: state.username, password: ''};

        default:
            return state;
    }
}
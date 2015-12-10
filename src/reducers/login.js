import {REQUEST_LOGIN} from '../actions/xmpp/xmpp';

export default function reducer(state = {username:'', password:''}, action) {
    switch (action.type) {
        case REQUEST_LOGIN:
            console.log("REQUEST LOGIN"+action.username+ " "+action.password);
            return {username: action.username, password: action.password};

        default:
            return state;
    }
}
import {ROSTER_RECEIVED, REMOVE_ROSTER_ITEM_REQUEST, REQUEST_SUBSCRIBE, PRESENCE_UPDATE_RECEIVED} from '../actions/xmpp/roster';

/**
 * Sort contacts by status (so online goes first), then by username
 * @param a
 * @param b
 * @returns {number}
 */
function sort(a,b){
    let statusA = a.status || 'unavailable';
    let statusB = b.status || 'unavailable';
    console.log("SORT "+statusA+" "+statusB);
    if (statusA === 'online' && statusB ==='unavailable'){
        return -1;
    }
    if (statusA === 'unavailable' && statusB ==='online'){
        return 1;
    }
    var nameA = a.username.toLowerCase(), nameB = b.username.toLowerCase();
    if (nameA < nameB) //sort string ascending
        return -1;
    if (nameA > nameB)
        return 1;
    return 0; //default return value (no sorting)
}

export default function reducer(state = {roster:[]}, action) {
    switch (action.type) {
        case REQUEST_SUBSCRIBE:
            return {roster: [...state.roster.filter(el => el.username != action.user), {username: action.user}].sort(sort)};
        case REMOVE_ROSTER_ITEM_REQUEST:
            return {roster: state.roster.filter(el => el.username != action.user)};
        case PRESENCE_UPDATE_RECEIVED:
            let username = action.user;
            let status = action.status;
            if (!username){
                throw new TypeError("Username should be defined");
            }
            return {roster: state.roster.map(el => el.username == username ? Object.assign({}, el, {status}) : el).sort(sort)};
        case ROSTER_RECEIVED:
            return { roster: action.list.sort(sort) };
        default:
            return state;
    }
}
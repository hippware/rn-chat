import * as actions from '../actions';
import {SUCCESS, ERROR, REQUEST_ROSTER, PROFILE, PROFILE_CHANGED} from '../actions';
import assert from 'assert';
const PUSH_ACTION = "push";
const PROFILE_DETAIL = "profileDetail";
import API, {run} from '../API';
import {displayName} from './profile';

export default function* reducer(state = {data:{}, selected: undefined}, action) {
    let map, data;
    switch (action.type) {
        case PUSH_ACTION:
            if (action.key === PROFILE_DETAIL){
                map = {};
                if (!state.data[action.username]){
                    map[action.username] = {username: action.username};
                    // request profile info
                    yield run(API.requestProfile, {type: PROFILE, user: action.username});
                }
                return {...state, data:{...state.data, ...map}, selected:action.username};
            } else {
                return state;
            }

        case PROFILE+SUCCESS:
            const uuid = action.data.node.split('/')[1];
            assert(uuid, "UUID is not defined to profile data");
            map = {};
            map[uuid] = action.data;
            return {...state, data:{...state.data, ...map}};

        case PROFILE_CHANGED:
            const user = action.user;
            assert(user, "user is not defined for profile changed action");
            map = {};
            map[user] = {...state.data[user], ...action.data};
            return {...state, data:{...state.data, ...map}};

        case REQUEST_ROSTER+SUCCESS:
            const list = action.data;
            assert(list, "list is not defined for roster data");
            map = {};
            for (let rec of list){
                assert(rec.username, "username is not defined for roster item");
                map[rec.username] = rec;
                map[rec.username].isFriend = true;
                map[rec.username].displayName = displayName(rec);
            }
            return {...state, data:{...data, ...map}};

        default:
            return state;
    }


}


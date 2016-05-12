import * as actions from '../actions';
import profile from '../services/xmpp/profile';
import xmpp from '../services/xmpp/xmpp';
import assert from 'assert';

import {SUCCESS, ERROR, CONNECTED, PROFILE, PROFILE_UPDATE, FILE_UPLOAD, LOGIN, LOGOUT} from '../actions';
import API, {run} from '../API';

export default function* reducer(state = {}, action) {
  let d;
  switch (action.type) {
    case LOGIN:
      const {type, sessionID, ...data} = action;
      yield run(profile.register, action);
      return {...state, ...data, uuid:undefined, error:undefined};

    case CONNECTED:
      yield run(API.requestProfile, {type: PROFILE, user: action.username});
      return state;

    case LOGIN+SUCCESS:
      return {...state, error: undefined, ...action.data};


    case LOGIN+ERROR:
      return {...state, error: action.error, sessionID: undefined, uuid: undefined};

    case PROFILE:
      assert(action.user, "user is not defined");
      yield run(API.requestProfile, action);
      return state;

    case PROFILE+SUCCESS:
      d = action.data;
      return d.own ? {...state, ...d, displayName:displayName({...state, ...d})} : state;

    case FILE_UPLOAD+SUCCESS:
      if (action.data.avatar) {
        yield run(API.updateProfile, {type: PROFILE_UPDATE, fields:{avatar: action.data.referenceURL}});
      }
      return state;

    case FILE_UPLOAD:
      yield run(API.uploadFile, action);
      if (action.avatar) {
        return {...state, avatarPath: action.file};
      } else {
        return state;
      }

    case FILE_UPLOAD+ERROR:
      if (action.avatar) {
        return {...state, avatarPath: undefined, error: action.error};
      } else {
        return state;
      }

    case PROFILE_UPDATE:
      yield run(API.updateProfile, action);
      return state;

    case PROFILE_UPDATE+SUCCESS:
      d = action.data;
      return {...state, ...d, displayName:displayName({...state, ...d}), error: undefined};

    case PROFILE_UPDATE+ERROR:
      return {...state, error: action.error};

    case LOGOUT:
      // delete test account
      if (action.uuid){
        yield run(profile.delete);
      }
      yield run(xmpp.disconnect, action);
      return {};
    default:
      return state;
  }


}

export function displayName({firstName, lastName, handle, first_name, last_name, username}){
  const fname = first_name || firstName;
  const lname = last_name || lastName;

  if (fname && lname){
    return fname+" "+lname;
  } else if (fname){
    return fname;
  } else if (lname){
    return lname;
  } else if (handle){
    return handle;
  } else if (username){
    return username;
  }
  return ' ';
}

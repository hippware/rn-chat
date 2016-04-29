import * as actions from '../actions';
import {SUCCESS, ERROR, CONNECTED, PROFILE, PROFILE_UPDATE, FILE_UPLOAD, LOGIN, LOGOUT} from '../actions';
import API, {run} from '../API';

export default function* reducer(state = {}, action) {
  let d;
  switch (action.type) {
    case LOGIN:
      const {type, sessionID, ...data} = action;
      yield run(API.login, action);
      return {...state, ...data, uuid:undefined, error:undefined};

    case CONNECTED:
      yield run(API.requestProfile, {type: PROFILE, user: action.username});
      return state;

    case LOGIN+SUCCESS:
      return {...state, error: undefined, ...action.data};


    case LOGIN+ERROR:
      console.log("ERROR:", action.error);
      return {...state, error: action.error, sessionID: undefined, uuid: undefined};

    case PROFILE:
      yield run(API.requestProfile, action);
      return state;

    case PROFILE+SUCCESS:
      d = action.data;
      return d.own ? {...state, ...d, displayName:displayName({...state, ...d})} : state;

    case FILE_UPLOAD+SUCCESS:
      yield run(API.updateProfile, {type: PROFILE_UPDATE, fields:{avatar: action.data.referenceURL}});
      return state;

    case FILE_UPLOAD:
      yield run(API.uploadFile, action);
      return {...state, avatarPath: action.file};

    case FILE_UPLOAD+ERROR:
      return {...state, avatarPath: undefined, error:action.error};

    case PROFILE_UPDATE:
      yield run(API.updateProfile, action);
      return state;

    case PROFILE_UPDATE+SUCCESS:
      d = action.data;
      return {...state, ...d, displayName:displayName({...state, ...d}), error: undefined};

    case PROFILE_UPDATE+ERROR:
      return {...state, error: action.error};

    case LOGOUT:
      yield run(API.logout, action);
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

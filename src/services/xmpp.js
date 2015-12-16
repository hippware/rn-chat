var service;
import {USE_IOS} from '../globals';
if (USE_IOS){
    service = require('./XmppCoreIOS').default;
} else {
    service = require('./RosterStrophe').default;
}

export default service;


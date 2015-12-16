var service;
import {USE_IOS, HYBRID_XMPP} from '../globals';
if (USE_IOS && !HYBRID_XMPP){
    service = require('./XmppCoreIOS').default;
} else {
    service = require('./RosterStrophe').default;
}

export default service;


var service;
const USE_IOS = true;
if (USE_IOS){
    service = require('./XmppCoreIOS').default;
} else {
    service = require('./RosterStrophe').default;
}

export default service;


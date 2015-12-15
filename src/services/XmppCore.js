const USE_IOS = true;
var service;
if (USE_IOS){
    service = require('./XmppCoreIOS').default;
} else {
    service = require('./XmppCoreStrophe').default;
}

export default service;

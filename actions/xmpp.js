var strophe = require("react-native-strophe").Strophe;
var Strophe = strophe.Strophe;
var connection = null;

const HOST = 'beng.dev.tinyrobot.com';
export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const CONNECTED = 'CONNECTED';
export const DISCONNECTED = 'DISCONNECTED';
export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';
export const AUTHFAIL = 'AUTHFAIL';

export function requestLogin(){
    return {
        type: REQUEST_LOGIN
    };
}

export function connected(){
    return {
        type: CONNECTED
    }
}

export function disconnected(){
    return {
        type: DISCONNECTED
    }
}

export function authfail(){
    return {
        type: AUTHFAIL
    }
}

export function messageReceived(msg){
    return {
        type: MESSAGE_RECEIVED
    }

}

function onMessage(dispatch, element){
    console.log("ONMESSAGE:"+element);
    dispatch(messageReceived({}));
    return true;
}

function onPresence(dispatch, element){
    console.log("ONPRESENCE:"+element);
    dispatch(messageReceived({}));
    return true;
}

function onIQ(dispatch, element){
    console.log("ONIQ:"+element);
    dispatch(messageReceived({}));
    return true;
}


export function processLogin(username, password) {
    connection = new Strophe.Connection("ws://"+HOST+":5280/ws-xmpp");

    return dispatch => {
        dispatch(requestLogin());
        console.log("USER:"+username+"@"+HOST);
        connection.connect(username + "@" + HOST, password, function (status) {
            console.log("STATUS:"+status);
            switch (status){
                case Strophe.Status.CONNECTED:
                    dispatch(connected());
                    connection.addHandler(onMessage.bind(undefined, dispatch), null, "message", null, null);
                    connection.addHandler(onPresence.bind(undefined, dispatch), null, "presence", null, null);
                    connection.addHandler(onIQ.bind(undefined, dispatch), null, "iq", null, null);

                    connection.send($pres());
                    connection.send($msg({to:'pavel@beng.dev.tinyrobot.com',type:'chat'}).c('body').t("Hello world"));
                    return;
                case Strophe.Status.DISCONNECTED:
                    connection.removeHandlers();
                    connection = null;
                    dispatch(disconnected());
                    return;
                case Strophe.Status.AUTHFAIL:
                    dispatch(authfail());
                    return;

            }
       });
    }
}
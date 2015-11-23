import React from 'react-native';
const {AppRegistry} = React;
import { Provider } from 'react-redux/native';
import configureStore from './configureStore';
import App from './containers/App';

const store = configureStore();

class Chat extends React.Component {
    render() {
        return (
            <Provider store={store}>
                {() => <App />}
            </Provider>
        );
    }
}

AppRegistry.registerComponent('Chat', () => Chat);

///**
// * Sample React Native App
// * https://github.com/facebook/react-native
// */
//'use strict';
//
//var React = require('react-native');
//var strophe = require("react-native-strophe").Strophe;
//var Strophe = strophe.Strophe;
//
//var {
//  AppRegistry,
//  StyleSheet,
//  Text,
//  View,
//} = React;
//
//function onMessage(msg){
//    console.log("!!!!!!!!!!!"+msg);
//}
//function onPresence(msg){
//    console.log("!!!!!!!!!!!"+msg);
//}
//var conn = null;
//var send_ping = function (to) {
//    var ping = $iq({
//        to: to,
//        type: "get",
//        id: "ping1"}).c("ping", {xmlns: "urn:xmpp:ping"});
//
//    console.log("Sending ping to " + to + ".");
//
//    conn.send(ping);
//
//    var msg = $msg({to:'pavel@beng.dev.tinyrobot.com',type:'chat'}).c('body').t("Hello world");
//    conn.send(msg);
//
//};
//var handle_pong = function (iq) {
//    console.log("Received pong from server");
//
//    conn.send($pres());
//
//    //Hello.connection.disconnect();
//
//    return false;
//};
//
//var Chat = React.createClass({
//    render: function() {
//      //var conn = new Strophe.Connection(
//      //    "https://beng.dev.tinyrobot.com:5281/http-bind");
//      //console.log(conn);
//      //
//      //conn.connect("user1@beng.dev.tinyrobot.com", "user1", function (status) {
//      conn = new Strophe.Connection(
//          "ws://beng.dev.tinyrobot.com:5280/ws-xmpp");
//      console.log(conn);
//
//      conn.connect("user2@beng.dev.tinyrobot.com", "user2", function (status) {
//          console.log("STATUS:"+status);
//          if (status === Strophe.Status.CONNECTED) {
//              console.log('connected');
//              conn.addHandler(handle_pong, null, "iq", null, "ping1");
//              conn.addHandler(onPresence, null, 'presence');
//              conn.addHandler(onMessage, null, 'message', null, null);
//              var domain = Strophe.getDomainFromJid(conn.jid);
//              console.log("DOMAIN:"+domain+$pres()+conn);
//              conn.send($pres());
//              send_ping(domain);
//          } else if (status === Strophe.Status.DISCONNECTED) {
//              console.log('disconnected');
//          }
//      });
//    return (
//      <View style={styles.container}>
//        <Text style={styles.welcome}>
//          Welcome to React Native!
//        </Text>
//        <Text style={styles.instructions}>
//          To get started, edit index.ios.js
//        </Text>
//        <Text style={styles.instructions}>
//          Press Cmd+R to reload,{'\n'}
//          Cmd+D or shake for dev menu
//        </Text>
//      </View>
//    );
//  }
//});
//
//var styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    justifyContent: 'center',
//    alignItems: 'center',
//    backgroundColor: '#F5FCFF',
//  },
//  welcome: {
//    fontSize: 20,
//    textAlign: 'center',
//    margin: 10,
//  },
//  instructions: {
//    textAlign: 'center',
//    color: '#333333',
//    marginBottom: 5,
//  },
//});
//
//AppRegistry.registerComponent('Chat', () => Chat);

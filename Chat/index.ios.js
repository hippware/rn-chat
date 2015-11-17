/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var strophe = require("node-strophe").Strophe;
var Strophe = strophe.Strophe;

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var Chat = React.createClass({
  render: function() {
      //var conn = new Strophe.Connection(
      //    "https://beng.dev.tinyrobot.com:5281/http-bind");
      //console.log(conn);
      //
      //conn.connect("user1@beng.dev.tinyrobot.com", "user1", function (status) {
      var conn = new Strophe.Connection(
          "https://jabber.hot-chilli.net:5281/http-bind");
      console.log(conn);

      conn.connect("rntestuser1@jabber.hot-chilli.net", "rntestuser1", function (status) {
          console.log("STATUS:"+status);
          if (status === Strophe.Status.CONNECTED) {
              console.log('connected');
          } else if (status === Strophe.Status.DISCONNECTED) {
              console.log('disconnected');
          }
      }, 10);
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Chat', () => Chat);

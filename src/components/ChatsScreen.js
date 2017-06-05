import React, {Component} from 'react';
import {TouchableOpacity, ListView, View, Text, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-native';
import {k} from './Global';
import Screen from './Screen';
import MessageButton from './MessageButton';
import Chats from './ChatListView';
import location from '../store/locationStore';
import model from '../model/model';
import {observer} from 'mobx-react/native';

@observer
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  scrollTo(params) {
    this.refs.list.scrollTo(params);
  }

  render() {
    const chats = model.chats.list;
    const isDay = location.isDay;
    const number = model.chats.unread;
    return (
      <Screen isDay={isDay} style={{paddingTop: 70 * k}}>
        <Chats ref='list' chats={chats} contentContainerStyle={{marginTop: number ? 47 : 0}} />
        <MessageButton />
        {!!number &&
          <View style={styles.button}>
            <Text style={{fontFamily: 'Roboto-Italic', color: 'white'}}>New Messages</Text>
          </View>}
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    height: 47,
    backgroundColor: 'rgba(254,92,108, 0.9)',
  },
});

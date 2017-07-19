import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {k} from './Global';
import Screen from './Screen';
import MessageButton from './MessageButton';
import location from '../store/locationStore';
import model from '../model/model';
import {observer} from 'mobx-react/native';
import ChatCard from './ChatCard';
import {Actions} from 'react-native-router-flux';
import ListFooter from './ListFooter';

const footerImage = require('../../images/graphicEndMsgs.png');

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
      <Screen isDay={isDay}>
        <FlatList
          ref='list'
          contentContainerStyle={{marginTop: number ? 47 : 10}}
          data={chats}
          initialNumToRender={6}
          ListFooterComponent={() => <ListFooter footerImage={footerImage} finished />}
          renderItem={({item}) => <ChatCard item={item} onPress={i => Actions.chat({item: i.id})} />}
          keyExtractor={item => `${item.id}`}
        />
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
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: 47,
    backgroundColor: 'rgba(254,92,108, 0.9)',
  },
});

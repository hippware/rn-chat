// @flow

import React from 'react';
// import {Image, StyleSheet, View, Text, FlatList, TextInput} from 'react-native';
import Screen from './Screen';
import {observer} from 'mobx-react/native';
import SearchBar from './SearchBar';
import ProfileList from './ProfileList';
import searchStore from '../store/searchStore';
import {Actions} from 'react-native-router-flux';

type Props = {};

class SearchUsers extends React.Component {
  props: Props;

  // static rightButtonImage = null;
  // static onRight = null;
  static rightButton = null;

  static onLeft = () => {
    searchStore.setGlobal('');
    Actions.pop();
  };

  render() {
    const selection = searchStore.globalResult;
    return (
      <Screen>
        <SearchBar onChangeText={searchStore.setGlobal} value={searchStore.global} autoCorrect={false} autoCapitalize='none' />
        <ProfileList selection={selection} isDay />
      </Screen>
    );
  }
}

export default observer(SearchUsers);

// const styles = StyleSheet.create({});

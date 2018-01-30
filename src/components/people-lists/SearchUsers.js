// @flow

import React from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import Screen from '../Screen';
import {observer} from 'mobx-react/native';
import SearchBar from './SearchBar';
import ProfileList from './ProfileList';
import searchStore from '../../store/SearchStore';
import {Actions} from 'react-native-router-flux';
import {FollowableProfileItem} from './customProfileItems';
import {k} from '../Global';

type Props = {};

class SearchUsers extends React.Component<Props> {
  static rightButton = null;

  static onLeft = () => {
    searchStore.setGlobal('');
    Actions.pop();
  };

  renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => Actions.profileDetails({item: item.profile.id})}>
        <FollowableProfileItem profile={item.profile} />
      </TouchableOpacity>
    );
  };

  renderEmpty = () => (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Text
        style={{
          fontSize: 15,
          textAlign: 'center',
          backgroundColor: 'transparent',
          color: 'rgb(185,185,185)',
          fontFamily: 'Roboto-Regular',
          marginTop: 80 * k,
        }}
      >
        {'Please enter a name or\r\nusername!'}
      </Text>
      <Image source={require('../../../images/emptySearchBot.png')} style={{marginTop: 20 * k}} />
    </View>
  );

  render() {
    return (
      <Screen>
        <SearchBar onChangeText={searchStore.setGlobal} value={searchStore.global} autoCorrect={false} autoCapitalize='none' autoFocus />
        {searchStore.globalResult.list.length ? <ProfileList selection={searchStore.globalResult} isDay renderItem={this.renderItem} /> : this.renderEmpty()}
      </Screen>
    );
  }
}

export default observer(SearchUsers);

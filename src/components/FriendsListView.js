// @flow

import React from 'react';
import {StyleSheet, View, Text, SectionList} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {k} from './Global';
import Screen from './Screen';
import model from '../model/model';
import BotButton from './BotButton';
import FriendCard from './FriendCard';
import location from '../store/locationStore';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';
import {colors} from '../constants';
import NoFriendsOverlay from './NoFriendsOverlay';
import SearchBar from './SearchBar';

const SectionHeader = ({section}: {section: Object}) => {
  const {key} = section;
  return (
    <View style={{paddingLeft: 10 * k, paddingVertical: 5 * k, backgroundColor: colors.WHITE}} key={key}>
      <Text style={{fontSize: 12 * k, fontFamily: 'Roboto-Regular', color: colors.WARM_GREY_2}}>
        {key}
      </Text>
    </View>
  );
};

class FriendsListView extends React.Component {
  @observable searchText: string;

  static rightButtonImage = require('../../images/followers.png');

  static rightButtonTintColor = colors.PINK;

  static onRight = () => Actions.searchUsers();

  list: any;

  render() {
    const isDay = location.isDay;
    return (
      <Screen isDay={isDay}>
        <SearchBar
          onChangeText={t => (this.searchText = t)}
          value={this.searchText}
          placeholder='Search name or username'
          placeholderTextColor={'rgb(140,140,140)'}
          autoCorrect={false}
          autoCapitalize='none'
        />
        {!!model.friends.all.length &&
          <View style={styles.countBar}>
            <Text style={{fontSize: 13, fontFamily: 'Roboto-Regular'}}>
              <Text style={{fontSize: 16, fontFamily: 'Roboto-Bold'}}>
                {model.friends.all.length}
              </Text>
              {` ${model.friends.all.length !== 1 ? 'Friends' : 'Friend'}`}
            </Text>
          </View>}
        <SectionList
          style={{backgroundColor: 'white'}}
          ref={r => (this.list = r)}
          removeClippedSubviews={false}
          keyExtractor={(item, index) => `${item.key} ${index}`}
          renderItem={({item}) => <FriendCard isDay={isDay} profile={item} />}
          renderSectionHeader={SectionHeader}
          ListEmptyComponent={<NoFriendsOverlay />}
          SectionSeparatorComponent={() => <View style={{height: k, backgroundColor: colors.WARM_GREY}} />}
          ItemSeparatorComponent={() => <View style={{height: k, marginLeft: 55 * k, backgroundColor: colors.WARM_GREY}} />}
          sections={model.friends.alphaSectionIndex(this.searchText)}
          stickySectionHeadersEnabled
        />
        <BotButton />
      </Screen>
    );
  }
}

export default observer(FriendsListView);

const styles = StyleSheet.create({
  button: {
    right: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8 * k,
    marginBottom: 8 * k,
    height: 40 * k,
    backgroundColor: colors.DARK_GREY,
    shadowOpacity: 0.12,
    shadowRadius: 5,
    shadowOffset: {height: 1, width: 0},
  },
  newButton: {
    right: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8 * k,
    marginBottom: 8 * k,
    height: 66 * k,
    backgroundColor: 'rgba(254,92,108,0.9)',
    shadowOpacity: 0.12,
    shadowRadius: 5,
    shadowOffset: {height: 1, width: 0},
  },
  text: {
    color: 'white',
    letterSpacing: 0.7,
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
  },
  italicText: {
    color: 'white',
    letterSpacing: 0.7,
    fontSize: 15,
    fontFamily: 'Roboto-Italic',
    textAlign: 'center',
  },
  cardInner: {
    shadowOffset: {height: 0, width: 0},
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  countBar: {
    backgroundColor: '#F1F2F3',
    paddingLeft: 15 * k,
    paddingBottom: 10 * k,
    paddingTop: 20 * k,
    borderTopWidth: 1,
    borderTopColor: colors.WARM_GREY,
    borderBottomWidth: 1,
    borderBottomColor: colors.WARM_GREY,
  },
});

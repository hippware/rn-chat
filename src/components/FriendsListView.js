// @flow

import React from 'react';
import {Image, StyleSheet, View, Text, SectionList, TextInput} from 'react-native';
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

type Props = {};

class FriendsListView extends React.Component {
  props: Props;

  @observable searchText: string;

  static rightButtonImage = require('../../images/followers.png');

  static rightButtonTintColor = colors.PINK;

  static onRight = () => console.warn('TODO: enable search to add friends screen');

  list: any;

  render() {
    const isDay = location.isDay;
    return (
      <Screen isDay={isDay}>
        <View style={styles.searchBar}>
          <Image source={require('../../images/iconFriendsSearch.png')} style={{margin: 5 * k, height: 12 * k}} resizeMode='contain' />
          <TextInput
            style={{width: 200 * k, fontFamily: 'Roboto-Light', fontSize: 14 * k, margin: 5 * k}}
            placeholder='Search name or username'
            placeholderTextColor={'rgb(140,140,140)'}
            onChangeText={t => (this.searchText = t)}
            value={this.searchText}
            autoCorrect={false}
            autoCapitalize='none'
          />
        </View>
        <View style={styles.countBar}>
          <Text style={{fontSize: 13, fontFamily: 'Roboto-Regular'}}>
            <Text style={{fontSize: 16, fontFamily: 'Roboto-Bold'}}>
              {model.friends.all.length}
            </Text>
            {` ${model.friends.all.length !== 1 ? 'Friends' : 'Friend'}`}
          </Text>
        </View>
        <SectionList
          style={{backgroundColor: 'white'}}
          ref={r => (this.list = r)}
          removeClippedSubviews={false}
          keyExtractor={(item, index) => `${item.key} ${index}`}
          renderItem={({item}) => <FriendCard isDay={isDay} profile={item} />}
          renderSectionHeader={SectionHeader}
          ListEmptyComponent={() => (model.friends.all.length ? null : <Text>TODO: #941</Text>)}
          SectionSeparatorComponent={() => <View style={{height: k, backgroundColor: 'rgba(155,155,155,0.15)'}} />}
          ItemSeparatorComponent={() => <View style={{height: 2 * k, marginLeft: 55 * k, backgroundColor: 'rgba(155,155,155,0.15)'}} />}
          sections={model.friends.alphaSectionIndex(this.searchText)}
          stickySectionHeadersEnabled
        />
        <BotButton />
        <NoFriendsOverlay />
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
  searchBar: {
    marginHorizontal: 10 * k,
    marginBottom: 5 * k,
    backgroundColor: colors.LIGHT_GREY,
    borderRadius: 2 * k,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  countBar: {
    // @TODO: change when I get feedback from Alan
    // backgroundColor: colors.WARM_GREY_2,
    // backgroundColor: 'rgb(246,246,246)',
    backgroundColor: '#F6F6F6',
    paddingLeft: 15 * k,
    paddingBottom: 10 * k,
    paddingTop: 20 * k,
    borderTopWidth: 1,
    borderTopColor: 'rgb(172,172,172)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(172,172,172)',
  },
});

// @flow

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {observer, inject} from 'mobx-react/native';
import {observable} from 'mobx';

import {k} from '../Global';
import Screen from '../Screen';
import FriendCard from './FriendCard';
import {colors} from '../../constants';
// NOTE: As long as we default new users to having friends this component is unnecessary
// import NoFriendsOverlay from './NoFriendsOverlay';
import SearchBar from './SearchBar';
import {RText} from '../common';
import PeopleList from './PeopleList';
import {alphaSectionIndex} from '../../utils/friendUtils';

type Props = {};

@inject('wocky')
class FriendListScene extends React.Component<Props> {
  @observable searchText: string;

  static rightButtonImage = require('../../../images/followers.png');

  static rightButtonTintColor = colors.PINK;

  static onRight = () => {
    Actions.searchUsers();
  };

  renderItem = ({item}) => <FriendCard isDay profile={item} />;

  render() {
    return (
      <Screen isDay>
        <SearchBar
          onChangeText={t => (this.searchText = t)}
          value={this.searchText}
          placeholder='Search name or username'
          placeholderTextColor='rgb(140,140,140)'
          autoCorrect={false}
          autoCapitalize='none'
        />
        <FriendCount friends={this.props.wocky.friends} />
        <PeopleList
          renderItem={this.renderItem}
          renderSectionHeader={({section}) => (
            <View style={{paddingLeft: 10 * k, paddingVertical: 5 * k, backgroundColor: colors.WHITE}} key={section.key}>
              <RText size={12} weight='Regular' style={{color: colors.WARM_GREY_2}}>
                {section.key}
              </RText>
            </View>
          )}
          sections={alphaSectionIndex(this.searchText, this.props.wocky.friends.friends)}
        />
      </Screen>
    );
  }
}

const FriendCount = observer(({friends}) =>
  !!friends.friends.length && (
    <View style={styles.headerBar}>
      <RText size={13}>
        <RText size={16} weight='Bold'>
          {friends.friends.length}
        </RText>
        {` ${friends.friends.length !== 1 ? 'Friends' : 'Friend'}`}
      </RText>
    </View>
  ));

export default observer(FriendListScene);

const styles = StyleSheet.create({
  headerBar: {
    backgroundColor: '#F1F2F3',
    paddingHorizontal: 15 * k,
    paddingBottom: 10 * k,
    paddingTop: 20 * k,
    borderTopWidth: 1,
    borderTopColor: colors.WARM_GREY,
    borderBottomWidth: 1,
    borderBottomColor: colors.WARM_GREY,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

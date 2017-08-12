// @flow

import React from 'react';
import {StyleSheet, View, Text, SectionList, TouchableOpacity, Alert} from 'react-native';
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
import ProfileItem from './ProfileItem';
import Profile from '../model/Profile';
import friendStore from '../store/friendStore';

type Props = {
  peopleType: 'friends' | 'followers' | 'following',
  isOwn: boolean,
};

class PeopleListView extends React.Component {
  @observable searchText: string;
  props: Props;
  // list: any;

  static rightButtonImage = require('../../images/followers.png');

  static rightButtonTintColor = colors.PINK;

  static onRight = () => Actions.searchUsers();

  onSearchTextChange = t => (this.searchText = t);

  render() {
    const isDay = location.isDay;
    const isFriends = this.props.peopleType === 'friends';
    const isFollowers = this.props.peopleType === 'followers';
    const isFollowing = this.props.peopleType === 'following';
    // console.log('& peoplelist', model.friends.list.length, isFriends, isFollowers);

    return (
      <Screen isDay={isDay}>
        {isFriends &&
          <SearchBar
            onChangeText={this.onSearchTextChange}
            value={this.searchText}
            placeholder='Search name or username'
            placeholderTextColor={'rgb(140,140,140)'}
            autoCorrect={false}
            autoCapitalize='none'
          />}
        {isFriends && <FriendCount />}
        {isFollowers && <FollowersList filter={this.searchText} onSearchTextChange={this.onSearchTextChange} isOwn={this.props.isOwn} />}
        {isFriends && <FriendList filter={this.searchText} />}
        {isFollowing && <FollowingList filter={this.searchText} onSearchTextChange={this.onSearchTextChange} />}
        <BotButton />
      </Screen>
    );
  }
}

const FriendList = observer(({filter}) =>
  (<PeopleList
    renderItem={({item}) => <FriendCard isDay={location.isDay} profile={item} />}
    renderSectionHeader={({section}) =>
      (<View style={{paddingLeft: 10 * k, paddingVertical: 5 * k, backgroundColor: colors.WHITE}} key={section.key}>
        <Text style={{fontSize: 12 * k, fontFamily: 'Roboto-Regular', color: colors.WARM_GREY_2}}>
          {section.key}
        </Text>
      </View>)}
    ListEmptyComponent={<NoFriendsOverlay />}
    sections={model.friends.alphaSectionIndex(filter)}
  />),
);

const FollowersList = observer(({onSearchTextChange, filter, isOwn}) =>
  (<PeopleList
    renderItem={({item}) =>
      (<TouchableOpacity onPress={() => toggleFriend(item)}>
        <ProfileItem isDay profile={item} selected={item && item.isFollowed} showFollowButtons />
      </TouchableOpacity>)}
    renderSectionHeader={({section}) =>
      (section.key === 'new'
        ? <View style={styles.headerBar} key={section.key}>
          <Text style={{fontSize: 13 * k, fontFamily: 'Roboto-Regular'}}>
            <Text style={{fontSize: 16, fontFamily: 'Roboto-Bold', color: colors.PINK}}>
              {model.friends.newFollowers.length}
            </Text>
            {' New Followers'}
          </Text>
          <TouchableOpacity
            onPress={() => {
              section.data.length && friendStore.addAll(section.data);
            }}
          >
            <Text style={{color: colors.PINK}}>Follow All</Text>
          </TouchableOpacity>
        </View>
        : <View style={styles.headerBar} key={section.key}>
          <Text style={{fontSize: 13 * k, fontFamily: 'Roboto-Regular'}}>
            <Text style={{fontSize: 16, fontFamily: 'Roboto-Bold'}}>
              {model.friends.followers.length}
            </Text>
            {' Followers'}
          </Text>
        </View>)}
    ListHeaderComponent={
      <SearchBar
        onChangeText={onSearchTextChange}
        value={filter}
        placeholder='Search name or username'
        placeholderTextColor={'rgb(140,140,140)'}
        autoCorrect={false}
        autoCapitalize='none'
      />
    }
    ListEmptyComponent={<NoFriendsOverlay />}
    sections={model.friends.followersSectionIndex(filter, isOwn)}
  />),
);

const FollowingList = observer(({filter, onSearchTextChange}) =>
  (<PeopleList
    ListHeaderComponent={
      <SearchBar
        onChangeText={onSearchTextChange}
        value={filter}
        placeholder='Search name or username'
        placeholderTextColor={'rgb(140,140,140)'}
        autoCorrect={false}
        autoCapitalize='none'
      />
    }
    renderItem={({item}) =>
      (<TouchableOpacity onPress={() => toggleFriend(item)}>
        <ProfileItem isDay profile={item} selected={item && item.isFollowed} showFollowButtons />
      </TouchableOpacity>)}
    renderSectionHeader={() =>
      (<View style={styles.headerBar}>
        <Text style={{fontSize: 13 * k, fontFamily: 'Roboto-Regular'}}>
          <Text style={{fontSize: 16, fontFamily: 'Roboto-Bold'}}>
            {model.friends.following.length}
          </Text>
          {' Following'}
        </Text>
      </View>)}
    sections={model.friends.followingSectionIndex(filter)}
  />),
);

const PeopleList = observer(props =>
  (<SectionList
    style={{backgroundColor: 'white'}}
    removeClippedSubviews={false}
    keyExtractor={item => item.user}
    SectionSeparatorComponent={() => <View style={{height: k, backgroundColor: colors.WARM_GREY}} />}
    ItemSeparatorComponent={() => <View style={{height: k, marginLeft: 55 * k, backgroundColor: colors.WARM_GREY}} />}
    stickySectionHeadersEnabled
    {...props}
  />),
);

// @TODO: DRY (SearchUsers)
const toggleFriend = (profile: Profile) => {
  if (profile.isFollowed) {
    Alert.alert(null, 'Are you sure you want to unfollow?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Unfollow',
        style: 'destructive',
        onPress: () => {
          friendStore.unfollow(profile);
        },
      },
    ]);
  } else {
    friendStore.add(profile);
  }
};

const FriendCount = observer(
  () =>
    !!model.friends.all.length &&
    <View style={styles.headerBar}>
      <Text style={{fontSize: 13, fontFamily: 'Roboto-Regular'}}>
        <Text style={{fontSize: 16, fontFamily: 'Roboto-Bold'}}>
          {model.friends.all.length}
        </Text>
        {` ${model.friends.all.length !== 1 ? 'Friends' : 'Friend'}`}
      </Text>
    </View>,
);

export default observer(PeopleListView);

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

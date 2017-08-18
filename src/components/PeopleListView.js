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
import FriendList from '../model/FriendList';
import friendStore from '../store/friendStore';
import profileStore from '../store/profileStore';

type Props = {
  peopleType: 'friends' | 'follower' | 'following',
  userId?: string,
};

class PeopleListView extends React.Component {
  @observable searchText: string;
  @observable profileList: FriendList = new FriendList();
  @observable profile: Profile;
  props: Props;

  static rightButtonImage = require('../../images/followers.png');

  static rightButtonTintColor = colors.PINK;

  static onRight = () => Actions.searchUsers();

  async componentDidMount() {
    const {userId, peopleType} = this.props;
    this.profile = userId ? profileStore.create(this.props.userId, null, true) : model.profile;
    userId && ['follower', 'following'].includes(peopleType) && (await friendStore.requestRelations(this.profileList, userId, peopleType));
  }

  onSearchTextChange = t => (this.searchText = t);

  render() {
    const {peopleType} = this.props;
    const isDay = location.isDay;
    const isFriends = peopleType === 'friends';
    const isFollowers = peopleType === 'follower';
    const isFollowing = peopleType === 'following';

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
        {isFriends && <FriendListComponent filter={this.searchText} profile={this.profile} />}
        {isFollowers && <FollowersList filter={this.searchText} onSearchTextChange={this.onSearchTextChange} profile={this.profile} list={this.profileList} />}
        {isFollowing && <FollowingList filter={this.searchText} onSearchTextChange={this.onSearchTextChange} profile={this.profile} list={this.profileList} />}
      </Screen>
    );
  }
}

const FriendListComponent = observer(({filter}) =>
  (<PeopleList
    renderItem={({item}) => <FriendCard isDay={location.isDay} profile={item} />}
    renderSectionHeader={({section}) =>
      (<View style={{paddingLeft: 10 * k, paddingVertical: 5 * k, backgroundColor: colors.WHITE}} key={section.key}>
        <Text style={{fontSize: 12 * k, fontFamily: 'Roboto-Regular', color: colors.WARM_GREY_2}}>
          {section.key}
        </Text>
      </View>)}
    ListEmptyComponent={<NoFriendsOverlay />}
    sections={friendStore.alphaSectionIndex(filter, model.friends.all)}
  />),
);

const FollowersList = observer(({onSearchTextChange, filter, profile, list}) => {
  if (!profile) return null;
  const followers = profile.isOwn ? model.friends.followers : list.list;
  const newFollowers = profile.isOwn ? model.friends.newFollowers : [];
  return (
    <PeopleList
      renderItem={({item}) =>
        (<TouchableOpacity onPress={() => Actions.profileDetails({item: profile.user})}>
          <ProfileItem isDay profile={item} selected={item && item.isFollowed} showFollowButtons />
        </TouchableOpacity>)}
      renderSectionHeader={({section}) => {
        return section.key === 'new'
          ? <View style={styles.headerBar} key={section.key}>
            <Text style={{fontSize: 13 * k, fontFamily: 'Roboto-Regular'}}>
              <Text style={{fontSize: 16, fontFamily: 'Roboto-Bold', color: colors.PINK}}>
                {section.data.length}
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
                {section.data.length}
              </Text>
              {' Followers'}
            </Text>
          </View>;
      }}
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
      sections={friendStore.followersSectionIndex(filter, followers, newFollowers)}
    />
  );
});

const FollowingList = observer(({filter, onSearchTextChange, profile, list}) => {
  if (!profile) return null;
  const following = profile.isOwn ? model.friends.following : list.list;
  return (
    <PeopleList
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
        (<TouchableOpacity onPress={() => Actions.profileDetails({item})}>
          <ProfileItem isDay profile={item} selected={item && item.isFollowed} showFollowButtons />
        </TouchableOpacity>)}
      renderSectionHeader={({section}) =>
        (<View style={styles.headerBar}>
          <Text style={{fontSize: 13 * k, fontFamily: 'Roboto-Regular'}}>
            <Text style={{fontSize: 16, fontFamily: 'Roboto-Bold'}}>
              {section.data.length}
            </Text>
            {' Following'}
          </Text>
        </View>)}
      sections={friendStore.followingSectionIndex(filter, following)}
    />
  );
});

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

// @flow

import React from 'react';
import {StyleSheet, View, Text, SectionList, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {k} from './Global';
import Screen from './Screen';
import model from '../model/model';
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
  userId?: string,
};

class PeopleListScene extends React.Component {
  @observable searchText: string;
  @observable profileList: FriendList = new FriendList();
  @observable profile: Profile;
  props: Props;

  static rightButtonImage = require('../../images/followers.png');

  static rightButtonTintColor = colors.PINK;

  static onRight = () => {
    Actions.searchUsers();
  };

  onSearchTextChange = t => (this.searchText = t);
}

@observer
class FriendListScene extends PeopleListScene {
  componentWillMount() {
    this.profile = model.profile;
  }

  render() {
    return (
      <Screen isDay={location.isDay}>
        <SearchBar
          onChangeText={this.onSearchTextChange}
          value={this.searchText}
          placeholder='Search name or username'
          placeholderTextColor={'rgb(140,140,140)'}
          autoCorrect={false}
          autoCapitalize='none'
        />
        <FriendCount />
        <PeopleList
          renderItem={({item}) => <FriendCard isDay={location.isDay} profile={item} />}
          renderSectionHeader={({section}) =>
            (<View style={{paddingLeft: 10 * k, paddingVertical: 5 * k, backgroundColor: colors.WHITE}} key={section.key}>
              <Text style={{fontSize: 12 * k, fontFamily: 'Roboto-Regular', color: colors.WARM_GREY_2}}>
                {section.key}
              </Text>
            </View>)}
          ListEmptyComponent={<NoFriendsOverlay />}
          sections={friendStore.alphaSectionIndex(this.searchText, model.friends.friends)}
        />
      </Screen>
    );
  }
}

const FriendCount = observer(
  () =>
    !!model.friends.friends.length &&
    <View style={styles.headerBar}>
      <Text style={{fontSize: 13, fontFamily: 'Roboto-Regular'}}>
        <Text style={{fontSize: 16, fontFamily: 'Roboto-Bold'}}>
          {model.friends.friends.length}
        </Text>
        {` ${model.friends.friends.length !== 1 ? 'Friends' : 'Friend'}`}
      </Text>
    </View>,
);

@observer
class FollowersList extends PeopleListScene {
  componentDidMount() {
    this.profile = profileStore.create(this.props.userId, null, true);
    friendStore.requestRelations(this.profileList, this.props.userId, 'follower');
  }

  render() {
    if (!this.profile) return null;
    const followers = this.profile.isOwn ? model.friends.followers : this.profileList.list;
    const newFollowers = this.profile.isOwn ? model.friends.newFollowers : [];
    return (
      <Screen isDay={location.isDay}>
        <PeopleList
          renderItem={({item}) =>
            (<TouchableOpacity onPress={() => Actions.profileDetails({item: item.user})}>
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
              onChangeText={this.onSearchTextChange}
              value={this.searchText}
              placeholder='Search name or username'
              placeholderTextColor={'rgb(140,140,140)'}
              autoCorrect={false}
              autoCapitalize='none'
            />
          }
          sections={friendStore.followersSectionIndex(this.searchText, followers, newFollowers)}
        />
      </Screen>
    );
  }
}

@observer
class FollowingList extends PeopleListScene {
  componentDidMount() {
    this.profile = profileStore.create(this.props.userId, null, true);
    friendStore.requestRelations(this.profileList, this.props.userId, 'following');
  }

  render() {
    if (!this.profile) return null;
    const following = this.profile.isOwn ? model.friends.following : this.profileList.list;
    return (
      <Screen>
        <PeopleList
          ListHeaderComponent={
            <SearchBar
              onChangeText={this.onSearchTextChange}
              value={this.searchText}
              placeholder='Search name or username'
              placeholderTextColor={'rgb(140,140,140)'}
              autoCorrect={false}
              autoCapitalize='none'
            />
          }
          renderItem={({item}) =>
            (<TouchableOpacity onPress={() => Actions.profileDetails({item: item.user})}>
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
          sections={friendStore.followingSectionIndex(this.searchText, following)}
        />
      </Screen>
    );
  }
}

const PeopleList = props =>
  (<SectionList
    style={{backgroundColor: 'white'}}
    removeClippedSubviews={false}
    keyExtractor={item => item.user}
    SectionSeparatorComponent={() => <View style={{height: k, backgroundColor: colors.WARM_GREY}} />}
    ItemSeparatorComponent={() => <View style={{height: k, marginLeft: 55 * k, backgroundColor: colors.WARM_GREY}} />}
    stickySectionHeadersEnabled
    {...props}
  />);

export {FriendListScene, FollowersList, FollowingList};

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

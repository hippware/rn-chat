// @flow

import React from 'react';
import {Alert, TouchableOpacity, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Screen from '../Screen';
import model from '../../model/model';
import location from '../../store/locationStore';
import {observer, Observer} from 'mobx-react/native';
import {observable} from 'mobx';
import {colors} from '../../constants';
import SearchBar from '../SearchBar';
import ProfileItem from '../ProfileItem';
import Profile from '../../model/Profile';
import FriendList from '../../model/FriendList';
import friendStore from '../../store/friendStore';
import profileStore from '../../store/profileStore';
import {RText} from '../common';
import PeopleList from './PeopleList';
import SectionHeader from './SectionHeader';
import {k} from '../Global';

type Props = {
  userId: string,
};

class FollowersList extends React.Component {
  @observable searchText: string;
  @observable profileList: FriendList = new FriendList();
  @observable profile: Profile;
  props: Props;

  static rightButtonImage = require('../../../images/followers.png');

  static rightButtonTintColor = colors.PINK;

  static onRight = () => {
    Actions.searchUsers();
  };

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
              <Observer>
                {() =>
                  (<ProfileItem isDay profile={item} selected={item && item.isFollowed}>
                    {!item.isOwn && (item.isFollowed ? <FollowingButton profile={item} /> : <FollowButton profile={item} />)}
                  </ProfileItem>)}
              </Observer>
            </TouchableOpacity>)}
          renderSectionHeader={({section}) => {
            return section.key === 'new'
              ? <SectionHeader section={section} title='New Followers'>
                <TouchableOpacity
                  onPress={() => {
                    section.data.length && friendStore.addAll(section.data);
                  }}
                >
                  <RText style={{color: colors.PINK}}>Follow All</RText>
                </TouchableOpacity>
              </SectionHeader>
              : <SectionHeader section={section} title='Followers' />;
          }}
          ListHeaderComponent={
            <SearchBar
              onChangeText={t => (this.searchText = t)}
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

const FollowButton = ({profile}) =>
  (<TouchableOpacity style={[styles.button, styles.follow]} onPress={() => friendStore.add(profile)}>
    <RText size={10} color={colors.DARK_GREY}>
      FOLLOW
    </RText>
  </TouchableOpacity>);

const FollowingButton = ({profile}) =>
  (<TouchableOpacity style={[styles.button, styles.following]} onPress={() => unfollow(profile)}>
    <RText size={10} color={colors.WHITE}>
      FOLLOWING
    </RText>
  </TouchableOpacity>);

const unfollow = (profile: Profile) => {
  Alert.alert(null, `Are you sure you want to unfollow @${profile.handle}?`, [
    {text: 'Cancel', style: 'cancel'},
    {
      text: 'Unfollow',
      style: 'destructive',
      onPress: () => {
        friendStore.unfollow(profile);
      },
    },
  ]);
};

export default observer(FollowersList);

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10 * k,
    marginRight: 10 * k,
    width: 100 * k,
    alignItems: 'center',
    borderRadius: 2 * k,
  },
  follow: {
    backgroundColor: colors.WHITE,
    borderColor: colors.DARK_GREY,
    borderWidth: 1,
  },
  following: {
    backgroundColor: colors.PINK,
  },
});

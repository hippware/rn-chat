// @flow

import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Screen from '../Screen';
import {observer, inject} from 'mobx-react/native';
import {observable} from 'mobx';
import {colors} from '../../constants';
import SearchBar from './SearchBar';
import {RText} from '../common';
import PeopleList from './PeopleList';
import SectionHeader from './SectionHeader';
import {FollowableProfileItem} from './customProfileItems';
import {followersSectionIndex} from '../../utils/friendUtils';
import ListFooter from '../ListFooter';
import {Profile} from 'wocky-client';

type Props = {
  userId: string,
};

@inject('wocky')
@observer
class FollowersList extends React.Component<Props> {
  @observable searchText: string;
  @observable profile: Profile;

  static rightButtonImage = require('../../../images/followers.png');

  static rightButtonTintColor = colors.PINK;

  static onRight = () => {
    Actions.searchUsers();
  };

  componentDidMount() {
    this.getList();
  }

  async getList() {
    // TODO: If we request an invalid profile id or one that doesn't yet exist in the list (new user) this code would (mistakenly) set this.profile to own profile
    this.profile = (await this.props.wocky.getProfile(this.props.userId)) || this.props.wocky.profile;
    await this.profile.followers.load();
  }

  render() {
    if (!this.profile) return null;
    const followers = this.profile.followers.list;
    const newFollowers = []; // TODO new followers this.profile.isOwn ? model.friends.newFollowers : [];
    const followersCount = this.profile.followersSize;
    const {connected} = this.props.wocky;
    const {finished, loading} = this.profile.followers;
    return (
      <Screen>
        <PeopleList
          renderItem={({item}) => <FollowableProfileItem profile={item} />}
          ListFooterComponent={connected && loading ? <ListFooter finished={finished} /> : null}
          renderSectionHeader={({section}) => {
            return section.key === 'new' ? (
              <SectionHeader section={section} title='New Followers' count={section.data.length}>
                <TouchableOpacity
                  onPress={() => {
                    // TODO: friendStore. section.data.length && friendStore.addAll(section.data);
                  }}
                >
                  <RText style={{color: colors.PINK}}>Follow All</RText>
                </TouchableOpacity>
              </SectionHeader>
            ) : (
              <SectionHeader section={section} title='Followers' count={followersCount} />
            );
          }}
          ListHeaderComponent={
            <SearchBar
              onChangeText={t => (this.searchText = t)}
              value={this.searchText}
              placeholder='Search name or username'
              placeholderTextColor='rgb(140,140,140)'
              autoCorrect={false}
              autoCapitalize='none'
            />
          }
          sections={followersSectionIndex(this.searchText, followers, newFollowers)}
          loadMore={this.profile.followers.load}
        />
      </Screen>
    );
  }
}

export default FollowersList;

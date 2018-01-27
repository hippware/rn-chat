// @flow

import React from 'react';
import {Actions} from 'react-native-router-flux';
import Screen from '../Screen';
import {observer, inject} from 'mobx-react/native';
import {observable} from 'mobx';
import {colors} from '../../constants';
import SearchBar from './SearchBar';
import {Profile} from 'wocky-client';
import PeopleList from './PeopleList';
import SectionHeader from './SectionHeader';
import {FollowableProfileItem} from './customProfileItems';
import {followingSectionIndex} from '../../utils/friendUtils';
import ListFooter from '../ListFooter';

type Props = {
  userId: string,
};

@inject('wocky')
@observer
class FollowingList extends React.Component<Props> {
  @observable searchText: string;
  @observable profile: Profile;

  static rightButtonImage = require('../../../images/followers.png');

  static rightButtonTintColor = colors.PINK;

  static onRight = () => {
    Actions.searchUsers();
  };

  componentDidMount() {
    this.profile = this.props.wocky.loadProfile(this.props.userId);
    if (this.profile.isOwn) return;
    this.props.wocky.loadRelations(this.profile.id, 'following');
  }

  render() {
    const {wocky} = this.props;
    if (!this.profile) return null;
    // const following = this.profile.isOwn ? wocky.following : this.profileList.alphaByHandleList;
    const {following} = wocky;
    const followedCount = this.profile.isOwn ? wocky.following.length : this.profile.followedSize;
    const {connected} = wocky;
    const {loading, finished} = following;
    return (
      <Screen>
        <PeopleList
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
          ListFooterComponent={connected && loading ? <ListFooter finished={finished} /> : null}
          renderItem={({item}) => <FollowableProfileItem profile={item} />}
          renderSectionHeader={({section}) => <SectionHeader section={section} title='Following' count={followedCount} />}
          sections={followingSectionIndex(this.searchText, following)}
          loadMore={this.loadFollowing}
        />
      </Screen>
    );
  }
}

export default observer(FollowingList);

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
class FollowedList extends React.Component<Props> {
  @observable searchText: string;
  @observable profile: Profile;

  static rightButtonImage = require('../../../images/followers.png');

  static rightButtonTintColor = colors.PINK;

  static onRight = () => {
    Actions.searchUsers();
  };

  async componentDidMount() {
    this.profile = await this.props.wocky.getProfile(this.props.userId);
    if (!this.profile) {
      console.error(`Cannot load profile for user:${this.props.userId}`);
    }
    await this.profile.followed.load();
  }

  render() {
    const {wocky} = this.props;
    if (!this.profile) return null;
    const following = this.profile.isOwn ? this.props.wocky.followed : this.profile.followed.list;
    const followedCount = this.profile.isOwn ? wocky.followed.length : this.profile.followedSize;
    const {connected} = wocky;
    const {finished, loading} = this.profile.isOwn ? {finished: true, loading: false} : this.profile.followed;
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
          loadMore={this.profile.followed.load}
        />
      </Screen>
    );
  }
}

export default FollowedList;

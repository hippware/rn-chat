// @flow

import React from 'react';
import {TouchableOpacity} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import {observable} from 'mobx';
import {colors} from '../../constants';
import {RText} from '../common';
import PeopleList from './PeopleList';
import SectionHeader from './SectionHeader';
import {FollowableProfileItem} from './customProfileItems';
import {followersSectionIndex} from '../../utils/friendUtils';
import ListFooter from '../ListFooter';
import {Profile} from 'wocky-client';
import PeopleSearchWrapper from './PeopleSearchWrapper';
import InviteFriendsRow from './InviteFriendsRow';

type Props = {
  userId: string,
};

@inject('wocky')
@observer
class FollowersList extends React.Component<Props> {
  @observable profile: Profile;

  componentDidMount() {
    this.getList();
  }

  async getList() {
    this.profile = this.props.userId ? await this.props.wocky.getProfile(this.props.userId) : this.props.wocky.profile;
    if (!this.profile) {
      console.error(`Cannot load profile for user:${this.props.userId}`);
    }
    await this.profile.followers.load();
  }

  render() {
    if (!this.profile) return null;
    const followers = this.profile.isOwn ? this.props.wocky.followers : this.profile.followers.list;
    const newFollowers = this.profile.isOwn ? this.props.wocky.newFollowers : [];
    const followersCount = this.profile.followersSize;
    const {connected, profile} = this.props.wocky;
    const {finished, loading} = this.profile.isOwn ? {finished: true, loading: false} : this.profile.followers;
    return (
      <PeopleSearchWrapper>
        <PeopleList
          ListHeaderComponent={<InviteFriendsRow />}
          ListFooterComponent={connected && loading ? <ListFooter finished={finished} /> : null}
          renderItem={({item}) => <FollowableProfileItem profile={item} />}
          renderSectionHeader={({section}) => {
            return section.key === 'new' ? (
              <SectionHeader section={section} title='New Followers' count={section.data.length}>
                <TouchableOpacity
                  onPress={() => {
                    // TODO: batch follow in wocky-client?
                    section.data.length && section.data.forEach(profile => profile.follow());
                  }}
                >
                  <RText style={{color: colors.PINK}}>Follow All</RText>
                </TouchableOpacity>
              </SectionHeader>
            ) : (
              <SectionHeader section={section} title='Followers' count={followersCount} />
            );
          }}
          sections={followersSectionIndex(this.searchText, followers, newFollowers)}
          loadMore={this.profile.followers.load}
        />
      </PeopleSearchWrapper>
    );
  }
}

export default FollowersList;

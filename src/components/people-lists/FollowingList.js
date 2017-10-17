// @flow

import React from 'react';
import {Actions} from 'react-native-router-flux';
import Screen from '../Screen';
import model from '../../model/model';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';
import {colors} from '../../constants';
import SearchBar from './SearchBar';
import Profile from '../../model/Profile';
import FriendList from '../../model/FriendList';
import friendStore from '../../store/friendStore';
import profileStore from '../../store/profileStore';
import PeopleList from './PeopleList';
import SectionHeader from './SectionHeader';
import {FollowableProfileItem} from './customProfileItems';

type Props = {
  userId: string,
};

@observer
class FollowingList extends React.Component {
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
              onChangeText={t => (this.searchText = t)}
              value={this.searchText}
              placeholder='Search name or username'
              placeholderTextColor={'rgb(140,140,140)'}
              autoCorrect={false}
              autoCapitalize='none'
            />
          }
          renderItem={({item}) => <FollowableProfileItem profile={item} />}
          renderSectionHeader={({section}) => <SectionHeader section={section} title='Following' />}
          sections={friendStore.followingSectionIndex(this.searchText, following)}
        />
      </Screen>
    );
  }
}

export default observer(FollowingList);

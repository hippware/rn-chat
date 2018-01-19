// @flow

import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Screen from '../Screen';
import {observer, inject} from 'mobx-react/native';
import {observable} from 'mobx';
import {colors} from '../../constants';
// import SearchBar from './SearchBar';
// import {RText} from '../common';
// import PeopleList from './PeopleList';
// import SectionHeader from './SectionHeader';
// import {FollowableProfileItem} from './customProfileItems';
// import {followersSectionIndex} from '../../utils/friendUtils';
// import ListFooter from '../ListFooter';
import {Profile} from 'wocky-client';

type Props = {
  userId: string,
};

@inject('wocky')
@observer
class FollowersList extends React.Component<Props> {
  @observable searchText: string;
  // @observable profileList: FriendList = new FriendList();
  @observable profile: Profile;

  static rightButtonImage = require('../../../images/followers.png');

  static rightButtonTintColor = colors.PINK;

  static onRight = () => {
    Actions.searchUsers();
  };

  componentDidMount() {
    // this.profile = profileStore.create(this.props.userId, null, true) || model.profile;
    this.profile = this.props.wocky.getProfile(this.props.userId) || this.props.wocky.profile;
    console.log('followers', this.profile.followers);
    // this.loadFollowers();
  }

  // loadFollowers = async () => {
  //   if (this.profile.isOwn) return;
  //   await friendStore.requestRelations(this.profileList, this.props.userId, 'follower');
  // };

  render() {
    //   if (!this.profile) return null;
    //   const followers = this.profile.isOwn ? model.friends.followers : this.profileList.alphaByHandleList;
    //   const newFollowers = this.profile.isOwn ? model.friends.newFollowers : [];
    //   const followersCount = this.profile.isOwn ? model.friends.followers.length : this.profile.followersSize;
    //   const {connected} = model;
    //   const finished = this.profile.isOwn || this.profileList.finished;
    //   const loading = this.profile.isOwn || this.profileList.loading;
    //   return (
    //     <Screen isDay={location.isDay}>
    //       <PeopleList
    //         renderItem={({item}) => <FollowableProfileItem profile={item} />}
    //         ListFooterComponent={connected && loading ? <ListFooter finished={finished} /> : null}
    //         renderSectionHeader={({section}) => {
    //           return section.key === 'new' ? (
    //             <SectionHeader section={section} title='New Followers' count={section.data.length}>
    //               <TouchableOpacity
    //                 onPress={() => {
    //                   section.data.length && friendStore.addAll(section.data);
    //                 }}
    //               >
    //                 <RText style={{color: colors.PINK}}>Follow All</RText>
    //               </TouchableOpacity>
    //             </SectionHeader>
    //           ) : (
    //             <SectionHeader section={section} title='Followers' count={followersCount} />
    //           );
    //         }}
    //         ListHeaderComponent={
    //           <SearchBar
    //             onChangeText={t => (this.searchText = t)}
    //             value={this.searchText}
    //             placeholder='Search name or username'
    //             placeholderTextColor='rgb(140,140,140)'
    //             autoCorrect={false}
    //             autoCapitalize='none'
    //           />
    //         }
    //         sections={followersSectionIndex(this.searchText, followers, newFollowers)}
    //         loadMore={this.loadFollowers}
    //       />
    //     </Screen>
    //   );
    return null;
  }
}

export default FollowersList;

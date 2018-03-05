// @flow

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer, inject} from 'mobx-react/native';

import {k} from '../Global';
import FriendCard from './FriendCard';
import {colors} from '../../constants';
import {RText} from '../common';
import PeopleList from './PeopleList';
import {alphaSectionIndex} from '../../utils/friendUtils';
import PeopleSearchWrapper from './PeopleSearchWrapper';
import InviteFriendsRow from './InviteFriendsRow';

type Props = {};

@inject('wocky')
@observer
class FriendListScene extends React.Component<Props> {
  renderItem = ({item}) => <FriendCard isDay profile={item} />;

  render() {
    const {friends, profile} = this.props.wocky;
    const onlineFriends = friends.filter(f => f.status === 'available');
    return (
      <PeopleSearchWrapper>
        <PeopleList
          ListHeaderComponent={
            <View>
              <InviteFriendsRow />
              {onlineFriends.length > 0 ? (
                <View>
                  <FriendCount count={onlineFriends.length} suffix='Online' />
                  <PeopleList renderItem={this.renderItem} sections={alphaSectionIndex(this.searchText, onlineFriends)} loadMore={() => {}} />
                </View>
              ) : null}
              <FriendCount count={friends.length} suffix={friends.length === 1 ? 'Friend' : 'Friends'} />
            </View>
          }
          renderItem={this.renderItem}
          renderSectionHeader={({section}) => (
            <View style={{paddingLeft: 10 * k, paddingVertical: 5 * k, backgroundColor: colors.WHITE}} key={section.key}>
              <RText size={12} weight='Regular' style={{color: colors.WARM_GREY_2}}>
                {section.key}
              </RText>
            </View>
          )}
          sections={alphaSectionIndex(this.searchText, this.props.wocky.friends)}
          loadMore={() => {}}
        />
      </PeopleSearchWrapper>
    );
  }
}

const FriendCount = ({count, suffix}) =>
  (count > 0 ? (
    <View style={styles.friendCount}>
      <RText size={13}>
        <RText size={16} weight='Bold'>
          {count}
        </RText>
        {` ${suffix}`}
      </RText>
    </View>
  ) : null);

export default FriendListScene;

const styles = StyleSheet.create({
  friendCount: {
    backgroundColor: '#F1F2F3',
    paddingHorizontal: 15 * k,
    paddingBottom: 10 * k,
    paddingTop: 10 * k,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.DARK_GREY,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.DARK_GREY,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

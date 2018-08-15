import React from 'react'
import {StyleSheet, View} from 'react-native'
import {observer, inject} from 'mobx-react/native'

import {k} from '../Global'
import FriendCard from './FriendCard'
import {colors} from '../../constants'
import {RText, DraggablePopupList} from '../common'
import InviteFriendsRow from './InviteFriendsRow'

type Props = {
  wocky: any
}

@inject('wocky')
@observer
class FriendListScene extends React.Component<Props> {
  searchText: any

  renderItem = ({item}) => <FriendCard profile={item} />

  render() {
    const {friends} = this.props.wocky
    return (
      <DraggablePopupList
        headerInner={
          <View>
            <InviteFriendsRow />
            <FriendCount
              count={friends.length}
              suffix={friends.length === 1 ? 'Friend' : 'Friends'}
            />
          </View>
        }
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
        data={this.props.wocky.friends}
      />
      // </PeopleSearchWrapper>
    )
  }
}

const FriendCount = ({count, suffix}) =>
  count > 0 ? (
    <View style={styles.friendCount}>
      <RText size={13}>
        <RText size={16} weight="Bold">
          {count}
        </RText>
        {` ${suffix}`}
      </RText>
    </View>
  ) : null

export default FriendListScene

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
})

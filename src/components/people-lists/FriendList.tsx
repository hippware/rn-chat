import React from 'react'
import {View, TouchableOpacity, Image} from 'react-native'
import {observer, inject} from 'mobx-react/native'

import {k} from '../Global'
import FriendCard from './FriendCard'
import {colors} from '../../constants'
import {RText} from '../common'
import DraggablePopupList from '../common/DraggablePopupList'
import InviteFriendsRowNew from './InviteFriendsRowNew'
import {IWocky} from 'wocky-client'
import {Actions} from 'react-native-router-flux'

type Props = {
  wocky?: IWocky
}

const searchIcon = require('../../../images/search.png')

@inject('wocky')
@observer
class FriendList extends React.Component<Props> {
  list: any

  renderItem = ({item}) => <FriendCard profile={item} />

  render() {
    const {wocky: {friends}} = this.props
    return (
      <DraggablePopupList
        headerInner={this.renderHeader()}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
        fadeNavConfig={{
          back: true,
          title: (
            <RText size={16} color={colors.DARK_PURPLE}>
              Friends
            </RText>
          ),
        }}
        data={friends}
        keyboardShouldPersistTaps="handled"
        // keyboardDismissMode="interactive"
      />
    )
  }

  renderHeader = () => {
    const {wocky} = this.props
    return (
      <View style={{width: 300 * k, alignSelf: 'center'}}>
        <InviteFriendsRowNew />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-between',
          }}
        >
          <FriendCount count={wocky.friends.length} />
          <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={Actions.friendSearch}>
            <Image source={searchIcon} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const FriendCount = ({count}) =>
  count > 0 ? (
    <RText size={16} weight="Bold">
      {count}
      {` ${count === 1 ? 'Friend' : 'Friends'}`}
    </RText>
  ) : null

export default FriendList

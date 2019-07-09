import React from 'react'
import {View, TouchableOpacity, Image} from 'react-native'
import {observer, inject} from 'mobx-react/native'

import FriendCard from './FriendCard'
import {colors} from '../../constants'
import {RText} from '../common'
import DraggablePopupList from '../common/DraggablePopupList'
import InviteFriendsRowNew from './InviteFriendsRowNew'
import {IWocky} from 'wocky-client'
import {Actions} from 'react-native-router-flux'
import {placeholderStyle} from '../styles'

type Props = {
  wocky?: IWocky
  isActive: boolean
}

const searchIcon = require('../../../images/search.png')

@inject('wocky')
@observer
class FriendList extends React.Component<Props> {
  static navigationOptions = {
    fadeNavConfig: {
      back: true,
      title: (
        <RText size={16} color={colors.DARK_PURPLE}>
          Friends
        </RText>
      ),
    },
  }
  list: any

  renderItem = ({item}) => <FriendCard profile={item.user} />

  render() {
    // Sometimes wocky.profile is null. Race condition?
    return (
      <DraggablePopupList
        headerInner={this.props.wocky!.profile ? this.renderHeader() : undefined}
        renderItem={this.renderItem}
        keyExtractor={item => item.user.id}
        data={this.props.wocky!.profile ? this.props.wocky!.profile!.friends.list.slice() : []}
        keyboardShouldPersistTaps="handled"
        isActive={this.props.isActive}
        // keyboardDismissMode="interactive"
      />
    )
  }

  renderHeader = () => {
    const {wocky} = this.props
    return (
      <View style={{width: '90%', alignSelf: 'center'}}>
        <InviteFriendsRowNew />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-between',
            marginBottom: 5,
          }}
        >
          <FriendCount count={wocky!.profile!.friends.list.length} />
          <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={Actions.friendSearch}>
            <Image source={searchIcon} />
          </TouchableOpacity>
        </View>
        {wocky!.profile!.friends.list.length <= 0 ? (
          <View>
            <RText weight="Regular" color={colors.GREY} style={placeholderStyle.placeholderText}>
              Start Adding Friends!
            </RText>
          </View>
        ) : null}
      </View>
    )
  }
}

const FriendCount = ({count}) =>
  count >= 0 ? (
    <RText size={17} weight="Medium">
      {count}
      {` ${count === 1 ? 'Friend' : 'Friends'}`}
    </RText>
  ) : null

export default FriendList

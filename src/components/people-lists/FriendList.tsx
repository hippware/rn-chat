import React from 'react'
import {View, TouchableOpacity, Image} from 'react-native'
import FriendCard from './FriendCard'
import {colors} from '../../constants'
import {RText} from '../common'
import DraggablePopupList from '../common/DraggablePopupList'
import InviteFriendsRowNew from './InviteFriendsRowNew'
import {Actions} from 'react-native-router-flux'
import {placeholderStyle} from '../styles'
import {useWocky} from 'src/utils/injectors'

type Props = {
  isActive: boolean
}

const searchIcon = require('../../../images/search.png')

const FriendList = ({isActive}: Props) => {
  const {profile} = useWocky()
  const renderHeader = () => {
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
          <FriendCount count={profile!.friends.list.length} />
          <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={Actions.friendSearch}>
            <Image source={searchIcon} />
          </TouchableOpacity>
        </View>
        {profile!.friends.list.length <= 0 ? (
          <View>
            <RText weight="Regular" color={colors.GREY} style={placeholderStyle.placeholderText}>
              Start Adding Friends!
            </RText>
          </View>
        ) : null}
      </View>
    )
  }

  // Sometimes wocky.profile is null. Race condition?
  return (
    <DraggablePopupList
      headerInner={profile ? renderHeader() : undefined}
      renderItem={({item}) => <FriendCard profile={item.user} />}
      keyExtractor={({user}) => user.id}
      data={profile ? profile!.friends.list.slice() : []}
      keyboardShouldPersistTaps="handled"
      isActive={isActive}
      // keyboardDismissMode="interactive"
    />
  )
}
;(FriendList as any).navigationOptions = {
  fadeNavConfig: {
    back: true,
    title: (
      <RText size={16} color={colors.DARK_PURPLE}>
        Friends
      </RText>
    ),
  },
}

const FriendCount = ({count}) =>
  count >= 0 ? (
    <RText size={17} weight="Medium">
      {count}
      {` ${count === 1 ? 'Friend' : 'Friends'}`}
    </RText>
  ) : null

export default FriendList

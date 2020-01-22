import React from 'react'
import {View, TouchableOpacity, Image} from 'react-native'
import FriendCard from './FriendCard'
import {colors} from '../../constants'
import {RText, BottomPopupNew} from '../common'
import InviteFriendsRowNew from './InviteFriendsRowNew'
import {Actions} from 'react-native-router-flux'
import {placeholderStyle} from '../styles'
import {useWocky} from 'src/utils/injectors'
import {observer} from 'mobx-react'

type Props = {
  isActive: boolean
}

const searchIcon = require('../../../images/search.png')

const FriendList = observer(({isActive}: Props) => {
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
    <BottomPopupNew
      navBarConfig={{
        title: (
          <RText size={16} color={colors.DARK_PURPLE}>
            Friends
          </RText>
        ),
      }}
      listProps={{
        ListHeaderComponent: profile ? renderHeader() : undefined,
        renderItem: ({item}) => <FriendCard profile={item} />,
        keyExtractor: ({id}) => id,
        data: profile ? profile!.friends.list.slice() : [],
        keyboardShouldPersistTaps: 'handled',
      }}
      fullViewHeight={400}
      allowFullScroll
    />
  )
})

const FriendCount = ({count}) =>
  count >= 0 ? (
    <RText size={17} weight="Medium">
      {count}
      {` ${count === 1 ? 'Friend' : 'Friends'}`}
    </RText>
  ) : null

export default FriendList

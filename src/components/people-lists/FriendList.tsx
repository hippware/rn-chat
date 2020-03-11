import React from 'react'
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native'
import FriendCard from './FriendCard'
import {colors} from '../../constants'
import {RText, BottomPopupNew} from '../common'
import {Actions} from 'react-native-router-flux'
import {placeholderStyle} from '../styles'
import {useWocky} from 'src/utils/injectors'
import {observer} from 'mobx-react'

const searchIcon = require('../../../images/search.png')

const FriendList = observer(() => {
  const {profile} = useWocky()
  const Header = (
    <View style={{width: '90%', alignSelf: 'center'}}>
      <InviteFriendsHeader />
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
        ListHeaderComponent: profile ? Header : undefined,
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

const icon = require('../../../images/followers.png')

const InviteFriendsHeader = () => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => Actions.shareWithContacts()}>
      <Image source={icon} style={{height: 37, width: 37}} resizeMode="contain" />
      <View style={{marginLeft: 13}}>
        <RText size={16} weight="Medium" color={colors.PINK}>
          Invite Friends
        </RText>
        <RText size={13} weight="Light" color={colors.DARK_PURPLE}>
          {'To discover their favorite places!'}
        </RText>
      </View>
    </TouchableOpacity>
  )
}

export default FriendList

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.PINK,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

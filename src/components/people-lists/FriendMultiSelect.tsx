import React from 'react'
import {View, StyleSheet} from 'react-native'
import {observer} from 'mobx-react'
import {colors} from '../../constants'
import SearchBar from './SearchBar'
import ProfileList from './ProfileList'
import InviteFriendsRow from './InviteFriendsRow'

type Props = {
  selection: any
  botTitle?: string
  inviteMessage?: string
}

const FriendMultiSelect = observer(({selection, botTitle, inviteMessage}: Props) => {
  return selection ? (
    <View style={{flex: 1}}>
      <SearchBar
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={(text: string) => selection.setFilter(text)}
        value={selection.filter}
        placeholder="Search name or username"
        clearButtonMode="while-editing"
      />
      <InviteFriendsRow
        style={{borderBottomWidth: StyleSheet.hairlineWidth, backgroundColor: colors.WHITE}}
        subtext={inviteMessage || 'Share your favorite places with your friends!'}
        botTitle={botTitle}
      />
      <ProfileList selection={selection} />
    </View>
  ) : null
})

export default FriendMultiSelect

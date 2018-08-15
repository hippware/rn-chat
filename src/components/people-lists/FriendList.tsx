import React from 'react'
import {StyleSheet, View, TextInput, TouchableOpacity, Image} from 'react-native'
import {observer, inject} from 'mobx-react/native'

import {k} from '../Global'
import FriendCard from './FriendCard'
import {colors} from '../../constants'
import {RText, DraggablePopupList} from '../common'
import InviteFriendsRow from './InviteFriendsRow'
import withKeyboardHOC from '../common/withKeyboardHOC'
import {IWocky} from 'wocky-client'
import {observable} from 'mobx'

type Props = {
  wocky?: IWocky
  searchStore: any
}

const KeyboardAwareDraggablePopupList = withKeyboardHOC(DraggablePopupList)

const searchIcon = require('../../../images/search.png')

@inject('wocky', 'searchStore')
@observer
class FriendList extends React.Component<Props> {
  @observable searchMode: boolean = false
  input: any
  list: any

  renderItem = ({item}) => <FriendCard profile={item} />

  render() {
    const {searchStore: {localResult}} = this.props
    return (
      <KeyboardAwareDraggablePopupList
        headerInner={this.renderHeader()}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
        data={localResult.slice(0, 20)}
        keyboardDismissMode="none"
      />
    )
  }

  renderHeader = () => {
    const {searchStore, wocky} = this.props
    return (
      <View style={{width: 300 * k, alignSelf: 'center'}}>
        {!this.searchMode ? (
          <View>
            <InviteFriendsRow />
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                justifyContent: 'space-between',
              }}
            >
              <FriendCount count={wocky.friends.length} />
              <SearchButton
                onPress={() => {
                  this.searchMode = true
                  setTimeout(() => this.input.focus(), 16)
                }}
                style={{alignSelf: 'flex-end'}}
              />
            </View>
          </View>
        ) : (
          <View
            style={{
              borderColor: colors.LIGHT_GREY,
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 10,
            }}
          >
            <SearchButton
              onPress={() => {
                searchStore.setLocal('')
                this.searchMode = false
              }}
              style={{marginRight: 10}}
            />
            <TextInput
              style={{
                flex: 1,
                fontSize: 16 * k,
                fontFamily: 'Roboto-Regular',
                color: colors.PURPLE,
              }}
              ref={r => (this.input = r)}
              onChangeText={searchStore.setLocal}
              value={searchStore.local}
            />
          </View>
        )}
      </View>
    )
  }
}

const SearchButton = ({onPress, style}) => (
  <TouchableOpacity style={style} onPress={onPress}>
    <Image source={searchIcon} />
  </TouchableOpacity>
)

const FriendCount = ({count}) =>
  count > 0 ? (
    <View style={styles.friendCount}>
      <RText size={16} weight="Bold">
        {count}
        {` ${count === 1 ? 'Friend' : 'Friends'}`}
      </RText>
    </View>
  ) : null

export default FriendList

const styles = StyleSheet.create({
  friendCount: {},
})

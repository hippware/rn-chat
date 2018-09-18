import React from 'react'
import {StyleSheet, View, TextInput, TouchableOpacity, Image} from 'react-native'
import {observer, inject} from 'mobx-react/native'

import {k} from '../Global'
import FriendCard from './FriendCard'
import {colors} from '../../constants'
import {RText} from '../common'
import DraggablePopupList from '../common/DraggablePopupList'
import InviteFriendsRowNew from './InviteFriendsRowNew'
import withKeyboardHOC from '../common/withKeyboardHOC'
import {IWocky} from 'wocky-client'
import {observable} from 'mobx'
import {ISearchStore} from '../../store/SearchStore'

type Props = {
  wocky?: IWocky
  searchStore: ISearchStore
}

const KeyboardAwareDraggablePopupList: any = withKeyboardHOC(DraggablePopupList)

const searchIcon = require('../../../images/search.png')

@inject('wocky', 'searchStore')
@observer
class FriendList extends React.Component<Props> {
  @observable searchMode: boolean = false
  input: any
  list: any

  renderItem = ({item}) => <FriendCard profile={item} />

  render() {
    const {wocky: {friends}, searchStore: {globalResult}} = this.props
    return (
      <KeyboardAwareDraggablePopupList
        ref={r => (this.list = r)}
        headerInner={this.renderHeader()}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
        fadeNavConfig={{
          back: true,
          title: () => (
            <RText size={16} color={colors.DARK_PURPLE}>
              Friends
            </RText>
          ),
        }}
        // keyExtractor={(item, index) => item.id + index}
        data={this.searchMode ? globalResult.filteredList.map(p => p.profile) : friends}
        // long list
        // data={[...localResult, ...localResult, ...localResult, ...localResult]}

        // short list
        // data={localResult.slice(0, 2)}
        keyboardShouldPersistTaps="handled"
        // keyboardDismissMode="interactive"
      />
    )
  }

  renderHeader = () => {
    const {searchStore, wocky} = this.props
    return (
      <View style={{width: 300 * k, alignSelf: 'center'}}>
        {!this.searchMode ? (
          <View>
            <InviteFriendsRowNew />
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
                  // delay to let this.input become a ref
                  setTimeout(() => this.input.focus(), 50)
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
                searchStore.setGlobal('')
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
              onChangeText={searchStore.setGlobal}
              value={searchStore.global}
              returnKeyType="search"
              clearButtonMode="while-editing"
              onFocus={() => this.list.scrollToOffset({offset: 0, animated: false})}
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

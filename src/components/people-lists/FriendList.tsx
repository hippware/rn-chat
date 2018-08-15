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
}

const KeyboardAwareDraggablePopupList = withKeyboardHOC(DraggablePopupList)

const searchIcon = require('../../../images/search.png')

@inject('wocky')
@observer
class FriendList extends React.Component<Props> {
  @observable searchMode: boolean = true

  renderItem = ({item}) => <FriendCard profile={item} />

  render() {
    const {friends} = this.props.wocky
    return (
      <KeyboardAwareDraggablePopupList
        headerInner={
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
                  <FriendCount count={friends.length} />
                  <SearchButton
                    onPress={() => (this.searchMode = !this.searchMode)}
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
                  onPress={() => (this.searchMode = !this.searchMode)}
                  style={{marginRight: 10}}
                />
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 16 * k,
                    fontFamily: 'Roboto-Regular',
                    color: colors.PURPLE,
                  }}
                />
              </View>
            )}
          </View>
        }
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
        data={this.props.wocky.friends}
        initialNumToRender={20}
      />
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

import React from 'react'
import {View, TextInput, Image, Platform} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import FriendCard from './FriendCard'
import {colors} from '../../constants'
import {RText} from '../common'
import DraggablePopupList from '../common/DraggablePopupList'
import withKeyboardHOC from '../common/withKeyboardHOC'
import {ISearchStore} from '../../store/SearchStore'

type Props = {
  searchStore?: ISearchStore
  isActive: boolean
}

export const KeyboardAwareDraggablePopupList: any =
  Platform.OS === 'ios' ? withKeyboardHOC(DraggablePopupList) : DraggablePopupList

const searchIcon = require('../../../images/search.png')

@inject('searchStore')
@observer
class FriendSearch extends React.Component<Props> {
  input: any
  list: any

  renderItem = ({item}) => <FriendCard profile={item} />

  render() {
    const {searchStore} = this.props
    return (
      <KeyboardAwareDraggablePopupList
        ref={r => (this.list = r)}
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
        data={searchStore!.globalResult.filteredList.map(p => p.profile)}
        keyboardShouldPersistTaps="handled"
        isActive={this.props.isActive}
        // keyboardDismissMode="interactive"
      />
    )
  }

  renderHeader = () => {
    const {searchStore} = this.props
    return (
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          borderColor: colors.LIGHT_GREY,
          borderBottomWidth: 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: 10,
          marginBottom: 10,
        }}
      >
        <Image source={searchIcon} style={{marginRight: 10}} />
        <TextInput
          style={{
            flex: 1,
            fontSize: 16,
            fontFamily: 'Roboto-Regular',
            color: colors.PURPLE,
          }}
          autoFocus
          ref={r => (this.input = r)}
          onChangeText={searchStore!.setGlobal}
          value={searchStore!.global}
          returnKeyType="search"
          clearButtonMode="while-editing"
          onFocus={() => this.list.scrollToOffset({offset: 0, animated: false})}
          placeholder="Search by name or username"
          selectionColor={colors.COVER_BLUE}
        />
      </View>
    )
  }
}

export default FriendSearch

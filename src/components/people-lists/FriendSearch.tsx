import React, {useRef} from 'react'
import {View, TextInput, Image, Platform, Keyboard} from 'react-native'
import {inject} from 'mobx-react'
import FriendCard from './FriendCard'
import {colors} from '../../constants'
import {RText} from '../common'
import DraggablePopupList from '../common/DraggablePopupList'
import withKeyboardHOC from '../common/withKeyboardHOC'
import {ISearchStore} from '../../store/SearchStore'
import {Actions} from 'react-native-router-flux'
import {observer} from 'mobx-react-lite'

type Props = {
  searchStore?: ISearchStore
  isActive: boolean
}

export const KeyboardAwareDraggablePopupList: any =
  Platform.OS === 'ios' ? withKeyboardHOC(DraggablePopupList) : DraggablePopupList

const searchIcon = require('../../../images/search.png')

const FriendSearch = inject('searchStore')(
  observer(({searchStore, isActive}: Props) => {
    const list = useRef<any>(null)

    const renderItem = ({item: profile}) => (
      <FriendCard
        profile={profile}
        onPress={() => {
          Keyboard.dismiss()
          Actions.profileDetails({item: profile.id})
        }}
      />
    )

    const renderHeader = () => {
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
            autoFocus={isActive}
            onChangeText={searchStore!.setGlobal}
            value={searchStore!.global}
            returnKeyType="search"
            clearButtonMode="while-editing"
            onFocus={() =>
              list.current!.scrollToOffset &&
              list.current!.scrollToOffset({offset: 0, animated: false})
            }
            placeholder="Search by name or username"
            selectionColor={colors.COVER_BLUE}
          />
        </View>
      )
    }

    const listData = searchStore!.globalResult.filteredList.map(p => p.profile)
    return (
      <KeyboardAwareDraggablePopupList
        ref={list}
        headerInner={renderHeader()}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        data={listData}
        keyboardShouldPersistTaps="handled"
        isActive={isActive}
        // keyboardDismissMode="interactive"
        ListFooterComponent={
          listData.length < 5 ? (
            <View
              style={{
                flex: 1,
                height: 250,
                backgroundColor: 'white',
              }}
            />
          ) : null
        }
      />
    )
  })
)
;(FriendSearch as any).navigationOptions = {
  fadeNavConfig: {
    back: true,
    title: (
      <RText size={16} color={colors.DARK_PURPLE}>
        Friends
      </RText>
    ),
  },
}

export default FriendSearch

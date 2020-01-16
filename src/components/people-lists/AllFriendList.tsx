import React from 'react'
import {View, StyleSheet, Image} from 'react-native'
import {width} from '../Global'
import {colors} from '../../constants'
import {useHomeStore} from 'src/utils/injectors'
import {observer, Observer} from 'mobx-react'
import ActiveLocationSharer from '../Home/ActiveLocationSharer'
import {RText, TextInputWithClearButton} from '../common'
import BottomPopupListNew from '../common/BottomPopupNew'
import {Actions} from 'react-native-router-flux'

type Props = {
  isActive: boolean
}

const searchIcon = require('../../../images/searchMagnifyingGlass.png')

const FriendList = observer(({isActive}: Props) => {
  const homeStore = useHomeStore()
  const renderBannerItem = ({item}) => (
    <ActiveLocationSharer profile={item} outerStyle={styles.outer} innerStyle={styles.inner} />
  )
  const Header = (
    <Observer>
      {() => (
        <View
          style={{
            borderColor: colors.LIGHT_GREY,
            borderBottomWidth: 1,
            justifyContent: 'center',
            padding: 5,
            paddingTop: 25,
          }}
        >
          <View
            style={{
              width: '95%',
              backgroundColor: colors.WHITE2,
              padding: 5,
              borderRadius: 5,
              alignSelf: 'center',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Image source={searchIcon} style={{marginRight: 10}} />
            <TextInputWithClearButton
              style={{
                flex: 1,
                fontSize: 14,
                padding: 5,
                fontFamily: 'Roboto-Light',
                color: colors.PURPLE,
              }}
              autoFocus={isActive}
              onChangeText={homeStore.setFriendFilter}
              value={homeStore.friendFilter}
              returnKeyType="search"
              clearButtonMode="while-editing"
              placeholder="Search by name or username"
              selectionColor={colors.COVER_BLUE}
            />
          </View>
        </View>
      )}
    </Observer>
  )
  return (
    <BottomPopupListNew
      allowFullScroll
      fullViewHeight={500}
      listProps={{
        data: homeStore!.filteredFriends,
        numColumns: 4,
        keyExtractor: item => item.id,
        renderItem: renderBannerItem,
        ListHeaderComponent: Header,
      }}
      navBarConfig={{
        backAction: () => Actions.pop(),
        title: (
          <RText size={16} color={colors.DARK_PURPLE}>
            All Friends
          </RText>
        ),
      }}
    />
  )
})

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.addAlpha(colors.WHITE, 0.7),
  },
  outer: {
    paddingVertical: 5,
    width: width / 4,
    alignItems: 'center',
  },
  inner: {
    width: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default FriendList

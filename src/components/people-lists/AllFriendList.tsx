import React from 'react'
import {View, StyleSheet, FlatList, TextInput, Image} from 'react-native'
import {width} from '../Global'
import {colors} from '../../constants'
import {useHomeStore} from 'src/utils/injectors'
import {observer} from 'mobx-react'
import ActiveLocationSharer from '../Home/ActiveLocationSharer'

type Props = {
  isActive: boolean
}

const searchIcon = require('../../../images/searchMagnifyingGlass.png')

const FriendList = observer(({isActive}: Props) => {
  const homeStore = useHomeStore()
  const renderBannerItem = ({item}) => (
    <ActiveLocationSharer profile={item} outerStyle={styles.outer} innerStyle={styles.inner} />
  )
  const renderHeader = (
    <View
      style={{
        borderColor: colors.LIGHT_GREY,
        borderBottomWidth: 1,
        height: 40,
        justifyContent: 'center',
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
        <TextInput
          style={{
            flex: 1,
            fontSize: 14,
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
  )
  return (
    <FlatList
      data={homeStore!.filteredFriends}
      numColumns={4}
      keyExtractor={item => item.id}
      renderItem={renderBannerItem}
      ListHeaderComponent={renderHeader}
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

import React from 'react'
import {View, StyleSheet, Image} from 'react-native'
import {k, defaultCover, width} from './Global'
import {observer, inject} from 'mobx-react/native'
import * as colors from '../constants/colors'
import {RText} from './common'

type Props = {
  style?: any
  item: any
  locationStore?: any
}

const BotCardInner = inject('locationStore')(
  observer(({item, style, locationStore}: Props) => (
    <View style={[styles.container, style]}>
      <MainImage item={item} />
      <View style={styles.rightSide}>
        <View style={{flexDirection: 'row', alignItems: 'center', paddingRight: 15 * k}}>
          <RText numberOfLines={1} color={colors.PURPLE} size={15}>
            {item.title}
          </RText>
          {!item.isPublic && (
            <Image
              style={{marginLeft: 5 * k, paddingRight: 5 * k, width: 10, height: 13}}
              source={require('../../images/iconPrivate.png')}
            />
          )}
        </View>
        <RText
          numberOfLines={1}
          style={{flex: 1, marginBottom: 10 * k}}
          size={12}
          color={colors.DARK_GREY}
        >
          {`${item.addressData.locationShort} - ${locationStore.distanceFromBot(item.location)}`}
        </RText>
        <BottomLine bot={item} />
      </View>
    </View>
  ))
)

const MainImage = observer(({item}: {item: any}) => {
  const img = item.image
  const source = img && img.thumbnail
  return (
    <View style={styles.mainImage}>
      <View style={{position: 'absolute'}}>
        {img && !img.loaded ? (
          <View style={[styles.mainImage, {backgroundColor: colors.GREY}]} />
        ) : (
          <Image style={styles.mainImage} source={source || defaultCover[item.coverColor % 4]} />
        )}
      </View>
    </View>
  )
})

const BottomLine = observer(({bot}: {bot: any}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Image
        style={{width: 16 * k, height: 14 * k}}
        source={require('../../images/heartGrey.png')}
      />
      <RText style={styles.followersSize} size={12} color={colors.DARK_GREY}>
        {bot.followersSize}
      </RText>
      <Image
        style={{width: 14 * k, height: 14 * k, paddingLeft: 10 * k}}
        source={require('../../images/postGrey.png')}
      />
      <RText style={styles.posts} size={12} color={colors.DARK_GREY}>
        {bot.totalItems}
      </RText>
    </View>
  )
})

export default BotCardInner

const styles = StyleSheet.create({
  rightSide: {
    flex: 1,
    padding: 15 * k,
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    width,
  },
  posts: {
    paddingLeft: 10 * k,
    paddingRight: 10 * k,
  },
  followersSize: {
    paddingLeft: 5 * k,
    paddingRight: 10 * k,
  },
  mainImage: {width: 120 * k, height: 120 * k},
  bottomLine: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: 'blue',
  },
})

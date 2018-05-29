import React from 'react'
import {View, StyleSheet, Image} from 'react-native'
import {observer, inject} from 'mobx-react/native'

import {k} from '../Global'
import {RText} from '../common'
import {colors} from '../../constants'
import {IWocky} from 'wocky-client'

type Props = {
  wocky?: IWocky
}

const foot = require('../../../images/footOpaquePink.png')
const bg = require('../../../images/bannerBg.png')

const FirstLoadOverlay = inject('wocky')(
  observer(({wocky}: Props) => {
    return (
      wocky!.profile &&
      wocky!.profile!.hasUsedGeofence && (
        <View style={styles.container}>
          <Image source={bg} style={styles.bgImage} resizeMode="cover" />
          <Image source={foot} style={styles.image} resizeMode="contain" />
          <View style={{flex: 1, justifyContent: 'center'}}>
            <RText color={colors.PINK} size={15} weight="Bold">
              {'Find out when your friends\r\nvisit your favorite places!'}
            </RText>
            <RText size={13} color={colors.DARK_GREY} style={{marginTop: 5 * k}}>
              {'Start by tapping '}
              <Image source={foot} style={styles.icon} resizeMode="contain" />
              {' on your\r\nfavorite bots!'}
            </RText>
          </View>
        </View>
      )
    )
  })
)

export default FirstLoadOverlay

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    padding: 20 * k,
    paddingHorizontal: 30 * k,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  image: {
    height: 89,
    width: 69,
    marginRight: 20 * k,
  },
  icon: {
    height: 18,
    width: 15,
  },
  button: {
    borderColor: colors.PINK,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
    padding: 8 * k,
    alignSelf: 'flex-start',
    marginTop: 10 * k,
  },
})

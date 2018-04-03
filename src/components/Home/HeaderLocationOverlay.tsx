import React from 'react'
import {TouchableOpacity, View, StyleSheet, Image, Linking} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {BlurView} from 'react-native-blur'

import {k} from '../Global'
import {RText} from '../common'
import {colors} from '../../constants'
import {ILocationStore} from '../../store/LocationStore'

type Props = {
  locationStore?: ILocationStore
}

const foot = require('../../../images/footOpaquePink.png')

const HeaderLocationOverlay = inject('locationStore')(
  observer(({locationStore}: Props) => {
    return !locationStore!.alwaysOn ? (
      <BlurView blurType="xlight" blurAmount={10} style={styles.container}>
        <Image source={foot} style={styles.image} resizeMode="contain" />
        <View style={{flex: 1, justifyContent: 'center'}}>
          <RText color={colors.PINK} size={15} weight="Bold">
            SHARE YOUR VISITS!
          </RText>
          <RText size={13} color={colors.DARK_GREY} style={{marginTop: 5 * k}}>
            Know when your friends visit your favorite places!
          </RText>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Linking.openURL('app-settings:{1}')}
          >
            <RText size={14} weight="Medium" color={colors.PINK}>
              GIVE LOCATION ACCESS
            </RText>
          </TouchableOpacity>
        </View>
      </BlurView>
    ) : null
  })
)

export default HeaderLocationOverlay

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
  },
  image: {
    height: 89,
    width: 69,
    marginRight: 20 * k,
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

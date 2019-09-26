import React from 'react'
import {TouchableOpacity, View, StyleSheet, Image, Linking} from 'react-native'
import HeaderOverlay from './HeaderOverlay'

import {k} from '../Global'
import {RText} from '../common'
import {colors} from '../../constants'
import {useLocationStore} from 'src/utils/injectors'
import {observer} from 'mobx-react'

const foot = require('../../../images/footOpaquePink.png')

const HeaderLocationOverlay = observer(() => {
  const {alwaysOn} = useLocationStore()
  return alwaysOn ? null : (
    <HeaderOverlay>
      <Image source={foot} style={styles.image} resizeMode="contain" />
      <View style={{flex: 1, justifyContent: 'center'}}>
        <RText color={colors.PINK} size={15} weight="Bold">
          SHARE YOUR VISITS!
        </RText>
        <RText size={13} color={colors.DARK_GREY} style={{marginTop: 5 * k}}>
          Know when your friends visit your favorite places!
        </RText>
        <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('app-settings:{1}')}>
          <RText size={14} weight="Medium" color={colors.PINK}>
            GIVE LOCATION ACCESS
          </RText>
        </TouchableOpacity>
      </View>
    </HeaderOverlay>
  )
})

export default HeaderLocationOverlay

const styles = StyleSheet.create({
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

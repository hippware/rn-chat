import React from 'react'
import {TouchableOpacity, View, StyleSheet, Image} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import HeaderOverlay from './HeaderOverlay'
import {k} from '../Global'
import {RText} from '../common'
import {colors} from '../../constants'
import {IWocky} from 'wocky-client'
import {disableInvisibleMode} from '../BottomMenu'

type Props = {
  wocky?: IWocky
}

const foot = require('../../../images/footOpaquePink.png')

const InvisibleModeOverlay = inject('wocky')(
  observer(({wocky}: Props) => {
    if (!wocky!.profile || (wocky!.profile!.hidden && !wocky!.profile!.hidden.enabled)) {
      return null
    }
    return (
      <HeaderOverlay>
        <Image source={foot} style={styles.image} resizeMode="contain" />
        <View style={{flex: 1, justifyContent: 'center'}}>
          <RText color={colors.PINK} size={15} weight="Bold">
            See visits to your favorite locations!
          </RText>
          <TouchableOpacity
            style={styles.button}
            onPress={() => disableInvisibleMode(wocky!.profile!)}
          >
            <RText size={14} weight="Medium" color={colors.PINK}>
              Turn Off Invisible Mode
            </RText>
          </TouchableOpacity>
        </View>
      </HeaderOverlay>
    )
  })
)

export default InvisibleModeOverlay

const styles = StyleSheet.create({
  image: {
    width: 42,
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

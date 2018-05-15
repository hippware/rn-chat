import React from 'react'
import {View, Image} from 'react-native'

import {k} from '../Global'
import {RText} from '../common'
import {colors} from '../../constants'

const placeholderImg = require('../../../images/geoBotPlaceholder.png')

const ActiveBannerPlaceholder = () => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        paddingLeft: 25 * k,
        paddingBottom: 15 * k,
        flex: 0,
        alignSelf: 'flex-start'
      }}
    >
      <Image source={placeholderImg} style={{width: 72 * k, height: 79 * k}} resizeMode="contain" />
      <RText
        size={13}
        style={{textAlign: 'center', left: -5 * k}}
        numberOfLines={2}
        color={colors.DARK_GREY}
      >
        {'No Current\r\nVisitors'}
      </RText>
    </View>
  )
}

export default ActiveBannerPlaceholder

import React from 'react'
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native'
import {Actions} from 'react-native-router-flux'

const placeholderImg = require('../../../images/InviteBG.png')

const ActiveBannerPlaceholder = () => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      <TouchableOpacity onPress={() => Actions.geoHeaderPrimer()}>
        <View style={[styles.pinContainer, {marginTop: 15}]}>
          <Image source={placeholderImg} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default ActiveBannerPlaceholder

const styles = StyleSheet.create({
  pinContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    flex: 0,
  },
})

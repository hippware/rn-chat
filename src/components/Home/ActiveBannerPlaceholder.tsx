import React from 'react'
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native'
import {Actions} from 'react-native-router-flux'

const placeholderImg = require('../../../images/InviteBG.png')

const ActiveBannerPlaceholder = () => (
  <TouchableOpacity
    onPress={() => Actions.shareWithContacts()}
    style={{flexDirection: 'row', justifyContent: 'center'}}
  >
    <View style={[styles.pinContainer, {marginTop: 15}]}>
      <Image source={placeholderImg} />
    </View>
  </TouchableOpacity>
)

export default ActiveBannerPlaceholder

const styles = StyleSheet.create({
  pinContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    flex: 0,
  },
})

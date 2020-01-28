import React from 'react'
import {View, Image, StyleSheet} from 'react-native'
import ShareActivitySheet from '../people-lists/ShareActivitySheet'

const placeholderImg = require('../../../images/InviteBG.png')

const ActiveBannerPlaceholder = () => (
  <ShareActivitySheet style={{flexDirection: 'row', justifyContent: 'center'}}>
    <View style={[styles.pinContainer, {marginTop: 15}]}>
      <Image source={placeholderImg} />
    </View>
  </ShareActivitySheet>
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

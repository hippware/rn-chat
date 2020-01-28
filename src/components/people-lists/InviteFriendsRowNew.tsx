import React from 'react'
import {View, Image, StyleSheet} from 'react-native'
import {k} from '../Global'
import {colors} from '../../constants'
import {RText} from '../common'
import ShareActivitySheet from './ShareActivitySheet'

const icon = require('../../../images/followers.png')

const InviteFriendsRowNew = () => {
  return (
    <ShareActivitySheet style={styles.container}>
      <Image source={icon} style={{height: 37 * k, width: 37 * k}} resizeMode="contain" />
      <View style={{marginLeft: 13 * k}}>
        <RText size={16} weight="Medium" color={colors.PINK}>
          Invite Friends
        </RText>
        <RText size={13} weight="Light" color={colors.DARK_PURPLE}>
          {'To discover their favorite places!'}
        </RText>
      </View>
    </ShareActivitySheet>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10 * k,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.PINK,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default InviteFriendsRowNew

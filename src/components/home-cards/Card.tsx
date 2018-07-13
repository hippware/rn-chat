import React from 'react'
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import {IProfile} from 'wocky-client'
import {Avatar} from '../common'
import {colors} from '../../constants'
import {k} from '../Global'

type Props = {
  profile?: IProfile
  children: any
  onPress?: () => void
}

const Card = ({profile, children, onPress}: Props) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.card}>
      {profile && (
        <Avatar profile={profile} size={40} style={styles.avatar} hideDot fontSize="large" />
      )}
      {children}
    </View>
  </TouchableWithoutFeedback>
)

export default Card

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    marginTop: 20 * k, // leave room for avatar to poke above
    shadowColor: colors.GREY,
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowOffset: {height: 0, width: 0},
  },
  avatar: {
    position: 'absolute',
    top: -20 * k,
    left: -20 * k,
    zIndex: 2,
  },
})

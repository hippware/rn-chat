import React from 'react'
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import {IProfile} from 'wocky-client'
import {Avatar} from '../common'
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
        <Avatar profile={profile} size={40} style={styles.avatar} hideDot fontFamily="regular" />
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
    borderRadius: 3,
  },
  avatar: {
    position: 'absolute',
    top: -20 * k,
    left: -14 * k,
    zIndex: 2,
  },
})

import React from 'react'
import {View, StyleSheet} from 'react-native'
import {IProfile} from 'wocky-client'
import {Avatar} from '../common'
import {colors} from '../../constants'
import {k} from '../Global'

type Props = {
  profile?: IProfile
  children: any
}

const Card = ({profile, children}: Props) => (
  <View style={styles.card}>
    {profile && <Avatar profile={profile} size={40} style={styles.avatar} hideDot />}
    {children}
  </View>
)

export default Card

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    marginTop: 20 * k,
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

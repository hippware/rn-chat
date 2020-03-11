import React from 'react'
import {StyleSheet} from 'react-native'
import {colors} from '../../constants'
import ProfileItem from './ProfileItem'
import {RText, GradientButton} from '../common'
import alert from '../../utils/alert'

const unblock = profile => {
  alert(null, `Are you sure you want to unblock @${profile.handle}?`, [
    {text: 'Cancel', style: 'cancel'},
    {
      text: 'Unblock',
      style: 'destructive',
      onPress: profile.unblock,
    },
  ])
}

type Props = {
  profile: any
}

export const BlockableProfileItem = ({profile}: Props) => (
  <ProfileItem profile={profile} tappable={false} style={{paddingHorizontal: 15}}>
    <GradientButton
      style={[styles.button, styles.following]}
      isPink
      onPress={() => unblock(profile)}
    >
      <RText size={13} color={colors.WHITE} weight={'Medium'}>
        UNBLOCK
      </RText>
    </GradientButton>
  </ProfileItem>
)

const styles = StyleSheet.create({
  button: {
    height: 31,
    width: 94,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.PINK,
    borderRadius: 4,
  },
  follow: {
    backgroundColor: colors.WHITE,
    borderColor: colors.DARK_GREY,
    borderWidth: 1,
  },
  following: {
    backgroundColor: colors.PINK,
  },
})

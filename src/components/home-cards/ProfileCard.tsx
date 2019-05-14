import React from 'react'
import {View, StyleSheet} from 'react-native'
import {RText, Avatar} from '../common'
import {colors} from '../../constants'
import {k} from '../Global'
import Card from './Card'
import {observer} from 'mobx-react/native'
import {IProfile} from 'wocky-client'
import {Actions} from 'react-native-router-flux'

type Props = {
  profile: IProfile
  children: any
  showAvatarDot?: boolean
}

const ProfileCard = observer(({profile, children, showAvatarDot}: Props) => {
  return (
    <Card onPress={() => Actions.profileDetails({item: profile!.id})}>
      <View style={styles.imageContainer}>
        <Avatar
          profile={profile}
          size={47}
          hideDot={!showAvatarDot}
          borderColor={colors.PINK}
          fontSize="large"
          fontFamily="regular"
          tappable={false}
          style={styles.avatar}
        />
      </View>
      <View style={styles.textContainer}>
        <RText
          size={17}
          weight="Bold"
          color={colors.DARK_PURPLE}
          numberOfLines={1}
          style={{paddingBottom: 3}}
        >
          {`@${profile.handle}`}
        </RText>
        {children}
      </View>
    </Card>
  )
})
export default ProfileCard

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    paddingVertical: 18 * k,
    justifyContent: 'center',
  },
  avatar: {
    marginLeft: 22 * k,
    marginRight: 15 * k,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

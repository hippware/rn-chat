import React from 'react'
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageRequireSource,
  ViewStyle,
} from 'react-native'
import {k} from '../Global'
import LinearGradient from 'react-native-linear-gradient'
import {Actions} from 'react-native-router-flux'
import {observer} from 'mobx-react/native'
import {colors} from '../../constants'
import {isAlive} from 'mobx-state-tree'
import {IProfile} from 'wocky-client'

const onlineColor = colors.LIGHT_BLUE
const offlineColor = 'rgb(211,211,211)'
const imgAnon = require('../../../images/follower.png')

type Props = {
  profile: IProfile
  size: number
  disableStatus?: boolean
  style?: ViewStyle
  borderWidth?: number
  showFrame?: boolean
  tappable?: boolean
  fontSize?: 'small' | 'large'
  hideDot?: boolean
  borderColor?: string
}

const Avatar = observer(
  ({
    size = 50,
    disableStatus,
    style,
    borderWidth,
    showFrame,
    profile,
    tappable = true,
    hideDot,
    borderColor,
    fontSize,
  }: Props) => {
    if (!profile || !isAlive(profile)) {
      return null
    }
    const title = profile.displayName || ' '
    const Clazz = tappable ? TouchableOpacity : View
    const sharedStyle = {
      width: size * k,
      height: size * k,
      borderRadius: size * k / 2,
      borderWidth: (borderWidth !== undefined ? borderWidth : 2) * k,
      borderColor: borderColor || colors.WHITE,
    }
    return (
      <Clazz
        style={{justifyContent: 'flex-end'}}
        onPress={() => Actions.profileDetails({item: this.props.profile.id})}
      >
        <View style={[style, {height: size * k, width: size * k}]}>
          {!!profile.avatar ? (
            <AvatarImage
              source={profile.avatar.thumbnail}
              showLoader={!(profile.avatar && profile.avatar.loaded)}
              style={sharedStyle}
            />
          ) : (
            <AvatarLetterPlaceholder
              fontSize={fontSize}
              size={size}
              style={sharedStyle}
              letter={title.length > 1 ? title[0] : title}
            />
          )}
          {showFrame && (
            <View style={styles.frameOuter}>
              <Image
                source={require('../../../images/avatarFrame.png')}
                style={{width: size * k, height: size * k}}
              />
            </View>
          )}
          {!hideDot && <PresenceDot profile={profile} size={size} disableStatus={disableStatus} />}
        </View>
      </Clazz>
    )
  }
)

const PresenceDot = observer(({profile, size, disableStatus}) => {
  const backgroundColor = profile && profile.status === 'available' ? onlineColor : offlineColor
  const shift = size * k * 3 / 4
  const d = Math.max(10, size / 5) * k
  const style = {
    borderRadius: d / 2,
    borderWidth: d / 10,
    height: d,
    width: d,
    top: shift,
    left: shift,
  }

  if (profile) {
    const {isOwn, isMutual} = profile
    if ((isMutual || isOwn) && !disableStatus) {
      return <View style={[styles.dot, style, {backgroundColor}]} />
    } else {
      return <Image source={imgAnon} style={[styles.dot, style]} />
    }
  } else {
    return null
  }
})

type AvatarImageProps = {
  source: ImageRequireSource
  style?: any
  showLoader: any
}

const AvatarImage = ({source, style, showLoader}: AvatarImageProps) => {
  return showLoader ? (
    <View style={[style, styles.avatarContainer]} />
  ) : (
    <View style={[style, {overflow: 'hidden', borderWidth: 0}]}>
      <Image source={source} style={[style, styles.avatarContainer]} />
      {/* <View
        style={{
          backgroundColor: 'rgba(1,1,1,0.5)',
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
        }}
      /> */}
    </View>
  )
}

type AvatarLetterPlaceholderProps = {
  size: number
  style: ViewStyle
  fontSize?: string
  letter: string
}

const AvatarLetterPlaceholder = ({size, style, fontSize, letter}: AvatarLetterPlaceholderProps) => (
  <LinearGradient
    start={{x: 0, y: 1}}
    end={{x: 1, y: 0}}
    colors={['rgb(242,68,191)', 'rgb(254,110,98)', 'rgb(254,92,108)']}
    style={{borderRadius: size * k / 2}}
  >
    <View style={[style, styles.avatarContainer]}>
      <Text
        style={[
          styles.title,
          {
            fontSize: fontSize === 'small' ? 12 * k : fontSize === 'large' ? 25 * k : 18 * k,
          },
        ]}
      >
        {letter.toUpperCase()}
      </Text>
    </View>
  </LinearGradient>
)

export default Avatar

const styles = StyleSheet.create({
  title: {
    color: colors.WHITE,
    fontFamily: 'Roboto-Regular',
  },
  dot: {
    position: 'absolute',
    borderColor: 'white',
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameOuter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
})

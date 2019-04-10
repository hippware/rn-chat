import React from 'react'
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native'
import {avatarScale} from '../Global'
import LinearGradient from 'react-native-linear-gradient'
import {Actions} from 'react-native-router-flux'
import {observer} from 'mobx-react/native'
import {colors} from '../../constants'
import {isAlive} from 'mobx-state-tree'
import {IProfile, IOwnProfile} from 'wocky-client'
import PresenceDot from './PresenceDot'
import LazyImage from './LazyImage'
import {toJS} from 'mobx'

type Props = {
  profile?: IProfile
  image?: ImageSourcePropType
  displayName?: string
  size: number
  style?: ViewStyle
  borderWidth?: number
  tappable?: boolean
  fontSize?: 'small' | 'large'
  fontFamily?: 'bold' | 'regular'
  hideDot?: boolean
  borderColor?: string
  noScale?: boolean
}

const Avatar = observer(
  ({
    size = 50,
    style,
    borderWidth,
    profile,
    image,
    displayName,
    tappable = true,
    hideDot,
    borderColor,
    fontSize,
    fontFamily,
    noScale = false,
  }: Props) => {
    if ((!profile || !isAlive(profile)) && (!image && !displayName)) {
      return null
    }
    const showMask =
      profile &&
      profile.isOwn &&
      (profile as IOwnProfile).hidden &&
      (profile as IOwnProfile).hidden.enabled
    const title = (profile ? profile.displayName : displayName) || ' '
    const Clazz: React.ComponentClass<any> = tappable ? TouchableOpacity : View
    const scaledSize = noScale ? size : size * avatarScale
    const sharedStyle = {
      width: scaledSize,
      height: scaledSize,
      borderRadius: scaledSize / 2,
      borderWidth: (borderWidth !== undefined ? borderWidth : 2) * avatarScale,
      borderColor: showMask ? colors.DARK_GREY : borderColor || colors.WHITE,
      overflow: 'hidden',
    }

    return (
      <Clazz
        style={{justifyContent: 'flex-end'}}
        onPress={() => (profile ? Actions.profileDetails({item: profile.id}) : null)}
      >
        <View style={[style, {height: scaledSize, width: scaledSize}]}>
          {(!!profile && profile.avatar) || image ? (
            <AvatarImage
              avatar={profile ? toJS(profile.avatar) : {thumbnail: image}}
              style={sharedStyle}
              size={size}
              showMask={showMask}
            />
          ) : (
            <AvatarLetterPlaceholder
              fontSize={fontSize}
              size={size}
              style={sharedStyle}
              fontFamily={fontFamily}
              letter={title.length > 1 ? title[0] : title}
              showMask={showMask}
            />
          )}
          {!hideDot && profile && <PresenceDot profile={profile} size={size} />}
        </View>
      </Clazz>
    )
  }
)

const AvatarImage = observer(({avatar, style, size, showMask}) => (
  <View style={[style, {borderWidth: 0}]}>
    <LazyImage
      file={avatar}
      imageProps={{
        style: [style, styles.avatarContainer],
      }}
      placeholder={<View style={[style, styles.avatarContainer]} />}
    />
    {showMask && <Mask size={size * 0.65} />}
  </View>
))

const AvatarLetterPlaceholder = ({size, style, fontSize, letter, showMask, fontFamily}) => {
  const start = showMask ? {x: 0.5, y: 0} : {x: 0, y: 1}
  const end = showMask ? {x: 0.5, y: 1} : {x: 1, y: 0}
  const theColors = showMask
    ? ['rgb(166,166,166)', 'rgb(74,74,74)']
    : ['rgb(242,68,191)', 'rgb(254,110,98)', 'rgb(254,92,108)']
  return (
    <LinearGradient
      start={start}
      end={end}
      colors={theColors}
      style={{borderRadius: (size * avatarScale) / 2}}
    >
      <View style={[style, styles.avatarContainer]}>
        {showMask ? (
          <Mask size={size * 0.65} />
        ) : (
          <Text
            style={[
              styles.title,
              {
                fontSize: fontSize === 'small' ? 13.5 : fontSize === 'large' ? 25 : 20,
                fontFamily: fontFamily === 'bold' ? 'Roboto-Bold' : 'Roboto-Regular',
              },
            ]}
          >
            {letter.toUpperCase()}
          </Text>
        )}
      </View>
    </LinearGradient>
  )
}

const Mask = ({size}) => (
  <View style={[styles.mask, styles.absolute]}>
    <Image
      source={require('../../../images/invisibleIconWhite.png')}
      style={[
        {
          width: size,
          height: size,
        },
      ]}
      resizeMode="contain"
    />
  </View>
)

export default Avatar

const styles = StyleSheet.create({
  title: {
    color: colors.WHITE,
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
    justifyContent: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  mask: {
    backgroundColor: 'rgba(93,93,93,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
})

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
import {observer} from 'mobx-react'
import {colors} from '../../constants'
import {isAlive, isStateTreeNode} from 'mobx-state-tree'
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
  inactive?: boolean
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
    inactive = false,
  }: Props) => {
    if ((!profile || (isStateTreeNode(profile) && !isAlive(profile))) && !image && !displayName) {
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
        onPress={() =>
          profile ? Actions.profileDetails({item: profile.id, preview: false}) : null
        }
      >
        <View style={[style, {height: scaledSize, width: scaledSize}]}>
          {(!!profile && !!profile.avatar) || image ? (
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
              inactive={inactive}
              isYou={profile && profile!.isOwn}
            />
          )}
          {!hideDot && !!profile && <PresenceDot profile={profile} size={size} />}
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
    {!!showMask && <Mask size={size * 0.65} />}
  </View>
))

const AvatarLetterPlaceholder = ({
  size,
  inactive,
  style,
  fontSize,
  letter,
  showMask,
  fontFamily,
  isYou,
}) => {
  const start = showMask || inactive ? {x: 0.5, y: 0} : {x: 0, y: 1}
  const end = showMask || inactive ? {x: 0.5, y: 1} : {x: 1, y: 0}
  const theColors =
    showMask || inactive
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
                fontSize: isYou ? 18 : fontSize === 'small' ? 13.5 : fontSize === 'large' ? 25 : 20,
                fontFamily: isYou || fontFamily === 'bold' ? 'Roboto-Bold' : 'Roboto-Regular',
                // For some reason, it's not quite centered perfectly
                paddingLeft: 3,
              },
            ]}
          >
            {isYou ? 'YOU' : letter.toUpperCase()}
          </Text>
        )}
      </View>
    </LinearGradient>
  )
}

const Mask = ({size}) => (
  <View style={[styles.mask, StyleSheet.absoluteFill]}>
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
  mask: {
    backgroundColor: 'rgba(93,93,93,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
})

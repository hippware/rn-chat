import React from 'react'
import {View, Image, Alert, StyleSheet, TouchableOpacity, TouchableOpacityProps} from 'react-native'
import BottomPopup from './BottomPopup'
import {Actions} from 'react-native-router-flux'
import {isAlive} from 'mobx-state-tree'
import {colors} from '../constants'
import {observer, inject} from 'mobx-react/native'
import Avatar from './common/Avatar'
import {k, minHeight, avatarScale} from './Global'
import {IWocky, IOwnProfile} from 'wocky-client'
import {RText} from './common'
import AnimatedLinearGradient from 'react-native-animated-linear-gradient'

interface IMenuItemProps extends TouchableOpacityProps {
  icon?: any
  image?: object
  innerStyle?: any
  children?: any
  imageStyle?: any
}

interface IMenuItemWrapperProps extends TouchableOpacityProps {
  children?: any
}

export function disableInvisibleMode(profile: IOwnProfile) {
  Alert.alert('', 'Are you sure you want to turn off invisible mode?', [
    {text: 'Cancel', style: 'cancel'},
    {
      text: 'Turn Off',
      style: 'destructive',
      onPress: () => {
        profile.hide(false, undefined)
      },
    },
  ])
}
const MenuItemWrapper = ({children, ...rest}: IMenuItemWrapperProps) => {
  const Wrapper: React.ComponentClass<any> = rest.onPress ? TouchableOpacity : View
  return <Wrapper {...rest}>{children}</Wrapper>
}

const MenuItem = ({style, image, innerStyle, children, imageStyle, ...rest}: IMenuItemProps) => (
  <MenuItemWrapper {...rest}>
    <View style={[styles.menuItem, style]}>
      {image && (
        <Image source={image} resizeMode="contain" style={[styles.menuImage, imageStyle]} />
      )}
      <View style={[{flex: 1, alignItems: 'center'}, innerStyle]}>{children}</View>
    </View>
  </MenuItemWrapper>
)

const LiveLocationButton = ({invisible, active}) => (
  <View style={{position: 'absolute', top: -25, zIndex: 10}}>
    <TouchableOpacity style={{marginLeft: 160}}>
      {invisible ? (
        <Image source={require('../../images/liveLocationButtonGhost.png')} />
      ) : active ? (
        <View
          style={{
            width: 135,
            height: 53,
            borderRadius: 21,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AnimatedLinearGradient
            customColors={[
              'rgb(232, 66, 178)',
              'rgb(255, 114, 59)',
              'rgb(255, 183, 44)',
              'rgb(159, 68, 242)',
            ]}
            speed={600}
          />
          <Image
            style={{marginRight: 10}}
            source={require('../../images/ShareLiveLocationText.png')}
          />
        </View>
      ) : (
        <Image source={require('../../images/liveLocationButton.png')} />
      )}
    </TouchableOpacity>
  </View>
)

type Props = {
  wocky?: IWocky
}

@inject('wocky')
@observer
export default class BottomMenu extends React.Component<Props> {
  render() {
    const {wocky} = this.props
    const {profile} = wocky!
    if (!profile || !isAlive(profile)) {
      return null
    }
    return (
      <BottomPopup>
        <MenuItemWrapper
          style={{
            marginTop: 35 * k,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          testID="myAccountMenuItem"
        >
          <LiveLocationButton invisible={false} active={false} />
          <Avatar
            size={74}
            fontSize="large"
            fontFamily="regular"
            profile={profile}
            style={{borderWidth: 0}}
            borderColor={colors.PINK}
            tappable
            hideDot
          />
          <RText
            color={profile.hidden.enabled ? colors.DARK_PURPLE : colors.PINK}
            weight="Bold"
            size={16}
            style={styles.displayName}
          >
            @{profile.handle}
          </RText>
        </MenuItemWrapper>
        <View style={styles.optionsWrapper}>
          <MenuItem
            onPress={() => Actions.friends()}
            image={require('../../images/menuFriends.png')}
            imageStyle={{width: 34 * avatarScale, height: 27 * avatarScale, marginVertical: 15}}
          >
            <RText style={styles.text}>Friends</RText>
          </MenuItem>
          <MenuItem
            onPress={() => {
              Actions.pop()
              Actions.chats()
            }}
            image={require('../../images/menuMessages.png')}
            imageStyle={{width: 30 * avatarScale, height: 27 * avatarScale, marginVertical: 15}}
          >
            <RText style={styles.text}>Messages</RText>
          </MenuItem>
          <MenuItem
            image={profile.hidden.enabled ? invisibleOn : invisibleOff}
            onPress={this.toggleInvisible}
            imageStyle={{
              width: 55 * avatarScale,
              height: 41 * avatarScale,
              marginLeft: 25 * avatarScale,
            }}
          >
            <RText style={styles.text}>Invisible</RText>
          </MenuItem>
        </View>
      </BottomPopup>
    )
  }

  toggleInvisible = () => {
    const {wocky} = this.props
    const {profile} = wocky!
    if (!profile) {
      return
    }
    if (!profile!.hidden.enabled) {
      Actions.invisibleExpirationSelector()
    } else {
      disableInvisibleMode(profile)
    }
  }
}

const invisibleOn = require('../../images/InvisibleOn.png')
const invisibleOff = require('../../images/InvisibleOff.png')

const styles = StyleSheet.create({
  text: {
    color: colors.DARK_PURPLE,
    fontSize: 14,
    textAlign: 'center',
  },
  menuItem: {
    width: 75,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuImage: {width: 34, height: 34, marginBottom: 8 * k},
  displayName: {
    padding: 10,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: undefined,
  },
  optionsWrapper: {
    flexDirection: 'row',
    marginTop: 15 * minHeight,
    marginBottom: 50 * minHeight,
    justifyContent: 'space-between',
    marginHorizontal: 40 * k,
  },
})

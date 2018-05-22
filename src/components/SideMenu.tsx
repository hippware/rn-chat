// tslint:disable jsx-no-lambda
import React from 'react'
import {Actions} from 'react-native-router-flux'
import {View, Text, Image, StyleSheet, TouchableOpacity, TouchableHighlight} from 'react-native'
import {k, isIphoneX} from './Global'
import {observer, inject} from 'mobx-react/native'
import Avatar from './common/Avatar'
import {colors} from '../constants'
import {settings} from '../globals'

import {isAlive} from 'mobx-state-tree'
const {version} = require('../../package.json')
const MenuImage = ({image}: {image: object}) => (
  <Image source={image} resizeMode="contain" style={styles.menuImage} />
)

type MenuItemProps = {
  onPress?: () => void
  testID?: string
  style?: any
  icon?: any
  image?: object
  innerStyle?: any
  children?: any
  stayOpen?: boolean
}

type MenuItemWrapperProps = {
  onPress?: () => void
  testID?: string
  style?: any
  children?: any
  stayOpen?: boolean
}

const MenuItemWrapper = ({testID, onPress, stayOpen, style, children}: MenuItemWrapperProps) => (
  <TouchableHighlight
    underlayColor={'rgba(255,255,255,0.23)'}
    style={style}
    onPress={() => {
      if (!stayOpen) Actions.drawerClose()
      if (onPress) onPress()
    }}
    testID={testID}
  >
    {children}
  </TouchableHighlight>
)

const MenuItem = ({
  onPress,
  testID,
  style,
  icon,
  image,
  innerStyle,
  children,
  stayOpen,
}: MenuItemProps) => (
  <MenuItemWrapper testID={testID} stayOpen={stayOpen} onPress={onPress}>
    <View style={[styles.menuItem, style]}>
      <View style={styles.menuImageContainer}>
        {icon || (image && <MenuImage image={image} />)}
      </View>
      <View style={[{flex: 1, flexDirection: 'row'}, innerStyle]}>{children}</View>
    </View>
  </MenuItemWrapper>
)

const showCodePushOptions = () => {
  if (!(__DEV__ || settings.isStaging)) return
  Actions.drawerClose()
  Actions.codePush()
}

const VersionFooter = () => (
  <View style={{flex: 1, justifyContent: 'flex-end'}}>
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <TouchableOpacity style={{padding: 10}} onLongPress={showCodePushOptions}>
        <Text style={{color: colors.WHITE}}>{version}</Text>
      </TouchableOpacity>
    </View>
  </View>
)

type Props = {
  wocky?: any
}

@inject('wocky')
@observer
class SideMenu extends React.Component<Props> {
  render() {
    const {wocky} = this.props
    const {profile} = wocky
    if (!profile || !isAlive(profile)) {
      return null
    }
    return (
      <View style={{flex: 1, backgroundColor: 'transparent', overflow: 'hidden'}}>
        <Image
          source={require('../../images/sideMenuBackground.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <MenuItemWrapper
          onPress={() => Actions.profileDetails({item: wocky.username})}
          style={{height: isIphoneX() ? 191 : 151, paddingTop: 20 * k}}
          testID="myAccountMenuItem"
        >
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Avatar size={62} profile={profile} style={{borderWidth: 0}} />
            <Text style={styles.displayName}>@{profile.handle}</Text>
          </View>
        </MenuItemWrapper>
        <MenuItem onPress={() => Actions.home()} image={require('../../images/menuHome.png')}>
          <Text style={styles.text}>Home</Text>
        </MenuItem>
        <MenuItem onPress={() => Actions.fullMap()} image={require('../../images/menuExplore.png')}>
          <Text style={styles.text}>Explore Nearby</Text>
        </MenuItem>
        <MenuItem
          onPress={() => Actions.botsScene()}
          image={require('../../images/heartWhite.png')}
        >
          <Text style={styles.text}>Favorites</Text>
        </MenuItem>
        <MenuItem
          onPress={() => Actions.friendsMain({profile})}
          image={require('../../images/menuFriends.png')}
        >
          <Text style={styles.text}>Friends</Text>
        </MenuItem>
        {settings.isStaging && (
          <MenuItem onPress={() => Actions.locationDebug()}>
            <Text style={styles.text}>LOCATION DEBUG</Text>
          </MenuItem>
        )}
        <VersionFooter />
      </View>
    )
  }
}

export default SideMenu

const styles = StyleSheet.create({
  text: {
    flex: 1,
    color: 'white',
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  menuItem: {
    height: 60 * k,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuImageContainer: {width: 80 * k, alignItems: 'center'},
  menuImage: {width: 32 * k, height: 32 * k},
  viewAccount: {
    color: colors.addAlpha(colors.WHITE, 0.57),
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
  },
  displayName: {
    padding: 10,
    color: colors.WHITE,
    fontFamily: 'Roboto-Medium',
    fontSize: 17,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: undefined,
    // width: undefined,
  },
})

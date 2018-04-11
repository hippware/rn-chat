// tslint:disable jsx-no-lambda
import React from 'react'
import {Actions} from 'react-native-router-flux'
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import {k} from './Global'
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
  <TouchableOpacity
    onPress={() => {
      if (!stayOpen) Actions.drawerClose()
      if (onPress) onPress()
    }}
    testID={testID}
  >
    <View style={[styles.menuItem, style]}>
      <View style={styles.menuImageContainer}>
        {icon || (image && <MenuImage image={image} />)}
      </View>
      <View style={[{flex: 1, flexDirection: 'row'}, innerStyle]}>{children}</View>
    </View>
  </TouchableOpacity>
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
        <Text style={{color: colors.DARK_GREY}}>{version}</Text>
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
    let displayName = ' '
    if (profile && profile.displayName) {
      displayName = profile.displayName
    }
    return (
      <View style={{flex: 1, backgroundColor: 'rgba(63,50,77,1)'}}>
        <View style={{height: 20}} />
        <MenuItem
          testID="myAccountMenuItem"
          innerStyle={{flexDirection: 'column'}}
          onPress={() => Actions.profileDetails({item: wocky.username})}
          style={{backgroundColor: 'transparent'}}
          icon={<Avatar size={40} profile={profile} showFrame style={{borderWidth: 0}} />}
        >
          <Text style={styles.displayName}>{displayName}</Text>
          <Text style={styles.viewAccount}>View Account</Text>
        </MenuItem>
        <MenuItem onPress={() => Actions.home()} image={require('../../images/menuHome.png')}>
          <Text style={styles.text}>HOME</Text>
        </MenuItem>
        <MenuItem onPress={() => Actions.fullMap()} image={require('../../images/menuExplore.png')}>
          <Text style={styles.text}>EXPLORE NEARBY</Text>
        </MenuItem>
        <MenuItem
          onPress={() => Actions.botsScene()}
          image={require('../../images/heartWhite.png')}
        >
          <Text style={styles.text}>FAVORITES</Text>
        </MenuItem>
        <MenuItem
          onPress={() => Actions.friendsMain({profile})}
          image={require('../../images/menuFriends.png')}
        >
          <Text style={styles.text}>FRIENDS</Text>
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
    borderBottomWidth: 1,
    borderRadius: 1,
    borderColor: 'rgba(63,50,77,1)',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  menuImageContainer: {width: 80 * k, alignItems: 'center'},
  menuImage: {width: 32 * k, height: 32 * k},
  viewAccount: {
    color: colors.addAlpha(colors.WHITE, 0.57),
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
  },
  displayName: {
    color: colors.WHITE,
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
  },
})

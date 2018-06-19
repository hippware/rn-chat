import React from 'react'
import {
  View,
  Animated,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native'
import BottomPopup from './BottomPopup'
import {Actions} from 'react-native-router-flux'
import {isAlive} from 'mobx-state-tree'
import {colors} from '../constants'
import {settings} from '../globals'
import {observer, inject} from 'mobx-react/native'
import Avatar from './common/Avatar'

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
      if (onPress) {
        if (!stayOpen) Actions.pop()
        onPress()
      }
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
      <View style={[{flex: 1, flexDirection: 'row'}, innerStyle]}>
        {children}
        {!!onPress && (
          <View style={{paddingRight: 50}}>
            <Image source={require('../../images/menuArrow.png')} />
          </View>
        )}
      </View>
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
export default class BottomMenu extends React.Component<Props> {
  render() {
    const {wocky} = this.props
    const {profile} = wocky
    if (!profile || !isAlive(profile)) {
      return null
    }
    return (
      <BottomPopup onClose={Actions.pop}>
        <MenuItemWrapper
          onPress={() => Actions.profileDetails({item: wocky.username})}
          style={{height: 129}}
          testID="myAccountMenuItem"
        >
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Avatar size={74} profile={profile} style={{borderWidth: 0}} />
            <Text style={styles.displayName}>@{profile.handle}</Text>
          </View>
        </MenuItemWrapper>
        <MenuItem
          onPress={() => Actions.friendsMain({profile})}
          image={require('../../images/menuFriends.png')}
        >
          <Text style={styles.text}>Friends</Text>
        </MenuItem>
        <MenuItem onPress={() => Actions.chats()} image={require('../../images/menuMessages.png')}>
          <Text style={styles.text}>Messages</Text>
        </MenuItem>
        <MenuItem
          onPress={() => Actions.botsScene()}
          image={require('../../images/menuFavorites.png')}
        >
          <Text style={styles.text}>Favorites</Text>
        </MenuItem>
        <MenuItem image={require('../../images/menuInvisible.png')}>
          <Text style={styles.text}>Invisible</Text>
        </MenuItem>
      </BottomPopup>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    color: colors.DARK_PURPLE,
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
  },
  menuItem: {
    height: 50,
    paddingLeft: 39,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuImageContainer: {width: 60, alignItems: 'center'},
  menuImage: {width: 28, height: 23},
  viewAccount: {
    color: colors.addAlpha(colors.WHITE, 0.57),
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
  },
  displayName: {
    padding: 10,
    color: colors.PINK,
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
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

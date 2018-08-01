import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacityProps,
} from 'react-native'
import BottomPopup from './BottomPopup'
import {Actions} from 'react-native-router-flux'
import {isAlive} from 'mobx-state-tree'
import {colors} from '../constants'
import {observer, inject} from 'mobx-react/native'
import Avatar from './common/Avatar'
import {k} from './Global'
import {IWocky} from 'wocky-client'
import InvisibleSwitch from './InvisibleSwitch'

interface IMenuItemProps extends TouchableOpacityProps {
  icon?: any
  image?: object
  innerStyle?: any
  children?: any
  stayOpen?: boolean
}

interface IMenuItemWrapperProps extends TouchableOpacityProps {
  children?: any
  stayOpen?: boolean
}

const MenuItemWrapper = ({testID, onPress, stayOpen, style, children}: IMenuItemWrapperProps) => {
  const Wrapper = onPress ? TouchableHighlight : View
  return (
    <Wrapper
      underlayColor={'rgba(255,255,255,0.23)'}
      style={style}
      onPress={e => {
        if (onPress) {
          if (!stayOpen) Actions.pop()
          onPress(e)
        }
      }}
      testID={testID}
    >
      {children}
    </Wrapper>
  )
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
}: IMenuItemProps) => (
  <MenuItemWrapper testID={testID} stayOpen={stayOpen} onPress={onPress}>
    <View style={[styles.menuItem, style]}>
      <View style={styles.menuImageContainer}>
        {icon || (image && <Image source={image} resizeMode="contain" style={styles.menuImage} />)}
      </View>
      <View style={[{flex: 1, flexDirection: 'row', alignItems: 'center'}, innerStyle]}>
        {children}
        {!!onPress && <Image source={require('../../images/menuArrow.png')} />}
      </View>
    </View>
  </MenuItemWrapper>
)

type Props = {
  wocky?: IWocky
  screenProps: any
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
      <BottomPopup
        onLayout={this.props.screenProps && this.props.screenProps.onLayout}
        onClose={Actions.pop}
      >
        <MenuItemWrapper style={{height: 129}} testID="myAccountMenuItem">
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Avatar
              size={74}
              profile={profile}
              style={{borderWidth: 0}}
              borderColor={colors.PINK}
              tappable
            />
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
          <InvisibleSwitch />
        </MenuItem>
        <View style={{height: 30, backgroundColor: 'white'}} />
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
    height: 50 * k,
    marginHorizontal: 50 * k,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuImageContainer: {width: 50 * k},
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

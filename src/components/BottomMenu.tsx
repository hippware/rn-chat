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
import {RText} from './common'

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
      {/* <View style={styles.menuImageContainer}> */}
      {icon || (image && <Image source={image} resizeMode="contain" style={styles.menuImage} />)}
      {/* </View> */}
      <View style={[{flex: 1, flexDirection: 'row', alignItems: 'center'}, innerStyle]}>
        {children}
      </View>
    </View>
  </MenuItemWrapper>
)

type Props = {
  wocky?: IWocky
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
          style={{marginTop: 25 * k, alignItems: 'center', justifyContent: 'center'}}
          testID="myAccountMenuItem"
        >
          <Avatar
            size={74}
            profile={profile}
            style={{borderWidth: 0}}
            borderColor={colors.PINK}
            tappable
          />
          <RText color={colors.PINK} weight="Bold" size={16} style={styles.displayName}>
            @{profile.handle}
          </RText>
        </MenuItemWrapper>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 30 * k,
            marginBottom: 50 * k,
            justifyContent: 'space-around',
          }}
        >
          <MenuItem
            onPress={() => Actions.friendsMain({profile})}
            image={require('../../images/menuFriends.png')}
          >
            <RText style={styles.text}>Friends</RText>
          </MenuItem>
          <MenuItem
            onPress={() => Actions.chats()}
            image={require('../../images/menuMessages.png')}
          >
            <RText style={styles.text}>Messages</RText>
          </MenuItem>
          <MenuItem image={require('../../images/menuInvisible.png')}>
            <RText style={styles.text}>Invisible</RText>
          </MenuItem>
        </View>
      </BottomPopup>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: colors.DARK_PURPLE,
    fontSize: 14,
    textAlign: 'center',
  },
  menuItem: {
    width: 75 * k,
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
    // width: undefined,
  },
})

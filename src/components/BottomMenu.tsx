import React from 'react'
import {View, Image, StyleSheet, TouchableOpacity, TouchableOpacityProps} from 'react-native'
import BottomPopup from './BottomPopup'
import {Actions} from 'react-native-router-flux'
import {isAlive} from 'mobx-state-tree'
import {colors} from '../constants'
import {observer, inject} from 'mobx-react/native'
import Avatar from './common/Avatar'
import {k} from './Global'
import {IWocky} from 'wocky-client'
import {RText} from './common'
import moment from 'moment'

interface IMenuItemProps extends TouchableOpacityProps {
  icon?: any
  image?: object
  innerStyle?: any
  children?: any
}

interface IMenuItemWrapperProps extends TouchableOpacityProps {
  children?: any
}

const MenuItemWrapper = ({children, ...rest}: IMenuItemWrapperProps) => {
  const Wrapper = rest.onPress ? TouchableOpacity : View
  return <Wrapper {...rest}>{children}</Wrapper>
}

const MenuItem = ({style, image, innerStyle, children, ...rest}: IMenuItemProps) => (
  <MenuItemWrapper {...rest}>
    <View style={[styles.menuItem, style]}>
      {image && <Image source={image} resizeMode="contain" style={styles.menuImage} />}
      <View style={[{flex: 1, alignItems: 'center'}, innerStyle]}>{children}</View>
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
    const {wocky: {profile}} = this.props
    if (!profile || !isAlive(profile)) {
      return null
    }
    return (
      <BottomPopup>
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
          >
            <RText style={styles.text}>Friends</RText>
          </MenuItem>
          <MenuItem
            onPress={() => {
              Actions.pop()
              Actions.chats()
            }}
            image={require('../../images/menuMessages.png')}
          >
            <RText style={styles.text}>Messages</RText>
          </MenuItem>
          <MenuItem
            image={profile.hidden.enabled ? invisibleOn : invisibleOff}
            onPress={this.toggleInvisible}
          >
            <RText style={styles.text}>Invisible</RText>
            {profile.hidden.enabled ? (
              <RText size={12} color={colors.DARK_GREY} style={{marginTop: 3}}>
                {profile.hidden.expires ? moment(profile.hidden.expires).fromNow(true) : 'On'}
              </RText>
            ) : (
              <RText size={12} color={colors.DARK_GREY} style={{marginTop: 3}}>
                Off
              </RText>
            )}
          </MenuItem>
        </View>
      </BottomPopup>
    )
  }

  toggleInvisible = () => {
    const {wocky: {profile}} = this.props
    if (!profile.hidden.enabled) {
      Actions.invisibleExpirationSelector()
    } else {
      profile.hide(false, null)
    }
  }
}

const invisibleOn = require('../../images/menuInvisible.png')
const invisibleOff = require('../../images/menuInvisibleOff.png')

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
  },
  optionsWrapper: {
    flexDirection: 'row',
    marginTop: 30 * k,
    marginBottom: 50 * k,
    justifyContent: 'space-between',
    marginHorizontal: 40 * k,
  },
})

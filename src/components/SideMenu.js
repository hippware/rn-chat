// @flow

import React from 'react';
import {Actions} from 'react-native-router-flux';
import {observer} from 'mobx-react/native';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {k} from './Global';
import Avatar from './common/Avatar';
import model from '../model/model';
import {colors} from '../constants';
import Badge from './Badge';
import {settings} from '../globals';
import {version} from '../../package.json';
import eventStore from '../store/eventStore';

const MenuImage = ({image}: {image: Object}) => <Image source={image} resizeMode={Image.resizeMode.contain} style={styles.menuImage} />;

type MenuItemProps = {
  onPress?: Function,
  testID?: string,
  style?: any,
  icon?: any,
  image?: Object,
  innerStyle?: any,
  children?: any,
};

const MenuItem = ({onPress, testID, style, icon, image, innerStyle, children}: MenuItemProps) => (
  <TouchableOpacity
    onPress={() => {
      Actions.drawerClose();
      onPress && onPress();
    }}
    testID={testID}
  >
    <View style={[styles.menuItem, style]}>
      <View style={styles.menuImageContainer}>{icon || (image && <MenuImage image={image} />)}</View>
      <View style={[{flex: 1, flexDirection: 'row'}, innerStyle]}>{children}</View>
    </View>
  </TouchableOpacity>
);

const showCodePushOptions = () => {
  if (!(__DEV__ || settings.isStaging)) return;
  Actions.drawerClose();
  Actions.codePush();
};

const VersionFooter = () => (
  <View style={{flex: 1, justifyContent: 'flex-end'}}>
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <TouchableOpacity style={{padding: 10}} onLongPress={showCodePushOptions}>
        <Text style={{color: colors.DARK_GREY}}>{version}</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// is this necessary or can we remove it?
MenuItem.contextTypes = {
  drawer: React.PropTypes.object,
};

const SideMenu = () => {
  const profile = model.profile;
  if (!profile) {
    return null;
  }
  let displayName = ' ';
  if (profile && profile.displayName) {
    displayName = profile.displayName;
  }
  return (
    <View style={{flex: 1, backgroundColor: 'rgba(63,50,77,1)'}}>
      <View style={{height: 20}} />
      <MenuItem
        testID='myAccountMenuItem'
        innerStyle={{flexDirection: 'column'}}
        onPress={() => Actions.profileDetails({item: model.profile.user})}
        style={{backgroundColor: 'transparent'}}
        icon={<Avatar size={40} profile={profile} showFrame style={{borderWidth: 0}} />}
      >
        <Text style={styles.displayName}>{displayName}</Text>
        <Text style={styles.viewAccount}>View Account</Text>
      </MenuItem>
      <MenuItem onPress={() => Actions.home()} image={require('../../images/menuHome.png')}>
        <Text style={styles.text}>HOME</Text>
      </MenuItem>
      <MenuItem onPress={() => Actions.fullMap({init: true})} image={require('../../images/menuExplore.png')}>
        <Text style={styles.text}>EXPLORE NEARBY</Text>
      </MenuItem>
      <MenuItem onPress={() => Actions.botsScene()} image={require('../../images/menuBots.png')}>
        <Text style={styles.text}>BOTS</Text>
      </MenuItem>
      <MenuItem onPress={() => Actions.friendsMain({profile})} image={require('../../images/menuFriends.png')}>
        <Text style={styles.text}>FRIENDS</Text>
        <Badge>{model.friends.newFollowers.length}</Badge>
        <View style={{width: 22}} />
      </MenuItem>
      <MenuItem onPress={eventStore.getDeletes} image={require('../../images/menuFriends.png')}>
        <Text style={styles.text}>get deletes</Text>
        {/* <Badge>{model.friends.newFollowers.length}</Badge> */}
        <View style={{width: 22}} />
      </MenuItem>
      <VersionFooter />
    </View>
  );
};

// is this necessary or can we remove it?
SideMenu.contextTypes = {
  drawer: React.PropTypes.object,
};

export default observer(SideMenu);

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
});

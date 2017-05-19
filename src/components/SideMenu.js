// @flow

import React from 'react';
import {Alert, View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {k} from './Global';
import Avatar from './Avatar';
import {Actions} from 'react-native-router-native';
import model from '../model/model';
import statem from '../../gen/state';
import {observer} from 'mobx-react/native';
const {version} = require('../../package.json');
import {colors} from '../constants';
import codePush from 'react-native-code-push';
import Badge from './Badge';

const MenuImage = ({image}: {image: Object}) => <Image source={image} resizeMode={Image.resizeMode.contain} style={styles.menuImage} />;

type MenuItemProps = {
    onPress?: Function,
    testID?: string,
    style?: any,
    icon?: any,
    image?: Object,
    innerStyle?: any,
    children?: any
};

const MenuItem = ({onPress, testID, style, icon, image, innerStyle, children}: MenuItemProps) => (
    <TouchableOpacity
        onPress={() => {
            Actions.get('drawer').ref.close();
            onPress && onPress();
        }}
        testID={testID}
    >
        <View style={[styles.menuItem, style]}>
            <View style={styles.menuImageContainer}>
                {icon || (image && <MenuImage image={image} />)}
            </View>
            <View style={[{flex: 1, flexDirection: 'row'}, innerStyle]}>
                {children}
            </View>

        </View>
    </TouchableOpacity>
);

// is this necessary or can we remove it?
MenuItem.contextTypes = {
    drawer: React.PropTypes.object,
};

const showCodePushOptions = async () => {
    try {
        const metadata = await codePush.getUpdateMetadata(codePush.UpdateState.RUNNING);
        console.log('&&& metadata', metadata);
        Alert.alert(`Version is ${version}`);
    } catch (err) {
        console.warn('error grabbing CodePush metadata', err);
    }
};

const VersionFooter = () => (
    <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <TouchableOpacity style={{padding: 10}} onPress={showCodePushOptions}>
            <Text style={{color: colors.DARK_GREY}}>{version}</Text>
        </TouchableOpacity>
    </View>
);

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
                onPress={statem.drawerTabs.myAccountScene}
                style={{backgroundColor: 'transparent'}}
                icon={<Avatar title={displayName} size={40} source={!!profile.avatar && profile.avatar.source} showFrame style={{borderWidth: 0}} />}
            >
                <Text style={styles.displayName}>{displayName}</Text>
                <Text style={styles.viewAccount}>View Account</Text>
            </MenuItem>
            <MenuItem onPress={statem.drawerTabs.home} image={require('../../images/menuHome.png')}>
                <Text style={styles.text}>HOME</Text>
            </MenuItem>
            <MenuItem onPress={statem.drawerTabs.fullMap} image={require('../../images/menuExplore.png')}>
                <Text style={styles.text}>EXPLORE NEARBY</Text>
            </MenuItem>
            <MenuItem onPress={statem.drawerTabs.friendsContainer} image={require('../../images/menuFriends.png')}>
                <Text style={styles.text}>PEOPLE</Text>
                <Badge>{model.friends.newFollowers.length}</Badge>
                <View style={{width: 22}} />
            </MenuItem>
            <MenuItem onPress={statem.drawerTabs.botsScene} image={require('../../images/menuBots.png')}>
                <Text style={styles.text}>BOTS</Text>
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

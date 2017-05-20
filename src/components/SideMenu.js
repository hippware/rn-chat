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
import {settings} from '../globals';
import deployments from '../constants/codepush-deployments';
import CodePush from './CodePush';
import {compose, withHandlers, withState} from 'recompose';

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

const syncCallback = status => {
    console.log('&&& sync status', status, codePush.SyncStatus);
};

const sync = syncIndex => {
    const choices = [deployments.LocalTest.key, deployments.LocalTest2.key];
    console.log('&&& sync', choices[syncIndex]);

    // switch deployment destination based on current version of app
    const syncOptions = {
        updateDialog: {
            appendReleaseDescription: true,
        },
        installMode: codePush.InstallMode.IMMEDIATE,
        deploymentKey: choices[syncIndex],
    };
    codePush.sync(syncOptions, syncCallback);
};

const showCodePushOptions = async () => {
    // @TODO: restrict based on Staging vs Prod? based on user?
    // if (!__DEV__) return;
    try {
        const metadata = await codePush.getUpdateMetadata(codePush.UpdateState.RUNNING);
        console.log('&&& metadata', metadata);
        let texts = [];
        if (metadata) {
            texts = ['Binary: ?', `Target Version: ${metadata.appVersion}`, `Description: ${metadata.description}`, `Label: ${metadata.label}`];
        }
        // @TODO: track binary version
        Alert.alert(`Version ${version}`, texts.join('\r\n'), [
            {text: 'Sync 1', onPress: () => sync(0)},
            {text: 'Sync 2', onPress: () => sync(1)},
            {text: 'Cancel', style: 'cancel'},
        ]);
    } catch (err) {
        console.warn('error grabbing CodePush metadata', err);
        alert(`Codepush error ${JSON.stringify(err)}`);
    }
};

const VersionFooter = () => (
    <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <TouchableOpacity style={{padding: 10}} onLongPress={showCodePushOptions}>
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
                <Text style={styles.text}>BOTS2</Text>
            </MenuItem>

            <VersionFooter />
        </View>
    );
};

// is this necessary or can we remove it?
SideMenu.contextTypes = {
    drawer: React.PropTypes.object,
};

// const enhance = compose(observer, withState('codePushVisible', 'toggleCodePushVisibility', false));

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

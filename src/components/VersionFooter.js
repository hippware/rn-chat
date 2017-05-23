// @flow

import React from 'react';
import {Alert, View, Text, TouchableOpacity} from 'react-native';
const {version} = require('../../package.json');
import {colors} from '../constants';
import codePush from 'react-native-code-push';
import {settings} from '../globals';
import deployments from '../constants/codepush-deployments';
import {Actions} from 'react-native-router-native';
import statem from '../../gen/state';

const showCodePushOptions = async () => {
    if (!(__DEV__ || settings.isStaging)) return;
    Actions.get('drawer').ref.close();
    Actions.codepush();
    // statem.drawerTabs.codePush();
};

export default () => (
    <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <TouchableOpacity style={{padding: 10}} onLongPress={showCodePushOptions}>
            <Text style={{color: colors.DARK_GREY}}>{version}</Text>
        </TouchableOpacity>
    </View>
);

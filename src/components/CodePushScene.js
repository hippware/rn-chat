// @flow

import React, {Component, Element} from 'react';
import {Alert, View, Text, TouchableOpacity} from 'react-native';
const {version} = require('../../package.json');
import {colors} from '../constants';
import codePush from 'react-native-code-push';
import {settings} from '../globals';
import deployments from '../constants/codepush-deployments';
import {Actions} from 'react-native-router-native';
import statem from '../../gen/state';
import {compose, lifecycle} from 'recompose';

// type Props = {
//     actions: Object,
//     children: Element<any>
// };

// const syncCallback = (status: number) => {
//     if (status === codePush.SyncStatus.UNKNOWN_ERROR) {
//         alert('CodePush sync error');
//     }
// };
//
// const sync = (choice: Object) => {
//     const syncOptions = {
//         updateDialog: {
//             appendReleaseDescription: true,
//         },
//         installMode: codePush.InstallMode.IMMEDIATE,
//         deploymentKey: choice.key,
//     };
//     codePush.sync(syncOptions, syncCallback);
// };

/*
const metadata = await codePush.getUpdateMetadata(codePush.UpdateState.RUNNING);
let texts = [`Binary ${version}`];
if (metadata) {
    texts = [`Binary: ${metadata.appVersion}`, `Description: ${metadata.description}`, `Label: ${metadata.label}`];
}

let choices = [];
if (__DEV__) {
    choices = [deployments.LocalTest, deployments.LocalTest2];
} else if (settings.isStaging) {
    choices = [deployments.Staging, deployments.StagingBeta];
}

// @TODO: track binary version
Alert.alert(`Version ${version}`, texts.join('\r\n'), [
    {text: `Sync ${choices[0].displayName}`, onPress: () => sync(choices[0])},
    {text: `Sync ${choices[1].displayName}`, onPress: () => sync(choices[1])},
    {text: 'Cancel', style: 'cancel'},
]);
*/

const CodePushScene = () => (
    <View style={{flex: 1}}>
        <Text>Hello everyone!!!</Text>
    </View>
);

const enhance = compose(
    lifecycle({
        componentWillMount() {
            console.log('&&& cwm');
        },
    })
);

export default enhance(CodePushScene);

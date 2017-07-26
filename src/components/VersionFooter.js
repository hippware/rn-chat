// @flow

import React from 'react';
import {Alert, View, Text, TouchableOpacity} from 'react-native';

const {version} = require('../../package.json');

import {colors} from '../constants';
import codePush from 'react-native-code-push';
import {settings} from '../globals';
import deployments from '../constants/codepush-deployments';

const syncCallback = (status: number) => {
  if (status === codePush.SyncStatus.UNKNOWN_ERROR) {
    alert('CodePush sync error');
  }
};

const sync = (choice: Object) => {
  const syncOptions = {
    updateDialog: {
      appendReleaseDescription: true,
    },
    installMode: codePush.InstallMode.IMMEDIATE,
    deploymentKey: choice.key,
  };
  codePush.sync(syncOptions, syncCallback);
};

const showCodePushOptions = async () => {
  if (!(__DEV__ || settings.isStaging)) return;
  try {
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
  } catch (err) {
    alert(`Codepush error: ${JSON.stringify(err)}`);
  }
};

export default () =>
  (<View style={{flex: 1, justifyContent: 'flex-end'}}>
    <TouchableOpacity style={{padding: 10}} onLongPress={showCodePushOptions}>
      <Text style={{color: colors.DARK_GREY}}>
        {version}
      </Text>
    </TouchableOpacity>
  </View>);

// @flow

import React from 'react';
import {ActivityIndicator, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../constants';
import {settings} from '../globals';
import deployments from '../constants/codepush-deployments';
import {observer} from 'mobx-react/native';
import codePushStore from '../store/codePushStore';
import {version} from '../../package.json';
import model from '../model/model';

const Metadata = observer(() => {
  if (codePushStore.metadata) {
    const {description, label, isFirstRun, isMandatory, packageSize} = codePushStore.metadata;
    return (
      <View>
        <Text>{`Description: ${description}`}</Text>
        <Text>{`Label: ${label}`}</Text>
        <Text>{`First run?: ${isFirstRun}`}</Text>
        <Text>{`Mandatory?: ${isMandatory}`}</Text>
        <Text>{`Package size: ${packageSize}`}</Text>
      </View>
    );
  } else {
    return <Text style={{marginTop: 20}}>No CodePush metadata, you are running the base app from TestFlight</Text>;
  }
});

const Channels = observer(() => {
  let channels = [];
  let flavor = '';
  if (__DEV__) {
    flavor = 'DEV';
    channels = deployments.local;
  } else if (settings.isStaging) {
    flavor = 'STAGING';
    channels = deployments.staging;
  } else {
    flavor = 'PROD';
    channels = deployments.production;
  }

  return (
    <View style={{marginTop: 20}}>
      <Text>{`${flavor} channels...`}</Text>
      {codePushStore.syncing
        ? <ActivityIndicator />
        : channels.map(c =>
          (<TouchableOpacity key={c.key} style={[styles.syncButton]} onPress={() => codePushStore.sync(c)}>
            <Text style={{color: colors.BLUE}}>
              {c.displayName}
            </Text>
          </TouchableOpacity>),
        )}
    </View>
  );
});

const SyncStatus = observer(() => {
  const {syncStatus: status} = codePushStore;
  if (status.length) {
    return (
      <View style={{marginTop: 20}}>
        {status.map(s =>
          (<Text key={s}>
            {s}
          </Text>),
        )}
      </View>
    );
  } else {
    return null;
  }
});

const CodePushScene = observer(() => {
  const displayCPInfo = version !== settings.version;
  return (
    <View style={{flex: 1, padding: 20}}>
      <View style={styles.statusSection}>
        <Text style={{marginTop: 20}}>
          <Text style={styles.bold}>Binary Version: </Text>
          <Text>
            {settings.version}
          </Text>
        </Text>
        {displayCPInfo &&
          <Text>
            <Text style={styles.bold}>Bundle Version: </Text>
            <Text>
              {version}
            </Text>
          </Text>}

        {displayCPInfo &&
          <Text style={{marginTop: 20}}>
            <Text style={styles.bold}>Current Channel: </Text>
            <Text>
              {model.codePushChannel || 'none'}
            </Text>
          </Text>}
        <Metadata />
      </View>

      <Channels />
      <SyncStatus />
    </View>
  );
});

export default CodePushScene;

const styles = StyleSheet.create({
  syncButton: {
    padding: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.BLUE,
    alignItems: 'center',
  },
  statusSection: {
    paddingBottom: 20,
    borderColor: colors.GREY,
    borderBottomWidth: 1,
  },
  bold: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

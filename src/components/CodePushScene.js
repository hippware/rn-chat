// @flow

import React from 'react';
import {ActivityIndicator, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../constants';
import {settings} from '../globals';
import deployments from '../constants/codepush-deployments';
import {observer} from 'mobx-react/native';
import codePushStore from '../store/codePushStore';

const Metadata = observer(({metadata}: {metadata: ?Object}) => {
    if (metadata) {
        const {description, label} = codePushStore.metadata;
        return (
            <View style={{marginTop: 20}}>
                <Text>`Description: ${description}`</Text>
                <Text>`Label: ${label}`</Text>
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
                : channels.map(c => (
                      <TouchableOpacity key={c.key} style={[styles.syncButton]} onPress={() => codePushStore.sync(c)}>
                          <Text style={{color: colors.BLUE}}>{c.displayName}</Text>
                      </TouchableOpacity>
                  ))}
        </View>
    );
});

const SyncStatus = observer(() => {
    const {syncStatus: status} = codePushStore;
    if (!!status.length) {
        return (
            <View style={{marginTop: 20}}>
                {status.map((s, index) => <Text key={index}>{s}</Text>)}
            </View>
        );
    } else {
        return null;
    }
});

const CodePushScene = observer(() => {
    return (
        <View style={{flex: 1, padding: 20}}>
            <View style={styles.statusSection}>
                <Text>
                    <Text style={styles.bold}>
                        Version:{' '}
                    </Text>
                    <Text>{settings.version}</Text>
                </Text>
                <Text style={{marginTop: 20}}>
                    <Text style={styles.bold}>
                        Binary:{' '}
                    </Text>
                    <Text>{codePushStore.metadata ? codePushStore.metadata.appVersion : settings.version}</Text>
                </Text>
                <Text style={{marginTop: 20}}>
                    <Text style={styles.bold}>
                        Current
                        Channel:{' '}
                    </Text>
                    <Text>{'(work in progress)'}</Text>
                </Text>
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
        borderColor: 'blue',
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

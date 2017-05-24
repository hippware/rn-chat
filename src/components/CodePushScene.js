// @flow

import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
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

const Channels = ({sync, disabled}: {sync: Function, disabled: boolean}) => {
    let choices = [];
    let flavor = '';
    if (__DEV__) {
        flavor = 'DEV';
        choices = deployments.local;
    } else if (settings.isStaging) {
        flavor = 'STAGING';
        choices = deployments.staging;
    } else {
        flavor = 'PROD';
        choices = deployments.production;
    }

    return (
        <View style={{marginTop: 20}}>
            <Text>{`${flavor} channels...`}</Text>
            {choices.map(channel => (
                <TouchableOpacity key={channel.key} disabled={disabled} style={styles.syncButton} onPress={() => codePushStore.sync(channel)}>
                    <Text style={styles.syncText}>{channel.displayName}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const SyncStatus = ({status}: {status: string[]}) => {
    if (!!status.length) {
        return (
            <View style={{marginTop: 20}}>
                {status.map((s, index) => <Text key={index}>{s}</Text>)}
            </View>
        );
    } else {
        return null;
    }
};

const CodePushScene = observer(() => {
    return (
        <View style={{flex: 1, padding: 20}}>
            <View
                style={{
                    paddingBottom: 20,
                    borderColor: colors.GREY,
                    borderBottomWidth: 1,
                }}
            >
                <Text>
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                        }}
                    >
                        Version:{' '}
                    </Text>
                    <Text>{codePushStore.version}</Text>
                </Text>
                <Text style={{marginTop: 20}}>
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                        }}
                    >
                        Binary:{' '}
                    </Text>
                    <Text>{codePushStore.metadata ? codePushStore.metadata.appVersion : codePushStore.version}</Text>
                </Text>
                <Text style={{marginTop: 20}}>
                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                        Current
                        Channel:{' '}
                    </Text>
                    <Text>{'(work in progress)'}</Text>
                </Text>
                <Metadata />
            </View>

            <Channels disabled={codePushStore.syncing} />
            <SyncStatus status={codePushStore.syncStatus} />
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
        alignItems: 'center',
    },
    syncText: {
        color: 'blue',
    },
});

// @flow

import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
const {version} = require('../../package.json');
import {colors} from '../constants';
import codePush from 'react-native-code-push';
import {settings} from '../globals';
import deployments from '../constants/codepush-deployments';

const Metadata = ({metadata}: {metadata: ?Object}) => {
    if (metadata) {
        const {description, label} = metadata;
        return (
            <View style={{marginTop: 20}}>
                <Text>`Description: ${description}`</Text>
                <Text>`Label: ${label}`</Text>
            </View>
        );
    } else {
        return <Text style={{marginTop: 20}}>No CodePush metadata, you are running the base app from TestFlight</Text>;
    }
};

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
                <TouchableOpacity key={channel.key} disabled={disabled} style={styles.syncButton} onPress={() => sync(channel)}>
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

type State = {
    metadata: ?Object,
    syncing: boolean,
    syncStatus: string[]
};

type Props = {};

class CodePushScene extends Component {
    state: State;
    props: Props;

    constructor(props: Props) {
        super(props);
        this.state = {
            metadata: null,
            syncing: false,
            syncStatus: [],
        };
    }

    componentDidMount() {
        this.getCodePushStatus();
    }

    syncCallback = (status: number) => {
        const {CHECKING_FOR_UPDATE, DOWNLOADING_PACKAGE, INSTALLING_UPDATE, UP_TO_DATE, UPDATE_INSTALLED, UNKNOWN_ERROR} = codePush.SyncStatus;
        switch (status) {
            case CHECKING_FOR_UPDATE:
                this.addStatus('Checking for updates.');
                break;
            case DOWNLOADING_PACKAGE:
                this.addStatus('Downloading package.');
                break;
            case INSTALLING_UPDATE:
                this.addStatus('Installing update.');
                break;
            case UP_TO_DATE:
                this.addStatus('Up-to-date.');
                this.setState({syncing: false});
                break;
            case UPDATE_INSTALLED:
                this.addStatus('Update installed.');
                break;
            case UNKNOWN_ERROR:
                this.setState({syncing: false});
                this.addStatus('unknown sync error');
                break;
            default:
                this.addStatus(`unhandled status: ${status}`);
        }
    };

    sync = (choice: Object) => {
        const syncOptions = {
            updateDialog: {
                appendReleaseDescription: true,
            },
            installMode: codePush.InstallMode.IMMEDIATE,
            deploymentKey: choice.key,
        };
        this.setState({syncing: true, syncStatus: []});
        codePush.sync(syncOptions, this.syncCallback);
    };

    addStatus = (status: string) => {
        this.setState({syncStatus: [...this.state.syncStatus, status]});
    };

    getCodePushStatus = async () => {
        const metadata = await codePush.getUpdateMetadata(codePush.UpdateState.RUNNING);
        // @TODO: why is triggering a warning about setting state...the component is already mounted
        this.setState({metadata});
    };

    render() {
        const {metadata, syncing, syncStatus} = this.state;

        // @TODO: persist info about the current deployment/channel

        return (
            <View style={{flex: 1, padding: 20}}>
                <View style={{paddingBottom: 20, borderColor: colors.GREY, borderBottomWidth: 1}}>
                    <Text>
                        <Text style={{fontSize: 14, fontWeight: 'bold'}}>Version: </Text>
                        <Text>{version}</Text>
                    </Text>
                    <Text style={{marginTop: 20}}>
                        <Text style={{fontSize: 14, fontWeight: 'bold'}}>Binary: </Text>
                        <Text>{metadata ? metadata.appVersion : version}</Text>
                    </Text>
                    <Text style={{marginTop: 20}}>
                        <Text style={{fontSize: 14, fontWeight: 'bold'}}>Current Channel: </Text>
                        <Text>{'(work in progress)'}</Text>
                    </Text>
                    <Metadata metadata={metadata} />
                </View>

                <Channels sync={this.sync} disabled={syncing} />
                <SyncStatus status={syncStatus} />
            </View>
        );
    }
}

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

export default CodePushScene;

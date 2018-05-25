// @flow

import React from 'react'
import {ActivityIndicator, View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {colors} from '../constants'
import {settings} from '../globals'
import {observer, inject} from 'mobx-react/native'

const Metadata = inject('codePushStore')(
  observer(({codePushStore}) => {
    if (codePushStore.refreshing) {
      return <Text>retrieving CodePush status...</Text>
    }
    if (codePushStore.metadata) {
      const {description, label, isFirstRun, isMandatory, packageSize} = codePushStore.metadata
      return (
        <View>
          <Text>{`Description: ${description}`}</Text>
          <Text>{`Label: ${label}`}</Text>
          <Text>{`First run?: ${isFirstRun}`}</Text>
          <Text>{`Mandatory?: ${isMandatory}`}</Text>
          <Text>{`Package size: ${packageSize}`}</Text>
        </View>
      )
    } else {
      return (
        <Text style={{marginTop: 20}}>
          No CodePush metadata, you are running the base app from TestFlight
        </Text>
      )
    }
  })
)

const Channels = inject('codePushStore')(
  observer(({codePushStore}) => {
    let inner
    if (codePushStore.refreshing || codePushStore.syncing) inner = <ActivityIndicator />
    else if (!codePushStore.channelUpdates.length)
      inner = <Text>{`No updates available for ${codePushStore.flavor}`}</Text>
    else {
      inner = (
        <View>
          <Text>{`Available updates for ${codePushStore.flavor}:`}</Text>
          {codePushStore.channelUpdates.map(c => (
            <TouchableOpacity
              key={c.key}
              style={[styles.syncButton]}
              onPress={() => codePushStore.sync(c)}
            >
              <Text style={{color: colors.PINK}}>{`${c.displayName} - ${
                c.updateDescription
              }`}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )
    }
    return <View style={{marginTop: 20}}>{inner}</View>
  })
)

const SyncStatus = inject('codePushStore')(
  observer(({codePushStore}) => {
    const {syncStatus: status} = codePushStore
    if (status.length) {
      return <View style={{marginTop: 20}}>{status.map(s => <Text key={s}>{s}</Text>)}</View>
    } else {
      return null
    }
  })
)

@inject('codePushStore')
@observer
class CodePushScene extends React.Component<any> {
  componentWillMount() {
    this.props.codePushStore.getFreshData()
  }

  render() {
    // const displayCPInfo = !!model.codePushChannel;
    return (
      <View style={{flex: 1, padding: 20}}>
        <View style={styles.statusSection}>
          <Text style={{marginTop: 20}}>
            <Text style={styles.bold}>Version: </Text>
            <Text>{settings.version}</Text>
          </Text>

          {/* TODO {displayCPInfo && (
            <Text style={{marginTop: 20}}>
              <Text style={styles.bold}>Current Channel: </Text>
              <Text>{model.codePushChannel || 'none'}</Text>
            </Text>
          )} */}
          <Metadata />
        </View>

        <Channels />
        <SyncStatus />
      </View>
    )
  }
}

export default CodePushScene

const styles = StyleSheet.create({
  syncButton: {
    padding: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.PINK,
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
})

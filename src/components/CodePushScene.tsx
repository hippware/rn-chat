import React from 'react'
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ProgressViewIOS,
} from 'react-native'
import {colors} from '../constants'
import {IAppInfo} from 'wocky-client'
import {observer, inject} from 'mobx-react/native'
import {ICodePushStore} from '../store/CodePushStore'
import {settings} from '../globals'

type Props = {
  codePushStore?: ICodePushStore
  appInfo?: IAppInfo
}

@inject('codePushStore', 'appInfo')
@observer
class CodePushScene extends React.Component<Props> {
  componentWillMount() {
    this.props.codePushStore!.getFreshData()
  }

  render() {
    const {downloadProgress} = this.props.codePushStore!
    return (
      <View style={{flex: 1, padding: 20}}>
        <View style={styles.statusSection}>
          <Text style={{marginTop: 20}}>
            <Text style={styles.bold}>Version: </Text>
            <Text>{this.props.appInfo!.nativeVersion}</Text>
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
        {downloadProgress > 0 && (
          <ProgressViewIOS progress={downloadProgress} style={{marginVertical: 10}} />
        )}
        <SyncStatus />
      </View>
    )
  }
}

const Metadata = inject('codePushStore')(
  observer(({codePushStore}: Props) => {
    if (codePushStore!.refreshing) {
      return <Text>retrieving CodePush status...</Text>
    }
    if (codePushStore!.metadata) {
      const {description, label, isFirstRun, isMandatory, packageSize} = codePushStore!.metadata
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
  observer(({codePushStore}: Props) => {
    let inner
    if (codePushStore!.refreshing || codePushStore!.syncing) inner = <ActivityIndicator />
    else if (!codePushStore!.channelUpdates.length)
      inner = <Text>{`No updates available for ${settings.codePushFlavor}`}</Text>
    else {
      inner = (
        <View>
          <Text>{`Available updates for ${settings.codePushFlavor}:`}</Text>
          {codePushStore!.channelUpdates.map(c => (
            <TouchableOpacity
              key={c.key}
              style={[styles.syncButton]}
              onPress={() => codePushStore!.sync(c)}
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
  observer(({codePushStore}: Props) => {
    const {syncStatus: status} = codePushStore!
    if (status.length) {
      return (
        <View style={{marginTop: 20}}>
          {status.map(s => (
            <Text key={s}>{s}</Text>
          ))}
        </View>
      )
    } else {
      return null
    }
  })
)

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

import React, {useState} from 'react'
import {TouchableOpacity, StyleSheet} from 'react-native'
import t from 'tcomb-form-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import Screen from './Screen'
import _ from 'lodash'
import {RText} from './common'
import {colors} from '../constants'
import {useLocationStore} from 'src/utils/injectors'
import {observer} from 'mobx-react'

const Form = t.form.Form

const debuggerSettings = t.struct({
  distanceFilter: t.Number,
  autoSyncThreshold: t.Number,
  uploadUrl: t.maybe(t.String),
})

const options = {
  fields: {
    distanceFilter: {
      label: 'distanceFilter (in meters)',
    },
    autoSyncThreshold: {
      label: 'autoSyncThreshold (maximum batch size)',
    },
    uploadUrl: {
      label: 'URL to upload to',
      autoCapitalize: 'none',
    },
  },
}

const LocationDebug = observer(() => {
  const {configOptions, setBackgroundConfig, emailLog, uploadLog} = useLocationStore()
  const [uploadStatusText, setUploadStatusText] = useState('')

  return (
    <Screen style={{flex: 1, paddingVertical: 20}}>
      <KeyboardAwareScrollView style={{flex: 1, paddingHorizontal: 20}}>
        <Form
          type={debuggerSettings}
          options={options}
          onChange={config => {
            // Some settings should be ints, not strings
            config.autoSyncThreshold = parseInt(config.autoSyncThreshold)
            config.distanceFilter = parseInt(config.distanceFilter)
            setBackgroundConfig(config)
          }}
          value={configOptions}
        />
        <TouchableOpacity
          onPress={() => {
            setUploadStatusText('Uploading ...')
            uploadLog()
              .then(_unused => {
                setUploadStatusText('Done')
              })
              .catch(error => {
                setUploadStatusText(`${error ? `${error}` : 'Error'}`)
              })
          }}
          style={styles.button}
        >
          <RText size={20} color={colors.WHITE}>
            Upload log
          </RText>
        </TouchableOpacity>
        {!!uploadStatusText && (
          <RText
            size={20}
            style={{
              textAlign: 'center',
              width: 120,
            }}
          >
            {uploadStatusText}
          </RText>
        )}
        <TouchableOpacity onPress={() => emailLog()} style={styles.button}>
          <RText size={20} color={colors.WHITE}>
            Email log
          </RText>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </Screen>
  )
})

export default LocationDebug

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.PINK,
    padding: 5,
    borderRadius: 2,
    marginTop: 20,
    width: 120,
    alignItems: 'center',
  },
})

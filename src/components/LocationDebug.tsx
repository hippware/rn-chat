import React from 'react'
import {TouchableOpacity} from 'react-native'
import t from 'tcomb-form-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {BG_STATE_PROPS} from '../store/LocationStore'
import Screen from './Screen'
import _ from 'lodash'
import {RText} from './common'
import {colors} from '../constants'
import {useLocationStore} from 'src/utils/injectors'
import {observer} from 'mobx-react'

const Form = t.form.Form

const debuggerSettings = t.struct({
  debug: t.Boolean,
  debugSounds: t.Boolean,
  distanceFilter: t.Number,
  autoSyncThreshold: t.Number,
})

const options = {
  fields: {
    debug: {
      label: 'Background location debug mode',
    },
    distanceFilter: {
      label: 'distanceFilter (in meters)',
    },
    autoSyncThreshold: {
      label: 'autoSyncThreshold (maximum batch size)',
    },
  },
}

const LocationDebug = observer(() => {
  const {backgroundOptions, debugSounds, setBackgroundConfig, emailLog} = useLocationStore()
  if (!backgroundOptions) return null
  let value = _.pick(backgroundOptions, BG_STATE_PROPS)
  value = _.assign(value, {debugSounds})

  return (
    <Screen style={{flex: 1, paddingVertical: 20}}>
      <KeyboardAwareScrollView style={{flex: 1, paddingHorizontal: 20}}>
        <Form
          type={debuggerSettings}
          options={options}
          onChange={setBackgroundConfig}
          value={value}
        />
        <TouchableOpacity
          // Calling emailLog with empty string seems to work
          onPress={() => {
            emailLog('')
          }}
          style={{
            backgroundColor: colors.PINK,
            padding: 5,
            borderRadius: 2,
            marginTop: 20,
            width: 120,
            alignItems: 'center',
          }}
        >
          <RText size={20} color={colors.WHITE}>
            Email log
          </RText>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </Screen>
  )
})

export default LocationDebug

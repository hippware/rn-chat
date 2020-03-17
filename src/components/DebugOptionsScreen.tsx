import React from 'react'
import {observer} from 'mobx-react'
import {TouchableOpacity, View} from 'react-native'
import {RText, Switch} from './common'
import {colors} from '../constants'
import Screen from './Screen'
import {useLocationStore, useWocky} from 'src/utils/injectors'

const DebugOptionsScreen = observer(() => {
  const {emailLog} = useLocationStore()
  const {profile, userFullAudit} = useWocky()

  return profile ? (
    <Screen style={{flex: 1, paddingVertical: 10}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderColor: colors.DARK_GREY,
          paddingVertical: 20,
          paddingHorizontal: 30,
        }}
      >
        <RText size={16} color={colors.DARK_PURPLE}>
          Enable Logging
        </RText>
        <Switch
          isOn={!!profile.fullAudit}
          onColor={colors.PINK}
          offColor={colors.GREY}
          onToggle={value => {
            userFullAudit(value).then(_successful => {
              profile.setFullAudit(value)
            })
          }}
        />
      </View>
      {!!profile.fullAudit && (
        <View
          style={{
            marginTop: 20,
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => emailLog()}
            style={{
              borderWidth: 1,
              borderRadius: 12,
              borderColor: colors.PINK,
              padding: 10,
              width: 225,
            }}
          >
            <RText
              size={16}
              color={colors.PINK}
              style={{
                textAlign: 'center',
              }}
            >
              Email log
            </RText>
          </TouchableOpacity>
        </View>
      )}
    </Screen>
  ) : null
})

export default DebugOptionsScreen

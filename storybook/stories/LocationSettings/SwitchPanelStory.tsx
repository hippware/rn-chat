import React, {useState} from 'react'
import LocationSwitchPanel, {
  ShareType,
} from '../../../src/components/ProfileDetail/LocationSwitchPanel'
import {View} from 'react-native'

export default () => {
  const [shareType, setShareType] = useState<ShareType>('ALWAYS')
  return (
    <View
      style={{alignItems: 'center', justifyContent: 'center', width: '70%', alignSelf: 'center'}}
    >
      <LocationSwitchPanel
        onTypeToggle={x => {
          // console.log('type toggle', x)
          setShareType(x)
        }}
        shareType={shareType}
      />
    </View>
  )
}

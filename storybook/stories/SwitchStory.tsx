import React, {useState} from 'react'
import {View} from 'react-native'
import {Switch} from '../../src/components/common'

export default () => {
  const [on, setOn] = useState(false)
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Switch
        isOn={on}
        onColor="#FE5C6C"
        offColor="#D3D3D3"
        // size="regular"
        onToggle={isOn => {
          setOn(!on)
        }}
      />
    </View>
  )
}

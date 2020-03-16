import React from 'react'
import {observer} from 'mobx-react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {RText} from './common'
import {colors} from '../constants'
import Screen from './Screen'
import {useLocationStore} from 'src/utils/injectors'

const DebugOptionsScreen = observer(() => {
  const {emailLog} = useLocationStore()

  return (
    <Screen>
      <TouchableOpacity onPress={() => emailLog()}>
        <RText size={20}>Email log</RText>
      </TouchableOpacity>
    </Screen>
  )
})

export default DebugOptionsScreen

const styles = StyleSheet.create({})

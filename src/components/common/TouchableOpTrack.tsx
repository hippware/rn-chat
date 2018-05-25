import React from 'react'
import {TouchableOpacity} from 'react-native'
import {inject} from 'mobx-react/native'

type Props = {
  trackName: string
  trackData?: object
  onPress: (args?: any) => void
  analytics?: any
  style?: any
}

const TouchableOpTrack = inject('analytics')((props: Props) => (
  <TouchableOpacity
    {...props}
    onPress={(...args) => {
      props.analytics.track(props.trackName, props.trackData)
      props.onPress(...args)
    }}
  />
))

export default TouchableOpTrack

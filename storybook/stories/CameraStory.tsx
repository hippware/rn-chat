import React, {useEffect} from 'react'
import {View} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'

export default () => {
  useEffect(() => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log(image)
      })
      .catch(e => console.log('error:', e))
  })
  return <View />
}

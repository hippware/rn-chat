import React from 'react'
import {View, Image, TouchableOpacity} from 'react-native'
import RTextInput from './RTextInput'

const OwnTextInput = ({onChangeText, value, ...props}) => {
  return (
    <View style={{flexDirection: 'row', marginEnd: 20}}>
      <RTextInput {...props} onChangeText={onChangeText} value={value} clearButtonMode="never" />
      {!!value && (
        <TouchableOpacity onPress={() => onChangeText('')} style={{marginTop: -3, height: 24}}>
          <Image source={require('../../../images/clearButton.png')} />
        </TouchableOpacity>
      )}
    </View>
  )
}
export default OwnTextInput

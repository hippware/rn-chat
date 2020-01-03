import React from 'react'
import {View, TextInput, Image, TouchableOpacity} from 'react-native'

const OwnTextInput = ({onChangeText, value, ...props}) => {
  return (
    <View style={{flexDirection: 'row', marginEnd: 20}}>
      <TextInput
        {...props}
        style={{flex: 1, marginEnd: 0}}
        onChangeText={onChangeText}
        value={value}
        clearButtonMode="never"
      />
      {!!value && (
        <TouchableOpacity onPress={() => onChangeText('')} style={{marginTop: -3, height: 24}}>
          <Image source={require('../../../images/clearButton.png')} />
        </TouchableOpacity>
      )}
    </View>
  )
}
export default OwnTextInput

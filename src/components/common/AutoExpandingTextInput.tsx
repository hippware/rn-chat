import React, {useState} from 'react'
import {TextInput, TextInputProps} from 'react-native'

interface IProps extends TextInputProps {}

const AutoExpandingTextInput = (props: IProps) => {
  const [height, setHeight] = useState(0)

  return (
    <TextInput
      {...props}
      multiline
      onContentSizeChange={({nativeEvent}) => setHeight(nativeEvent.contentSize.height)}
      style={[props.style, {height: Math.max(35, height)}]}
    />
  )
}

export default AutoExpandingTextInput

import React, {useState} from 'react'
import {TextInputProps} from 'react-native'
import RTextInput from './RTextInput'

interface IProps extends TextInputProps {}

const AutoExpandingTextInput = (props: IProps) => {
  const [height, setHeight] = useState(0)

  return (
    <RTextInput
      {...props}
      multiline
      onContentSizeChange={({nativeEvent}) => setHeight(nativeEvent.contentSize.height)}
      style={[props.style, {height: Math.max(35, height)}]}
    />
  )
}

export default AutoExpandingTextInput

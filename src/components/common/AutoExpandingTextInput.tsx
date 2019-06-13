import React from 'react'
import {TextInput, TextInputProps} from 'react-native'

interface IProps extends TextInputProps {
  height?: number
  maxHeight?: number
}

type State = {
  text: string
  height: number
}

export default class AutoExpandingTextInput extends React.Component<IProps, State> {
  state = {text: '', height: 0}

  constructor(props) {
    super(props)
    this.state = {text: props.value || '', height: 0}
  }

  componentWillReceiveProps(props) {
    if (props.value !== undefined) {
      this.setState({text: props.value})
    }
    if (props.value === '') {
      this.setState({height: 0})
    }
  }

  render() {
    return (
      <TextInput
        multiline
        onChangeText={text => this.setState({text})}
        onContentSizeChange={({nativeEvent}) =>
          this.setState({height: nativeEvent.contentSize.height})
        }
        style={[this.props.style, {height: Math.max(this.props.height || 35, this.state.height)}]}
        value={this.state.text}
        {...this.props}
      />
    )
  }
}

import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  TextInput,
} from 'react-native';

class TextInputLines extends Component {
  props: {
    maxLines: ?number,
    lineHeight: ?number,
  };
  state = {limit: false};

  render() {
    const {style, maxLines = 40, onChangeText, lineHeight, onContentSizeChange} = this.props;
    const textHeight = lineHeight || (style && style.fontSize + 5);
    return (
      <TextInput
        style={style}
        {...this.props}
        onChangeText={text => !this.state.limit && onChangeText(text)}
        onContentSizeChange={(event) => {
          if (textHeight && maxLines && event.nativeEvent.contentSize.height > maxLines * textHeight) {
            this.setState({limit: true});
          } else {
            this.setState({limit: false});
            if (onContentSizeChange) {
              onContentSizeChange(event);
            }
          }
        }}
      />
    );
  }
}

export default TextInputLines;

import React, {Component} from 'react';
import {Text} from 'react-native';

export default class extends Component {
  render() {
    return (
      <Text
        numberOfLines={0}
        style={[
          {
            fontFamily: 'Roboto-Regular',
            color: this.props.isDay ? 'rgb(81,67,96)' : 'white',
            fontSize: 15,
          },
          this.props.style,
        ]}
      >
        {this.props.children}
      </Text>
    );
  }
}

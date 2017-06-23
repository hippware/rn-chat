import React from 'react';
import {View} from 'react-native';
import {k} from '../globals';

export default class extends React.Component {
  render() {
    return (
      <View
          style={{
            height: (this.props.width || 2) * k,
            backgroundColor: 'rgba(155,155,155,0.15)',
          }}
      />
    );
  }
}

import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {k} from './Global';
import {colors} from '../constants';

export default class SaveButton extends React.Component {
  render() {
    const title = this.props.title || 'Save';
    return this.props.active
      ? <TouchableOpacity
          onPress={this.props.onSave}
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: 60 * k,
            height: 70 * k,
            justifyContent: 'center',
            alignItems: 'center',
          }}
      >
          <Text
              style={{
                paddingTop: 14 * k,
                fontFamily: 'Roboto-Regular',
                fontSize: 15,
                backgroundColor: 'transparent',
                color: this.props.active ? this.props.color || 'rgb(254,92,108)' : colors.DARK_GREY,
              }}
          >
            {title}
          </Text>
        </TouchableOpacity>
      : <View
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: 60 * k,
            height: 70 * k,
            justifyContent: 'center',
            alignItems: 'center',
          }}
      >
          <Text
              style={{
                paddingTop: 14 * k,
                fontFamily: 'Roboto-Regular',
                fontSize: 15,
                backgroundColor: 'transparent',
                color: this.props.active ? 'rgb(254,92,108)' : colors.DARK_GREY,
              }}
          >
            {title}
          </Text>
        </View>;
  }
}

SaveButton.defaultProps = {
  active: true,
};

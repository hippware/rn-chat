import React from 'react';
import {PixelRatio, Image, View, Text, TouchableOpacity, TextInput} from 'react-native';
import {GiftedForm, GiftedFormManager} from 'react-native-gifted-form';
import WidgetMixin from 'react-native-gifted-form/mixins/WidgetMixin';
import TextInputWidget from './TextInputWidget';
import {k} from '../globals';
import assert from 'assert';
import {colors} from '../constants';

const NORMAL_HEIGHT = 51;
const HIGHLIGHTED_HEIGHT = 71;

export default class MyAccountTextInput extends React.Component {
  render() {
    return (
      <TextInputWidget
          onDeleteSign
          autoCorrect={false}
          autoCapitalize='none'
          maxLength={30}
          placeholderTextColor='rgba(155,155,155,1)'
          widgetStyles={{
            textInputInline: {
              marginTop: 0,
              height: NORMAL_HEIGHT * k,
              color: this.props.isDay ? colors.DARK_PURPLE : 'white',
              fontFamily: 'Roboto-Regular',
              fontSize: 15 * k,
            },
            rowContainer: {
              backgroundColor: 'transparent',
              borderBottomWidth: 1 * k,
              borderColor: 'rgba(155,155,155,0.15)',
            },
            row: {left: 4 * k, height: NORMAL_HEIGHT * k, backgroundColor: 'transparent'},
            validationErrorRow: {
              paddingLeft: 10,
              paddingRight: 5,
              paddingBottom: 0,
              paddingTop: 10,
            },
            validationError: {fontSize: 13 * k, color: 'rgb(254,92,108)'},
          }}
          testID={this.props.name}
          {...this.props}
      />
    );
  }
}

MyAccountTextInput.propTypes = {
  isDay: React.PropTypes.bool.isRequired,
};

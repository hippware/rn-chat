import React, {PropTypes} from 'react';
import {PixelRatio, Image, View, Text, TouchableOpacity, TextInput} from 'react-native';
import {InlineTextInput} from 'react-native-stateless-form';
import {validate} from 'validate-model';
import autobind from 'autobind-decorator';
import {k} from './Global';
import {colors} from '../constants';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';

@autobind
@observer
export default class SignUpTextInput extends React.Component {
  @observable message = '';
  @observable valid = undefined;
  componentDidMount() {
    this.scrollTo = 0;
    if (this.props.autofocus) {
      this.focus();
    }
  }

  handleLayout(event) {
    this.scrollTo = event.nativeEvent.layout.y;
  }

  handleFocus() {}

  focus() {
    this.refs.input.focus();
  }
  blur() {
    this.refs.input.blur();
  }
  setText(text) {
    const {name, data} = this.props;
    data[name] = text;
    if (data.validate) {
      const {valid, messages} = data.validate(name);
      this.valid = valid;
      this.message = messages && messages.length > 0 ? messages[0] : null;
    }
  }
  handleSubmitEditing() {
    const {nextInput, onSubmit, onNextInputFocus} = this.props;
    onNextInputFocus && onNextInputFocus(nextInput, this);
    if (!nextInput && this.valid) {
      onSubmit && onSubmit(this);
    }
  }
  render() {
    const {icon, label, name, data, autofocus, nextInput, onBlur} = this.props;
    const value = data[name];

    return (
      <View style={{marginLeft: 36 * k, marginRight: 36 * k}} onLayout={this.handleLayout}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 55 * k, justifyContent: 'center', alignItems: 'center'}}>
            {icon && <Image source={icon} />}
          </View>
          <View style={{flex: 1}}>
            <View style={{height: 50 * k}}>
              {!!this.message && <Text style={{fontSize: 11 * k, fontFamily: 'Roboto-Regular', color: colors.PINK}}>{this.message}</Text>}
              <TextInput
                  style={{height: 24 * k, flex: 1, color: colors.DARK_PURPLE, fontFamily: 'Roboto-Regular', fontSize: 18 * k}}
                  placeholder={label}
                  onFocus={this.handleFocus}
                  onBlur={onBlur}
                  clearButtonMode='while-editing'
                  underlineColorAndroid='transparent'
                  returnKeyType={nextInput ? 'next' : 'done'}
                  onSubmitEditing={this.handleSubmitEditing}
                  ref='input'
                  value={value}
                  onChangeText={this.setText}
                  placeholderTextColor={colors.GREY}
                  autofocus={autofocus}
              />
            </View>
          </View>
          <View style={{width: 22 * k, justifyContent: 'center', alignItems: 'center'}}>
            {this.valid !== undefined
              ? this.valid ? <Image source={require('../../images/checkMark.png')} /> : <Image source={require('../../images/x.png')} />
              : null}
          </View>
        </View>
        <View style={{height: 1, backgroundColor: colors.DARK_PURPLE, opacity: 0.2}} />
      </View>
    );
  }
}

SignUpTextInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  valid: PropTypes.bool,
};

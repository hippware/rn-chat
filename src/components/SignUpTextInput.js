// @flow

import React from 'react';
import {Image, View, Text, TextInput} from 'react-native';
import autobind from 'autobind-decorator';
import {k} from './Global';
import {colors} from '../constants';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';

type Props = {
  autofocus?: boolean,
  icon?: any,
  label: string,
  name?: string,
  data?: Object,
  nextInput?: any,
  onSubmit?: Function,
  onNextInputFocus?: Function,
  onBlur?: Function,
  value?: string,
};

@autobind
@observer
export default class SignUpTextInput extends React.Component {
  @observable message = '';
  @observable valid = undefined;
  props: Props;
  scrollTo: number;
  input: Object;

  componentDidMount() {
    this.scrollTo = 0;
    if (this.props.autofocus) {
      this.focus();
    }
  }

  handleLayout(event: Object) {
    this.scrollTo = event.nativeEvent.layout.y;
  }

  handleFocus() {}

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  async setText(text: string) {
    const {name, data} = this.props;
    data[name] = text;
    if (data.validate) {
      try {
        await data.validate(name);
        this.valid = true;
        this.message = '';
      } catch (e) {
        this.valid = false;
        this.message = e;
      }
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

    return (
      <View style={{marginHorizontal: 36 * k}} onLayout={this.handleLayout}>
        {!!this.message &&
          <Text style={{fontSize: 11 * k, fontFamily: 'Roboto-Regular', color: colors.PINK, marginLeft: 40 * k, marginTop: 5 * k}}>
            {this.message}
          </Text>}
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          {icon ? <Image source={icon} style={{width: 40 * k}} resizeMode='contain' /> : <View style={{width: 40 * k}} />}
          <View style={{flex: 1, height: 50 * k}}>
            <TextInput
              style={{height: 24 * k, flex: 1, color: colors.DARK_PURPLE, fontFamily: 'Roboto-Regular', fontSize: 18 * k}}
              placeholder={label}
              onFocus={this.handleFocus}
              onBlur={onBlur}
              clearButtonMode='while-editing'
              underlineColorAndroid='transparent'
              returnKeyType={nextInput ? 'next' : 'done'}
              onSubmitEditing={this.handleSubmitEditing}
              ref={r => (this.input = r)}
              value={data && data[name]}
              onChangeText={this.setText}
              placeholderTextColor={colors.GREY}
              autofocus={autofocus}
              {...this.props}
            />
          </View>
          <View style={{width: 22 * k, justifyContent: 'center', alignItems: 'center'}}>
            {this.valid !== undefined ? (this.valid ? <Image source={require('../../images/checkMark.png')} /> : <Image source={require('../../images/x.png')} />) : null}
          </View>
        </View>
        <View style={{height: 1, backgroundColor: colors.DARK_PURPLE, opacity: 0.2}} />
      </View>
    );
  }
}

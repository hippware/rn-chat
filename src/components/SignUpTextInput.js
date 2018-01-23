// @flow

import React from 'react';
import {Image, View, Text, TextInput} from 'react-native';
import autobind from 'autobind-decorator';
import {k} from './Global';
import {colors} from '../constants';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';
import {validateProfile, ValidateItem} from '../store/validationStore';

type Props = {
  autofocus?: boolean,
  icon?: any,
  label: string,
  name: string,
  nextInput?: any,
  onSubmit?: Function,
  store: ?ValidateItem,
};

@autobind
@observer
export default class SignUpTextInput extends React.Component<Props> {
  // scrollTo: number;
  input: any;

  componentDidMount() {
    // this.scrollTo = 0;
    // if (this.props.autofocus) {
    //   this.focus();
    // }
  }

  handleLayout(event: Object) {
    // this.scrollTo = event.nativeEvent.layout.y;
  }

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  render() {
    const {icon, label, store} = this.props;

    return (
      <View style={{marginHorizontal: 36 * k}} onLayout={this.handleLayout}>
        {store && <Text style={{fontSize: 11 * k, fontFamily: 'Roboto-Regular', color: colors.PINK, marginLeft: 40 * k, marginTop: 5 * k}}>{store.errorMessage}</Text>}
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          {icon ? <Image source={icon} style={{width: 40 * k}} resizeMode='contain' /> : <View style={{width: 40 * k}} />}
          <View style={{flex: 1, height: 50 * k}}>
            <TextInput
              style={{height: 24 * k, flex: 1, color: colors.DARK_PURPLE, fontFamily: 'Roboto-Regular', fontSize: 18 * k}}
              placeholder={label}
              clearButtonMode='while-editing'
              underlineColorAndroid='transparent'
              ref={r => (this.input = r)}
              placeholderTextColor={colors.GREY}
              returnKeyType='next'
              onChangeText={(text) => {
                if (store) store.value = text;
              }}
              value={store && store.value}
              {...this.props}
            />
          </View>
          <View style={{width: 22 * k, justifyContent: 'center', alignItems: 'center'}}>
            {store && store.isValid !== undefined ? (
              store.isValid ? (
                <Image source={require('../../images/checkMark.png')} />
              ) : (
                <Image source={require('../../images/x.png')} />
              )
            ) : null}
          </View>
        </View>
        <View style={{height: 1, backgroundColor: colors.DARK_PURPLE, opacity: 0.2}} />
      </View>
    );
  }
}

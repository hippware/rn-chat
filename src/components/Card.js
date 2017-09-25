// @flow

import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {k} from './Global';
import {observer} from 'mobx-react/native';
import location from '../store/locationStore';
import {colors} from '../constants';

type Props = {
  isDay: boolean,
  style: any,
  innerStyle: any,
  onPress: Function,
  footer: any,
  children: any,
};

export default observer((props: Props) => {
  const {style, children, onPress, footer, innerStyle, ...rest} = props;
  const isDay = props.isDay === undefined ? location.isDay : props.isDay;
  const backgroundColor = isDay ? colors.backgroundColorCardDay : colors.backgroundColorCardNight;
  const inner = (
    <View {...rest} style={[styles.container, style]}>
      <View style={[styles.inner, {backgroundColor}, innerStyle]}>{React.Children.map(children, child => (child && props ? React.cloneElement(child, rest) : child))}</View>
      {footer}
    </View>
  );
  return onPress ? <TouchableOpacity onPress={onPress}>{inner}</TouchableOpacity> : inner;
});

const styles = StyleSheet.create({
  container: {
    paddingRight: 15 * k,
    paddingLeft: 15 * k,
    paddingTop: 13 * k,
    paddingBottom: 10 * k,
  },
  inner: {
    borderColor: 'white',
    borderRadius: 2,
    shadowOffset: {height: 1, width: 0},
    shadowRadius: 2,
    shadowOpacity: 0.12,
  },
});

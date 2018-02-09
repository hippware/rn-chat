// @flow

import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {colors} from '../constants';

const {backgroundColorCardDay} = colors;

type Props = {
  style?: any,
  innerStyle?: any,
};

const CardList = (props: Props) => {
  const {style, innerStyle, ...others} = props;
  const backgroundColor = backgroundColorCardDay;
  return <FlatList {...others} contentContainerStyle={[styles.inner, {backgroundColor}, innerStyle]} />;
};

export default CardList;

const styles = StyleSheet.create({
  inner: {
    borderWidth: 0,
    borderColor: 'white',
    borderRadius: 2,
    shadowOffset: {height: 1, width: 0},
    shadowRadius: 2,
    shadowOpacity: 0.12,
  },
});

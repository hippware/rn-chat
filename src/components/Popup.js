// @flow

import React from 'react';
import {ScrollView, Image, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {k, width, height} from './Global';
import {BlurView} from 'react-native-blur';

type Props = {
  title: string,
  children?: any,
};

export default ({title, children}: Props) => (
  <BlurView blurType='light' blurAmount={10} style={styles.container}>
    <View
      style={{
        position: 'absolute',
        right: 15 * k,
        left: 15 * k,
        top: 40 * k,
        bottom: 40 * k,
      }}
    >
      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          borderRadius: 2 * k,
          opacity: 0.9,
          backgroundColor: 'white',
        }}
      >
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 40 * k,
              height: 50 * k,
            }}
            onPress={() => Actions.pop()}
          >
            <Image style={{}} source={require('../../images/iconClose.png')} />
          </TouchableOpacity>
        </View>
        <View style={{height: 1 * k, backgroundColor: 'rgba(155,155,155,0.15)'}} />
        <ScrollView style={{paddingLeft: 21 * k, paddingRight: 21 * k}}>{children}</ScrollView>
      </View>
    </View>
  </BlurView>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    paddingLeft: 21 * k,
    backgroundColor: 'transparent',
    paddingTop: 14 * k,
    paddingBottom: 14 * k,
    color: 'rgb(38,30,47)',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
  },
});

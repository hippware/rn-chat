/* @flow */

import React from 'react';

import {TabView, createNavigator, createNavigationContainer, TabRouter} from 'react-navigation';
import { RNCubeTransition } from 'react-native-cube-transition';
import { Image, Dimensions, Text, StyleSheet, View } from 'react-native';
import CubeTransition from './CubeTransition';

const CubeNavigator = (
  routeConfigs, config
) => {
  const router = TabRouter(routeConfigs, config);
  const navigator = createNavigator(
    router,
    routeConfigs,
    config
  )((props: *) => (
    <View style={styles.container}>
      <RNCubeTransition style={styles.page}>
    <TabView
      {...props}
    /></RNCubeTransition>
    </View>
  ));

  return createNavigationContainer(navigator, config.containerConfig);

};

export default CubeNavigator;

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
  },
  page: {
    position: 'absolute',
    flexDirection: 'row',
    overflow: 'hidden',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  image: {
    resizeMode: 'stretch',
    width,
    height,
  },
  view: {
    backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
    width,
    height,
  },
  text: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 30,
  },
});
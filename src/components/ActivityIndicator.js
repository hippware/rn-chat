// @flow

import React from 'react';
import {View, ActivityIndicator} from 'react-native';
var styles = require('./styles');

export default ({active}: {active: boolean}) =>
    active
        ? <View style={styles.loadingContainer}>
              <View style={styles.loading}>
                  <ActivityIndicator size='large' />
              </View>
          </View>
        : <View />;

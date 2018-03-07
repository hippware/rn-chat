// @flow

import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Linking} from 'react-native';
import {colors} from '../constants';
import {k} from './Global';
import {RText, Separator} from './common';
import {Actions} from 'react-native-router-flux';
import {observer, inject} from 'mobx-react/native';
import {autorun} from 'mobx';

const footprint = require('../../images/footprint.png');

type Props = {};

@inject('locationStore', 'store')
@observer
class LocationPrimer extends React.Component<Props> {
  handler: any;

  componentDidMount() {
    this.handler = autorun(() => {
      if (this.props.locationStore.alwaysOn) {
        this.props.store.dismissLocationPrimer();
        Actions.pop();
      }
    });
  }

  componentWillUnmount() {
    this.handler();
  }

  dismiss = () => {
    this.props.store.dismissLocationPrimer();
    Actions.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={footprint} style={{width: 60, height: 60, marginVertical: 25 * k}} resizeMode='contain' />
        <RText style={styles.title} size={30} color='white'>
          {"Find out who's at\r\nyour favorite\r\nplaces!"}
        </RText>
        <Separator backgroundColor='white' style={{width: 200 * k}} />
        <RText style={styles.muted} color='white' size={14}>
          {'Please set location settings to "always allow".'}
        </RText>
        <View style={{marginVertical: 25 * k, alignSelf: 'stretch', alignItems: 'stretch'}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Linking.openURL('app-settings:{1}');
            }}
          >
            <RText color='white' size={17.5}>
              Give Access
            </RText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonCancel]} onPress={this.dismiss}>
            <RText color='white' size={17.5}>
              Not Now
            </RText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default LocationPrimer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30 * k,
  },
  title: {
    marginVertical: 15 * k,
    lineHeight: 32 * k,
    textAlign: 'center',
  },
  muted: {
    marginTop: 10 * k,
    textAlign: 'center',
  },
  button: {
    height: 50 * k,
    borderWidth: 0,
    borderRadius: 5 * k,
    backgroundColor: colors.PINK,
    alignItems: 'center',
    margin: 10 * k,
    justifyContent: 'center',
  },
  buttonCancel: {
    backgroundColor: 'transparent',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'white',
  },
});

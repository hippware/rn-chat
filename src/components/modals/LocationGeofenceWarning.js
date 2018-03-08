// @flow

import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Linking} from 'react-native';
import {colors} from '../../constants';
import {k} from '../Global';
import {RText, Separator} from '../common';
import {Actions} from 'react-native-router-flux';
import {observer, inject} from 'mobx-react/native';
import {reaction} from 'mobx';
import ModalContainer from './ModalContainer';

const footprint = require('../../../images/footprint.png');

type Props = {
  bot: Bot,
};

@inject('locationStore')
@observer
class LocationGeofenceWarning extends React.Component<Props> {
  handler: any;
  componentDidMount() {
    this.handler = reaction(
      () => this.props.locationStore.alwaysOn,
      (alwaysOn) => {
        if (alwaysOn) {
          this.props.bot.setGeofence(true);
          Actions.pop();
        }
      },
    );
  }
  componentWillUnmount() {
    this.handler();
  }
  render() {
    return (
      <ModalContainer>
        <Image source={footprint} style={{width: 60, height: 60, marginVertical: 25 * k}} resizeMode='contain' />
        <RText style={styles.title} size={30} color='white'>
          {'Allow Location\r\nAccess'}
        </RText>
        <Separator backgroundColor='white' style={{width: 200 * k}} />
        <RText style={styles.muted} color='white' size={14}>
          Please change your location settings to “always allow” to receive presence updates.
        </RText>
        <View style={{marginVertical: 25 * k, alignSelf: 'stretch', alignItems: 'stretch'}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Linking.openURL('app-settings:{1}');
            }}
          >
            <RText color='white' size={17.5}>
              Always Allow
            </RText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonCancel]} onPress={Actions.pop}>
            <RText color='white' size={17.5}>
              Cancel
            </RText>
          </TouchableOpacity>
        </View>
      </ModalContainer>
    );
  }
}

export default LocationGeofenceWarning;

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

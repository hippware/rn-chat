import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity, Linking} from 'react-native';
import {when} from 'mobx';
import {Actions} from 'react-native-router-flux';
import {colors} from '../constants';
import locationStore from '../store/locationStore';
import {k} from './Global';
import PopupBlur from './PopupBlur';

const botIcon = require('../../images/iconBot.png');

class LocationWarning extends React.Component {
  componentDidMount() {
    when(() => locationStore.enabled, Actions.pop);
  }

  render() {
    return (
      <PopupBlur>
        <Text style={[styles.title, {textAlign: 'center'}]}>{'Allow Location\r\nAccess'}</Text>
        <Image source={botIcon} style={{width: 60, height: 60, marginVertical: 15 * k}} resizeMode='contain' />
        <Text style={[styles.muted, {textAlign: 'center'}]}>{'We need your location to show you\r\nwhat\'s happening nearby!'}</Text>
        <View style={{flexDirection: 'row', marginVertical: 20 * k}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Actions.pop();
              // Actions.home();
              Linking.openURL('app-settings:{1}');
            }}
          >
            <Text style={styles.btnText}>Change Settings</Text>
          </TouchableOpacity>
        </View>
      </PopupBlur>
    );
  }
}

export default LocationWarning;

const styles = StyleSheet.create({
  title: {
    marginTop: 10 * k,
    color: colors.PINK,
    fontSize: 30,
    lineHeight: 32 * k,
    fontFamily: 'Roboto-Light',
  },
  muted: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    color: colors.DARK_GREY,
    marginTop: 5 * k,
  },
  button: {
    flex: 1,
    height: 50 * k,
    borderWidth: 0,
    borderRadius: 5 * k,
    backgroundColor: colors.PINK,
    alignItems: 'center',
    marginHorizontal: 5 * k,
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 15 * k,
    fontFamily: 'Roboto-Regular',
    color: colors.WHITE,
  },
});

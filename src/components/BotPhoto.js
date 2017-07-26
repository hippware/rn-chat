// @flow

import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {observer} from 'mobx-react/native';
import botStore from '../store/botStore';
import SaveButton from './SaveButton';
import {k} from './Global';
import NavTitle from './NavTitle';
import Screen from './Screen';
import location from '../store/locationStore';
import {colors} from '../constants';
import {launchImageLibrary, launchCamera} from './ImagePicker';
import {Actions} from 'react-native-router-flux';
import Bot from '../model/Bot';
import botFactory from '../factory/botFactory';

const launchPicker = async (isLibrary: boolean, bot: Bot) => {
  const func = isLibrary ? launchImageLibrary : launchCamera;
  await func((source, response) => {
    botStore.publishImage({source, ...response}, bot);
  }, false);
};

const onTap = async (isLibrary: boolean, bot: Bot) => {
  try {
    await launchPicker(isLibrary, bot);
    Actions.pop();
  } catch (e) {
    alert(e);
  }
};

type Props = {
  item: string,
};

const BotPhoto = (props: Props) => {
  const bot = botFactory.create({id: props.item});
  const isDay = location.isDay;
  const subtitle = isDay ? styles.subtitleDay : styles.subtitleNight;
  const title = isDay ? styles.titleDay : styles.titleNight;
  return (
    <Screen isDay={isDay}>
      <View style={{flex: 1}}>
        <View style={{paddingTop: 166 * k, paddingBottom: 40 * k}}>
          <Text style={title}>Bots look prettier</Text>
          <Text style={title}>with photos</Text>
        </View>
        <View>
          <Text style={subtitle}>You can take a new photo</Text>
          <Text style={subtitle}>or add a photo from an</Text>
          <Text style={subtitle}>existing album</Text>
        </View>
        <TouchableOpacity
          onPress={() => onTap(false)}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 110 * k,
            height: 50 * k,
            right: 30 * k,
            left: 30 * k,
            borderRadius: 2,
            backgroundColor: colors.PINK,
          }}
        >
          <View style={{paddingRight: 15 * k}}>
            <Image source={require('../../images/iconTakeAPhoto.png')} />
          </View>
          <Text
            style={{
              letterSpacing: 0.7,
              color: 'white',
              fontSize: 15,
              fontFamily: 'Roboto-Regular',
            }}
          >
            Take a Photo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onTap(true, bot)}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 43 * k,
            height: 50 * k,
            right: 30 * k,
            left: 30 * k,
            borderRadius: 2,
            backgroundColor: 'white',
            borderColor: 'rgb(233,233,233)',
          }}
        >
          <View style={{paddingRight: 15 * k}}>
            <Image source={require('../../images/iconChooseExisting.png')} />
          </View>
          <Text
            style={{
              letterSpacing: 0.7,
              color: 'rgb(253,95,108)',
              fontSize: 15,
              fontFamily: 'Roboto-Regular',
            }}
          >
            Choose from Existing
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export default observer(BotPhoto);

const styles = StyleSheet.create({
  titleDay: {
    fontFamily: 'Roboto-Regular',
    fontSize: 30,
    backgroundColor: 'transparent',
    color: colors.DARK_PURPLE,
    textAlign: 'center',
  },
  titleNight: {
    fontFamily: 'Roboto-Regular',
    fontSize: 30,
    backgroundColor: 'transparent',
    color: 'white',
    textAlign: 'center',
  },
  subtitleDay: {
    fontFamily: 'Roboto-Light',
    fontSize: 18,
    backgroundColor: 'transparent',
    color: colors.DARK_PURPLE,
    textAlign: 'center',
  },
  subtitleNight: {
    fontFamily: 'Roboto-Light',
    fontSize: 18,
    backgroundColor: 'transparent',
    color: 'white',
    textAlign: 'center',
  },
});

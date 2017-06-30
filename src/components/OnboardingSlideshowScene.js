// @flow

import React from 'react';
import {Image, NativeModules, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';
import {DigitsLoginButton} from 'react-native-fabric-digits';
import statem from '../../gen/state';
import {colors} from '../constants';
import {k, settings} from '../globals';
import LinearGradient from 'react-native-linear-gradient'; // eslint-disable-line import/no-unresolved
const CarrierInfo = NativeModules.RNCarrierInfo;
import DeviceInfo from 'react-native-device-info';
import {BlurView} from 'react-native-blur';
import {getRegionCode} from '../store/phoneStore';
import {compose, withState, withHandlers, pure} from 'recompose';

const discoverBg = require('../../images/onboardingDiscoverBg.jpg');
const discoverIcon = require('../../images/onboardingDiscoverIcon.png');
const shareBg = require('../../images/onboardingShareBg.png');
const shareIcon = require('../../images/onboardingShareIcon.png');
const keepUpBg = require('../../images/onboardingKeepUpBg.png');
const keepUpIcon = require('../../images/onboardingKeepUpIcon.png');
const botIcon = require('../../images/iconBot.png');

let code;
CarrierInfo.isoCountryCode(result => (code = getRegionCode(result)));

const digitsOptions = {
  phoneNumber: code || '',
  title: 'tinyrobot',
  appearance: {
    backgroundColor: {
      hex: '#FFFFFF',
      alpha: 1,
    },
    logoImageName: 'pink',
    accentColor: {
      hex: '#FE5C6C',
      alpha: 1.0,
    },
    headerFont: {
      name: 'Roboto-Regular',
      size: 15,
    },
    labelFont: {
      name: 'Roboto-Regular',
      size: 18,
    },
    bodyFont: {
      name: 'Roboto-Light',
      size: 15,
    },
  },
};

const completion = (error, provider_data) => {
  if (error && error.code !== 1) {
    statem.profileRegister.failure(error.message);
  } else if (provider_data) {
    statem.promoScene.signIn({
      resource: DeviceInfo.getUniqueID(),
      provider_data,
    });
  }
};

const Slide = ({bgImg, iconImg, children}) => (
  <View style={styles.slide}>
    <View style={styles.background}>
      <Image source={bgImg} style={styles.backgroundImage} resizeMode='cover' />
      <LinearGradient colors={[colors.addAlpha(colors.WHITE, 0), colors.addAlpha(colors.WHITE, 1)]} style={styles.gradient} />
    </View>
    <View style={styles.spacer} />
    <View style={styles.textContainer}>
      <Image source={iconImg} style={styles.icon} />
      {children}
    </View>
  </View>
);

const BypassButton = () => {
  return settings.isStaging || settings.isTesting
    ? <TouchableOpacity onPress={() => statem.promoScene.testRegister({resource: DeviceInfo.getUniqueID()})} style={styles.bypassButton}>
        <Text style={{fontFamily: 'Roboto-Regular', color: colors.PINK}}>Bypass Digits</Text>
      </TouchableOpacity>
    : null;
};

const PhoneNumberPopup = ({togglePopup}) => (
  <View style={styles.absolute}>
    <View style={[styles.absolute, {backgroundColor: 'rgb(85, 85, 85)', opacity: 0.5}]} />
    <BlurView blurType='light' blurAmount={10} style={[styles.absolute, {alignItems: 'center', justifyContent: 'center'}]}>
      <View style={styles.popup}>
        <Text style={[styles.title, {textAlign: 'center'}]}>{`Please verify your\r\nphone number.`}</Text>
        <Image source={botIcon} style={{width: 60, height: 60, marginVertical: 15 * k}} resizeMode='contain' />
        <Text style={[styles.muted, {textAlign: 'center'}]}>{`Don't worry we won't share your\r\nphone number.`}</Text>
        <View style={{flexDirection: 'row', marginVertical: 20 * k}}>
          <DigitsLoginButton
              options={digitsOptions}
              completion={(error, provider_data) => {
                togglePopup();
                completion(error, provider_data);
              }}
              text='Okay!'
              buttonStyle={[styles.button, {marginHorizontal: 40 * k}]}
              textStyle={styles.btnText}
          />
        </View>
      </View>
    </BlurView>
  </View>
);

const PhoneVerify = ({togglePopup}) => (
  <View style={styles.footerButtons}>
    <DigitsLoginButton
        options={digitsOptions}
        completion={completion}
        text='Log in'
        buttonStyle={[styles.button, styles.login]}
        textStyle={[styles.btnText, styles.btnLoginText]}
    />
    <TouchableOpacity style={styles.button} onPress={togglePopup}>
      <Text style={styles.btnText}>Sign up</Text>
    </TouchableOpacity>
  </View>
);

const Onboarding = ({showPopup, togglePopup}) => (
  <View style={{flex: 1}}>
    <Swiper style={styles.wrapper} loop={false} paginationStyle={{bottom: 95}} dotColor={colors.GREY} activeDotColor={colors.PINK} bounces>
      <Slide bgImg={discoverBg} iconImg={discoverIcon}>
        <Text style={styles.title}>
          <Text style={styles.bold}>Discover</Text>
          {'\r\ninteresting\r\nplaces.'}
        </Text>
        <Text style={styles.muted}>{`We'll help you find exciting\r\nexperiences and places,\r\nno matter where you go.`}</Text>
      </Slide>
      <Slide bgImg={shareBg} iconImg={shareIcon}>
        <Text style={styles.title}>
          <Text style={styles.bold}>Share</Text>
          {' your\r\nfavorite places.'}
        </Text>
        <Text style={styles.muted}>{`Our mission is to connect\r\npeople with the places they\r\nlove.`}</Text>
      </Slide>
      <Slide bgImg={keepUpBg} iconImg={keepUpIcon}>
        <Text style={styles.title}>
          {`Keep up with\r\nwhat's\r\nhappening.`}
        </Text>
        <Text style={styles.muted}>{`Be in the know with your\r\nfriends’ favorite places across\r\nthe world.`}</Text>
      </Slide>
    </Swiper>
    <PhoneVerify togglePopup={togglePopup} />
    <BypassButton />
    {showPopup && <PhoneNumberPopup togglePopup={togglePopup} />}
  </View>
);

// prettier-ignore
const enhance = compose(
  withState('showPopup', 'setPopup', false),
  withHandlers({
    togglePopup: ({setPopup, showPopup}) => () => setPopup(!showPopup),
  })
);

export default enhance(Onboarding);

const FOOTER_HEIGHT = 75 * k;
const PERCENT_PAD_TOP = 35;

const styles = StyleSheet.create({
  absolute: {position: 'absolute', top: 0, left: 0, right: 0, bottom: 0},
  wrapper: {height: 500},
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: null,
    height: null,
  },
  gradient: {
    position: 'absolute',
    bottom: FOOTER_HEIGHT,
    left: 0,
    right: 0,
    height: 200 * k,
  },
  slide: {
    flex: 1,
  },
  title: {
    marginTop: 10 * k,
    color: colors.PINK,
    fontSize: 30,
    lineHeight: 32 * k,
    fontFamily: 'Roboto-Light',
  },
  bold: {
    fontFamily: 'Roboto-Bold',
  },
  muted: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    color: colors.DARK_GREY,
    marginTop: 5 * k,
  },
  spacer: {
    flex: PERCENT_PAD_TOP,
  },
  textContainer: {
    marginLeft: 40 * k,
    flex: 100 - PERCENT_PAD_TOP,
  },
  footerButtons: {
    height: FOOTER_HEIGHT,
    paddingHorizontal: 20 * k,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.WHITE,
  },
  bypassButton: {
    position: 'absolute',
    padding: 10 * k,
    bottom: 100 * k,
    right: 10 * k,
    backgroundColor: 'transparent',
    borderColor: colors.PINK,
    borderWidth: 1,
    borderRadius: 5,
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
  login: {
    borderWidth: 1,
    borderColor: colors.PINK,
    backgroundColor: colors.WHITE,
  },
  btnText: {
    fontSize: 15 * k,
    fontFamily: 'Roboto-Regular',
    color: colors.WHITE,
  },
  btnLoginText: {
    color: colors.PINK,
  },
  popup: {
    marginHorizontal: 30 * k,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 30 * k,
    borderRadius: 5 * k,
  },
});

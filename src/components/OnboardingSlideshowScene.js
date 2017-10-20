// @flow

import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';
import {Actions} from 'react-native-router-flux';
import {colors} from '../constants';
import {settings} from '../globals';
import {k} from './Global';
import LinearGradient from 'react-native-linear-gradient'; // eslint-disable-line import/no-unresolved
import DeviceInfo from 'react-native-device-info';

const discoverBg = require('../../images/onboardingDiscoverBg.jpg');
const discoverIcon = require('../../images/onboardingDiscoverIcon.png');
const shareBg = require('../../images/onboardingShareBg.png');
const shareIcon = require('../../images/onboardingShareIcon.png');
const keepUpBg = require('../../images/onboardingKeepUpBg.png');
const keepUpIcon = require('../../images/onboardingKeepUpIcon.png');

const Slide = ({bgImg, iconImg, children}) =>
  (<View style={styles.slide}>
    <View style={styles.background}>
      <Image source={bgImg} style={styles.backgroundImage} resizeMode='cover' />
      <LinearGradient colors={[colors.addAlpha(colors.WHITE, 0), colors.addAlpha(colors.WHITE, 1)]} style={styles.gradient} />
    </View>
    <View style={styles.spacer} />
    <View style={styles.textContainer}>
      <Image source={iconImg} style={styles.icon} />
      {children}
    </View>
  </View>);

const BypassButton = () => {
  return settings.isStaging || settings.isTesting
    ? <TouchableOpacity onPress={() => Actions.testRegisterScene({resource: DeviceInfo.getUniqueID()})} style={styles.bypassButton}>
      <Text style={{fontFamily: 'Roboto-Regular', color: colors.PINK}}>Bypass</Text>
    </TouchableOpacity>
    : null;
};

const PhoneVerify = () =>
  (<View style={styles.footerButtons}>
    <TouchableOpacity style={[styles.button, styles.login]} onPress={Actions.signIn}>
      <Text style={[styles.btnText, styles.btnLoginText]}>Log in</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.button]} onPress={Actions.signIn}>
      <Text style={[styles.btnText]}>Sign up</Text>
    </TouchableOpacity>
  </View>);

const Onboarding = () =>
  (<View style={{flex: 1}}>
    <Swiper style={styles.wrapper} loop={false} paginationStyle={{bottom: 95}} dotColor={colors.GREY} activeDotColor={colors.PINK} bounces>
      <Slide bgImg={discoverBg} iconImg={discoverIcon}>
        <Text style={styles.title}>
          <Text style={styles.bold}>Discover</Text>
          {'\r\ninteresting\r\nplaces.'}
        </Text>
        <Text style={styles.muted}>
          {"We'll help you find exciting\r\nexperiences and places,\r\nno matter where you go."}
        </Text>
      </Slide>
      <Slide bgImg={shareBg} iconImg={shareIcon}>
        <Text style={styles.title}>
          <Text style={styles.bold}>Share</Text>
          {' your\r\nfavorite places.'}
        </Text>
        <Text style={styles.muted}>
          {'Our mission is to connect\r\npeople with the places they\r\nlove.'}
        </Text>
      </Slide>
      <Slide bgImg={keepUpBg} iconImg={keepUpIcon}>
        <Text style={styles.title}>
          {"Keep up with\r\nwhat's\r\nhappening."}
        </Text>
        <Text style={styles.muted}>
          {'Be in the know with your\r\nfriends’ favorite places across\r\nthe world.'}
        </Text>
      </Slide>
    </Swiper>
    <PhoneVerify />
    <BypassButton />
  </View>);

export default Onboarding;

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

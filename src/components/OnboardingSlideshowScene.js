// @flow

import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';
import statem from '../../gen/state';
import {colors} from '../constants';
import {k} from '../globals';
import LinearGradient from 'react-native-linear-gradient'; // eslint-disable-line import/no-unresolved
import PhoneVerify from './PhoneVerify';
import {settings} from '../globals';
import DeviceInfo from 'react-native-device-info';

const discoverBg = require('../../images/onboardingDiscoverBg@3x.jpg');
const discoverIcon = require('../../images/onboardingDiscoverIcon.png');
const shareBg = require('../../images/onboardingShareBg.png');
const shareIcon = require('../../images/onboardingShareIcon.png');
const keepUpBg = require('../../images/onboardingKeepUpBg.png');
const keepUpIcon = require('../../images/onboardingKeepUpIcon.png');

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

export default () => {
  const state = statem.promoScene;
  return (
    <View style={{flex: 1}}>
      <Swiper style={styles.wrapper} loop={false} paginationStyle={{bottom: 120}} dotColor={colors.GREY} activeDotColor={colors.PINK} bounces>
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
            {`Keep up with\r\nwhat is\r\nhappening`}
          </Text>
          <Text style={styles.muted}>{`Be in the know with your\r\nfriends’ favorite places across\r\nthe world.`}</Text>
        </Slide>
      </Swiper>
      <View style={styles.footerButtons}>
        <PhoneVerify {...{state}} />
      </View>
      <BypassButton />
      <Text style={styles.beta}>Beta</Text>
    </View>
  );
};

const FOOTER_HEIGHT = 100 * k;
const PERCENT_PAD_TOP = 40;

const styles = StyleSheet.create({
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
  beta: {
    backgroundColor: 'transparent',
    color: colors.PINK,
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
    position: 'absolute',
    top: 25 * k,
    right: 25 * k,
  },
  bypassButton: {
    position: 'absolute',
    padding: 10 * k,
    bottom: 150 * k,
    right: 40 * k,
    backgroundColor: 'transparent',
  },
});

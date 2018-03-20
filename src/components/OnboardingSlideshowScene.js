// @flow

import React from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';
import {Actions} from 'react-native-router-flux';
import {colors} from '../constants';
import {settings} from '../globals';
import {k} from './Global';
import {TouchableOpTrack, RText} from './common';

const bg1 = require('../../images/slide1.png');
const footprints = require('../../images/foot.png');
const bg2 = require('../../images/slide2.png');
const discover = require('../../images/discover.png');
const bg3 = require('../../images/slide3.png');
const explore = require('../../images/magnifinder.png');

class Onboarding extends React.Component<{}> {
  render() {
    // HACK: workaround for known issue with swiper + TabNavigator: https://github.com/leecade/react-native-swiper/issues/389
    return this.props.routeName === 'onboarding' ? (
      <View style={{flex: 1}} testID='onboarding'>
        <Swiper loop={false} paginationStyle={{bottom: 95}} dotColor={colors.GREY} activeDotColor={colors.PINK} bounces ref={r => (this.swiper = r)}>
          <Slide bgImg={bg1} iconImg={footprints} left>
            {"See who's at your\r\nfavorite places!"}
          </Slide>
          <Slide bgImg={bg2} iconImg={discover} center>
            {'Discover places\r\npeople love!'}
          </Slide>
          <Slide bgImg={bg3} iconImg={explore}>
            {"Explore what's\r\naround you!"}
          </Slide>
        </Swiper>
        <ButtonRow />
        <BypassButton />
      </View>
    ) : null;
  }
}

const Slide = ({bgImg, iconImg, left, center, children}) => {
  const align = left ? 'flex-start' : center ? 'center' : 'flex-end';
  return (
    <View style={styles.slide}>
      <Image source={bgImg} style={styles.bgImage} resizeMode='cover' />
      <View style={[styles.textContainer, {alignSelf: align, alignItems: align}]}>
        <Image source={iconImg} style={styles.icon} resizeMode='contain' />
        <RText style={[styles.title, {textAlign: left ? 'left' : center ? 'center' : 'right'}]} color={colors.PINK} size={24} weight='Light'>
          {children}
        </RText>
      </View>
    </View>
  );
};

const BypassButton = () => {
  return settings.isStaging || settings.isTesting ? (
    <TouchableOpacity onPress={Actions.testRegisterScene} style={styles.bypassButton} testID='bypassButton'>
      <RText color={colors.PINK}>Bypass</RText>
    </TouchableOpacity>
  ) : null;
};

const ButtonRow = () => (
  <View style={styles.footerButtons}>
    <TouchableOpTrack style={[styles.button, styles.login]} onPress={Actions.signIn} trackName='login'>
      <RText size={15} color={colors.PINK}>
        Log in
      </RText>
    </TouchableOpTrack>
    <TouchableOpTrack style={[styles.button]} onPress={Actions.signIn} trackName='signup'>
      <RText size={15} color={colors.WHITE}>
        Sign up
      </RText>
    </TouchableOpTrack>
  </View>
);

export default Onboarding;

const FOOTER_HEIGHT = 75 * k;

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  slide: {
    flex: 1,
  },
  bgImage: {flex: 6},
  icon: {height: 46, width: 46},
  title: {
    marginTop: 15 * k,
    lineHeight: 32 * k,
  },
  textContainer: {
    flex: 4,
    paddingHorizontal: 40,
    top: -15,
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
});

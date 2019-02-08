import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native'
import Swiper from 'react-native-swiper'
import {Actions} from 'react-native-router-flux'
import {colors} from '../constants'
import {settings} from '../globals'
import {RText, GradientButton} from './common'
import {width, height, k} from './Global'
import {inject} from 'mobx-react/native'

const bg1 = require('../../images/slide1.png')
const livelocation = require('../../images/livelocation.png')
const bg2 = require('../../images/slide2.png')
const discover = require('../../images/discover.png')
const bg3 = require('../../images/slide3.png')
const notification = require('../../images/notificationBell.png')
const maskLeft = require('../../images/maskLeft.png')
const maskCenter = require('../../images/maskCenter.png')
const maskRight = require('../../images/maskRight.png')

class Onboarding extends React.Component {
  render() {
    const SwiperAny = Swiper as any // TODO: swiper types broken
    return (
      <View style={{flex: 1}} testID="preConnection">
        <SwiperAny
          paginationStyle={{bottom: 135 * k}}
          dotColor={colors.GREY}
          activeDotColor={colors.PINK}
          bounces
          autoplay
          autoplayTimeout={5}
          loop
        >
          <Slide bgImg={bg1} iconImg={livelocation} left>
            {'Share your live location\r\nwith friends!'}
          </Slide>
          <Slide bgImg={bg2} iconImg={discover} center>
            {'Tag locations with\r\nfriends and family!'}
          </Slide>
          <Slide bgImg={bg3} iconImg={notification}>
            {'See who’s at your\r\nfavorite locations!'}
          </Slide>
        </SwiperAny>
        <Buttons />
        <BypassButton />
      </View>
    )
  }
}

const BG_IMG_RATIO = 667 / 375 // height / width of background images
const FLEX = 55

const Slide = ({bgImg, iconImg, left, center, children}: any) => {
  const align = left ? 'flex-start' : center ? 'center' : 'flex-end'
  const mask = left ? maskLeft : center ? maskCenter : maskRight
  return (
    <View style={{flex: 1}}>
      <View style={styles.bgContainer}>
        <Image source={bgImg} style={{width, height: BG_IMG_RATIO * width}} />
        <Image
          source={mask}
          style={{position: 'absolute', top: height * FLEX * 0.01 - 80, width}}
        />
      </View>
      <View style={[styles.textContainer, {alignSelf: align, alignItems: align}]}>
        <Image source={iconImg} style={styles.icon as any} resizeMode="contain" />
        <RText
          style={[styles.title, {textAlign: left ? 'left' : center ? 'center' : 'right'}]}
          color={colors.PINK}
          size={24}
        >
          {children}
        </RText>
      </View>
    </View>
  )
}

const BypassButton = () => {
  return settings.isStaging || settings.isTesting ? (
    <TouchableOpacity
      onPress={Actions.testRegisterScene}
      style={styles.bypassButton}
      testID="bypassButton"
    >
      <RText color={colors.PINK}>Bypass</RText>
    </TouchableOpacity>
  ) : null
}

const Buttons = inject('analytics')(({analytics}) => (
  <View style={styles.footerButtons}>
    <GradientButton
      isPink
      style={[styles.button]}
      onPress={() => {
        analytics.track('signup')
        Actions.signIn()
      }}
    >
      <RText size={17.5} color={colors.WHITE}>
        Get Started
      </RText>
    </GradientButton>
    {/* TODO: Add Facebook button */}
  </View>
))

export default Onboarding

const FOOTER_HEIGHT = 100 * k

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  icon: {height: 46, width: 46},
  title: {
    marginTop: 10 * k,
    lineHeight: 34,
  },
  bgContainer: {
    flex: FLEX,
  },
  textContainer: {
    flex: 100 - FLEX,
    paddingHorizontal: 40 * k,
    top: -5,
  },
  footerButtons: {
    height: FOOTER_HEIGHT,
    paddingHorizontal: 20 * k,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.WHITE,
  },
  bypassButton: {
    position: 'absolute',
    padding: 10 * k,
    bottom: 130 * k,
    right: 10 * k,
    backgroundColor: 'transparent',
    borderColor: colors.PINK,
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    height: 50 * k,
    borderRadius: 5 * k,
    marginHorizontal: 15 * k,
    marginBottom: 10 * k,
  },
  login: {
    borderWidth: 1,
    borderColor: colors.PINK,
    backgroundColor: colors.WHITE,
  },
})

import {StyleSheet} from 'react-native'
import {k, s} from './Global'
import {colors} from '../constants'
import {settings} from '../globals'
import {WARM_GREY_2, PINK} from 'src/constants/colors'

export const navBarStyle = {
  navBarTextColor: colors.DARK_PURPLE,
  navBarRightButtonColor: 'rgb(254,92,108)',
  navBarLeftButtonColor: colors.DARK_GREY,
  navBarCancelColor: colors.DARK_GREY,
  navBarButtonColor: settings.navBarButtonColor,
  navBarBackgroundColor: 'white',
  navBarButtonFontSize: 15 * k,
  navBarFontFamily: 'Roboto-Regular',
  backButtonImage: require('../../images/iconBackGrayNew.png'),
  titleStyle: {
    fontSize: 17,
    fontWeight: undefined,
    letterSpacing: 0.5,
    color: colors.DARK_PURPLE,
    fontFamily: 'Roboto-Medium',
  },
  leftButtonIconStyle: {
    marginLeft: 10 * k,
  },
  rightButtonTextStyle: {
    marginRight: 10 * k,
    color: colors.PINK,
    fontFamily: 'Roboto-Regular',
  },
  leftButtonTextStyle: {
    marginLeft: 10 * k,
    color: colors.PINK,
    fontFamily: 'Roboto-Regular',
  },
  sceneStyle: {
    backgroundColor: 'white',
  },
  navigationBarStyle: {
    borderBottomWidth: 0,
    elevation: 1,
    backgroundColor: 'white',
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
}

export const onboardingSlideStyle = StyleSheet.create({
  onboardingH1: {
    color: PINK,
    fontSize: 31,
    fontWeight: '100',
    textAlign: 'center',
  },
  onboardingSubtext: {
    color: WARM_GREY_2,
    fontSize: 19,
    textAlign: 'center',
    fontWeight: '100',
  },
})

export const botProfileStyle = StyleSheet.create({
  userInfoRow: {
    marginLeft: 10 * k,
    flex: 1,
  },
})

export const placeholderStyle = StyleSheet.create({
  placeholderText: {textAlign: 'center', fontSize: 16, marginTop: 70 * s},
})

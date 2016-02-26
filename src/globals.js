import React from 'react-native';
const {Dimensions} = React;

export const HOST = 'beng.dev.tinyrobot.com';
export const DEBUG = false;
const isTesting = process.env.NODE_ENV === 'test';
export const USE_IOS_XMPP = isTesting ? false: true;
export const PERSIST = true;
export const SERVICE = "wss://beng.dev.tinyrobot.com/ws-xmpp";
export const HEIGHT = Dimensions.get('window').height;
export const WIDTH = Dimensions.get('window').width;
// coefficient for scaling for smaller devices like iPhone 5S
export const k = HEIGHT/667;
export const backgroundColor = 'rgba(241,242,244,0.85)';

export function isDay() {
    return true;
}

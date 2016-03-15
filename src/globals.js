import React from 'react-native';
const {Dimensions} = React;

//export const HOST = 'beng.dev.tinyrobot.com';
export const HOST = 'staging.dev.tinyrobot.com';
export const DEBUG = false;
const isTesting = process.env.NODE_ENV === 'test';
export const USE_IOS_XMPP = isTesting ? false: true;
export const PERSIST = true;
export const SERVICE = "wss://"+HOST+"/ws-xmpp";
export const HEIGHT = Dimensions.get('window').height;
export const WIDTH = Dimensions.get('window').width;
// coefficient for scaling for smaller devices like iPhone 5S
export const k = HEIGHT/667;
export const backgroundColorDay = 'rgba(241,242,244,0.85)';
export const backgroundColorNight = 'rgba(49,37,62,0.90)';

class Settings {
    isTesting: bool;

    constructor(){
        this.isTesting = false;
    }

}
export const settings = new Settings();

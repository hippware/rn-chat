import React from 'react-native';
const {Dimensions} = React;

//export const HOST = 'beng.dev.tinyrobot.com';
export const HOST = 'testing.dev.tinyrobot.com';
export const isTesting = process.env.NODE_ENV === 'test';
export const USE_IOS_XMPP = !isTesting;
export const DEBUG = isTesting;
export const PERSIST = !isTesting;
export const SERVICE = "ws://"+HOST+":5280/ws-xmpp";
export const HEIGHT = Dimensions.get('window').height;
export const WIDTH = Dimensions.get('window').width;
// coefficient for scaling for smaller devices like iPhone 5S
export const k = HEIGHT/667;
export const backgroundColorDay = 'rgba(241,242,244,0.85)';
export const backgroundColorNight = 'rgba(49,37,62,0.90)';
export const navBarTextColorDay = 'rgb(63,50,77)';
export const navBarTextColorNight = 'rgb(255,255,255)';
export const navBarBackgroundColorDay = 'rgba(255,255,255,0)';
export const navBarBackgroundColorNight = 'rgb(45,33,55)';
export const backgroundColorCardDay = 'rgba(255,255,255,1)';
export const backgroundColorCardNight = 'rgb(63,50,77)';


class Settings {
    isTesting: bool;

    constructor(){
        this.isTesting = false;
    }

}
export const settings = new Settings();

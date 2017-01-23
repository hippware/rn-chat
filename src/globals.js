//require('es6-symbol/implement');
import Kefir from 'kefir';

//export const HOST = 'beng.dev.tinyrobot.com';
export const DEV_HOST = 'testing.dev.tinyrobot.com';
//export const PROD_HOST = 'staging.dev.tinyrobot.com';
export const PROD_HOST = 'us1.prod.tinyrobot.com';
export const STAGING_HOST = 'staging.dev.tinyrobot.com';
// coefficient for scaling for smaller devices like iPhone 5S
export const k = 1;// HEIGHT/667;
export const backgroundColorDay = 'rgba(241,242,244,0.85)';
export const backgroundColorNight = 'rgba(49,37,62,0.90)';
export const navBarTextColorDay = 'rgb(63,50,77)';
export const navBarTextColorNight = 'rgb(255,255,255)';
export const navBarBackgroundColorDay = 'rgba(255,255,255,0)';
export const navBarBackgroundColorNight = 'rgb(45,33,55)';
export const backgroundColorCardDay = 'rgba(255,255,255,1)';
export const backgroundColorCardNight = 'rgb(63,50,77)';

class Settings {
  isTesting: bool = false;
  isStaging: bool = false;
  token: string;
  
  constructor(){
    if (process.env.NODE_ENV === 'test'){
      this.isTesting = true;
    }
  }

  getDomain(){
    return this.isTesting ? DEV_HOST : (this.isStaging ? STAGING_HOST: PROD_HOST);
  }

}
export const settings = new Settings();

export const USE_IOS_XMPP = !settings.isTesting;
export const DEBUG = settings.isTesting;
export const PERSIST = !settings.isTesting;

global.combine = function(...args){
  return Kefir.combine(args, (x, y, z) => ({...x, ...y, ...z}));
};
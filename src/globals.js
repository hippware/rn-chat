// require('es6-symbol/implement');
import Kefir from 'kefir';

// export const HOST = 'beng.dev.tinyrobot.com';
export const DEV_HOST = 'testing.dev.tinyrobot.com';
// export const PROD_HOST = 'staging.dev.tinyrobot.com';
export const PROD_HOST = 'us1.prod.tinyrobot.com';
export const STAGING_HOST = 'staging.dev.tinyrobot.com';
// coefficient for scaling for smaller devices like iPhone 5S
export const k = 1; // HEIGHT/667;

class Settings {
    isTesting: boolean = false;
    isStaging: boolean = false;
    token: string;

    constructor() {
        if (process.env.NODE_ENV === 'test') {
            this.isStaging = process.env.STAGING;
            this.isTesting = !this.isStaging;
        } else {
            const NativeEnv = require('react-native-native-env').default;
            this.isTesting = NativeEnv.get('TESTING');
            this.isStaging = NativeEnv.get('STAGING');
            this.version = NativeEnv.get('VERSION_NAME');
        }
    }

    getDomain() {
        return this.isTesting ? DEV_HOST : this.isStaging ? STAGING_HOST : PROD_HOST;
    }
}
export const settings = new Settings();

export const USE_IOS_XMPP = process.env.NODE_ENV !== 'test' && !settings.isTesting;
export const DEBUG = settings.isTesting;
export const PERSIST = !settings.isTesting;

if (!__DEV__) {
    console.log = console.info = console.error = console.warn = console.debug = console.trace = () => {};
}

global.combine = function (...args) {
    return Kefir.combine(args, (x, y, z) => ({...x, ...y, ...z}));
};

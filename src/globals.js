export const HOST = 'beng.dev.tinyrobot.com';
export const DEBUG = false;
const isTesting = process.env.NODE_ENV === 'test';
export const USE_IOS_XMPP = isTesting ? false: true;
export const PERSIST = true;
export const SERVICE = "wss://beng.dev.tinyrobot.com/ws-xmpp";

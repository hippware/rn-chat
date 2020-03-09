import {bugsnagNotify} from './bugsnagConfig'
import BackgroundGeolocation from 'react-native-background-geolocation-android'

// tslint:disable:no-console
export function log(...args) {
  if (!__DEV__) return
  console.log(...args)
}
export function warn(...args) {
  if (!__DEV__) return
  console.warn(...args)
}
export function error(...args) {
  if (!__DEV__) return
  console.error(...args)
}
export function assert(...args) {
  if (!__DEV__) return
  ;(console as any).assert(...args)
}

export function persistLog(s: string): void {
  BackgroundGeolocation.logger.info(s)
  log(s)
}
export function notifyBugsnag(e: Error, name?: string, extra?: {[name: string]: any}): void {
  bugsnagNotify(e, name, extra)
  log(`${name}`, e, extra)
}

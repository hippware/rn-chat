import {bugsnagNotify} from './bugsnagConfig'

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

export function modifyConsoleAndGetLogger() {
  if (!(console as any)._modified) {
    if (!__DEV__) {
      const no_op = () => {
        // Prevent 'block is empty' lint warning
      }

      console.assert = no_op
      console.log = no_op
      console.info = no_op
      console.warn = no_op
      console.error = no_op
    }

    ;(console as any).bugsnagNotify = (
      e: Error,
      name?: string,
      extra?: {[name: string]: any}
    ): void => {
      bugsnagNotify(e, name, extra)
      if (__DEV__) {
        console.log(`${name}`, e, extra)
      }
    }
    ;(console as any)._modified = true
  }

  return console
}

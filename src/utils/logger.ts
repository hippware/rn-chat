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
  console.assert(...args)
}

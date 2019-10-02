import {
  check as ch,
  checkNotifications as _checkNotifications,
  request as req,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions'
import {Platform} from 'react-native'

const vars = {
  camera: Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
  motion: PERMISSIONS.IOS.MOTION,
  photo:
    Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.EXTERNAL_STORAGE,
  locationWhenInUse:
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  location:
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_ALWAYS
      : PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
}

export async function checkLocation() {
  const res = await ch(vars.location)
  return res === RESULTS.GRANTED
}

export async function checkLocationWhenInUse() {
  const res = await ch(vars.locationWhenInUse)
  return res !== RESULTS.DENIED && res !== RESULTS.BLOCKED
}

export async function checkMotion() {
  return (await ch(vars.motion)) === RESULTS.GRANTED
}

export async function checkNotifications() {
  const {status} = await _checkNotifications()
  return status === RESULTS.GRANTED
}

export const getPermission = async (permStr: string): Promise<any> => {
  const perm = vars[permStr]
  let res = await ch(perm)
  if (res !== RESULTS.GRANTED) {
    // first-time user: show permissions request dialog
    await req(perm)
    res = await ch(perm)
  }
  return res === RESULTS.GRANTED
}

export async function request(type: string) {
  const res = await req(vars[type])
  return res === RESULTS.GRANTED
}

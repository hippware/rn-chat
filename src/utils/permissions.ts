import {
  check as ch,
  checkNotifications as _checkNotifications,
  request as req,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions'
import {Platform} from 'react-native'

const {IOS, ANDROID} = PERMISSIONS

const permissionNames = {
  camera: Platform.OS === 'ios' ? IOS.CAMERA : ANDROID.CAMERA,
  motion: Platform.OS === 'ios' ? IOS.MOTION : ANDROID.ACTIVITY_RECOGNITION,
  // todo: not sure if we need read- or write- for Android photos
  photo: Platform.OS === 'ios' ? IOS.PHOTO_LIBRARY : ANDROID.WRITE_EXTERNAL_STORAGE,
  locationWhenInUse:
    Platform.OS === 'ios' ? IOS.LOCATION_WHEN_IN_USE : ANDROID.ACCESS_FINE_LOCATION,
  location:
    Platform.OS === 'ios'
      ? IOS.LOCATION_ALWAYS
      : // todo: there seems to be a bug in rn-permissions that prevents it from reading ACCESS_BACKGROUND_LOCATION...it errors out.
        ANDROID.ACCESS_FINE_LOCATION,
}

// statuses: https://github.com/react-native-community/react-native-permissions#permissions-statuses
const {GRANTED, DENIED, UNAVAILABLE} = RESULTS

export async function checkLocation() {
  const res: any = await ch(permissionNames.location)
  return [GRANTED, UNAVAILABLE].includes(res)
}

export async function checkLocationWhenInUse() {
  const res: any = await ch(
    Platform.select({ios: IOS.LOCATION_WHEN_IN_USE, android: ANDROID.ACCESS_FINE_LOCATION})!
  )
  return [GRANTED, UNAVAILABLE].includes(res)
}

export async function checkMotion(): Promise<boolean> {
  const res: any = await ch(permissionNames.motion)
  return [GRANTED, UNAVAILABLE].includes(res)
}

export async function checkNotifications() {
  const {status} = await _checkNotifications()
  return [GRANTED, UNAVAILABLE].includes(status as any)
}

export const getPermission = async (permStr: string): Promise<any> => {
  const perm = permissionNames[permStr]
  let res = await ch(perm)
  if (res === DENIED) {
    // first-time user: show permissions request dialog
    res = await req(perm)
  }
  return [GRANTED, UNAVAILABLE].includes(res as any)
}

export async function request(type: string) {
  const res = await req(permissionNames[type])
  return res === RESULTS.GRANTED
}

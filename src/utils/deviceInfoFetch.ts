import DeviceInfo from 'react-native-device-info'

// a subset of DeviceInfo needed in the app
export type TRDeviceInfo = {
  model: string
  manufacturer: string
  systemName: string
  systemVersion: string
  deviceId: string
  uniqueId: string
  binaryVersion: string
  isEmulator: boolean
}

export default async (): Promise<TRDeviceInfo> => {
  const promises = [
    DeviceInfo.getModel(),
    DeviceInfo.getManufacturer(),
    DeviceInfo.getSystemName(),
    DeviceInfo.getSystemVersion(),
    DeviceInfo.getDeviceId(),
    DeviceInfo.getUniqueId(),
    DeviceInfo.getVersion(),
    DeviceInfo.isEmulator(),
  ]

  const res = await Promise.all<any>(promises)

  return {
    model: res[0],
    manufacturer: res[1],
    systemName: res[2],
    systemVersion: res[3],
    deviceId: res[4],
    uniqueId: res[5],
    binaryVersion: res[6],
    isEmulator: res[7],
  }
}

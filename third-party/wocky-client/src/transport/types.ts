// todo: create a proper type definition file

export interface IPagingList<T> {
  list: T[]
  cursor?: string
  count: number
}

export type LoginParams = {
  userId?: string
  token?: string
  password?: string
  accessToken?: string
  host?: string
  version?: string
  os?: string
  deviceName?: string
  phoneNumber?: string
}

export type MediaUploadParams = {
  access?: string
  file: {
    name: string
    type: string
  }
  size: number
}

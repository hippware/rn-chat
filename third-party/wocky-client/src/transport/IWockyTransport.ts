import {NextGraphQLTransport} from './NextGraphQLTransport'

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
  iss?: string
  version?: string
  os?: string
  deviceName?: string
  phoneNumber?: string
}

export interface IWockyTransport extends NextGraphQLTransport {}

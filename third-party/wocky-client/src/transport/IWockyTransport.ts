import {NextGraphQLTransport} from './NextGraphQLTransport'

export interface IPagingList<T> {
  list: T[]
  cursor?: string
  count: number
}

export interface IWockyTransport extends NextGraphQLTransport {}

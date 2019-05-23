// todo: create a proper type definition file

export interface IPagingList<T> {
  list: T[]
  cursor?: string
  count: number
}

export interface IPaginableList<T> extends IPagingList<T> {
  loading: boolean
  finished: boolean
  remove: (id: string) => void
  add: (item) => void
  addToTop: (item) => void
  loadWithData: (params: LoadWithDataParams) => void
  length: number
  first: T | null
  last: T | null
  exists: (id: string) => boolean
  refresh: () => void
  load: (params: {force?: boolean}) => Promise<T[]>
}

export type LoadWithDataParams = {
  list: any[]
  count: number
  cursor?: string
  force?: boolean
  addMiddleware?: (p: any) => any
}

export type MediaUploadParams = {
  access?: string
  file: {
    name: string
    type: string
  }
  size: number
}

export type UserContactRelationship = 'FRIEND' | 'INVITED' | 'INVITED_BY' | 'NONE' | 'SELF' | null

export type UserActivityType =
  | 'still'
  | 'on_foot'
  | 'walking'
  | 'in_vehicle'
  | 'on_bicycle'
  | 'running'

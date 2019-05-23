// todo: create a proper type definition file

export interface IPagingList<T> {
  list: T[]
  cursor?: string
  count: number
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

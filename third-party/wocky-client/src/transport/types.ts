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

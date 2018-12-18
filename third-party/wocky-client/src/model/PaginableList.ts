import {types, flow, isAlive, IAnyType, IAnyModelType, getSnapshot} from 'mobx-state-tree'

export interface IPaginable<T> extends IAnyModelType {
  result: T[]
  list: T[]
  first: T | null
  last: T | null
  cursor?: string | null
  count: number
  loading: boolean
  finished: boolean
  add: (i: T) => any
  refresh: () => void
  load: (args?: {force?: boolean}) => Promise<any[]>
  addToTop: (i: T) => any
  remove: (id: string) => void
  setRequest: (req: RequestType) => void
}

export function createPaginable<T>(type: IAnyType): IPaginable<T> {
  return types
    .model('PaginableList', {
      result: types.optional(types.array(type), []),
      cursor: types.maybeNull(types.string),
      count: 0,
    })
    .named('PaginableList')
    .volatile(() => ({
      loading: false,
      finished: false,
    }))
    .actions(self => ({
      add: (item: any) => {
        if (!self.result.find((el: any) => el.id === item.id)) {
          self.result.push(item)
        }
      },
      addToTop: (item: any) => {
        if (!self.result.find((el: any) => el.id === item.id)) {
          self.result.unshift(item)
        }
      },
    }))
    .extend(self => {
      let request: RequestType
      return {
        views: {
          get length(): number {
            return self.result.length
          },
          get list(): any[] {
            return self.result.filter((x: any) => isAlive(x))
          },
          get first(): any {
            return self.result.length > 0 ? self.result[0] : null
          },
          get last(): any {
            return self.result.length > 0 ? self.result[self.result.length - 1] : null
          },
        },
        actions: {
          setRequest: (req: RequestType) => (request = req),
          exists: (id: string): boolean => {
            return self.result.find((el: any) => isAlive(el) && el.id === id) !== undefined
          },
          remove: (id: string) => {
            const index = self.result.findIndex((el: any) => el.id === id)
            if (index !== -1) {
              self.result.splice(index, 1)
            }
          },
          refresh: () => {
            self.result.clear()
            self.cursor = null
            self.finished = false
            self.count = 0
          },
          load: flow(function* load({force}: {force?: boolean} = {}) {
            if (self.loading || (self.finished && !force)) {
              return self.result
            }
            if (force) {
              self.cursor = null
              self.finished = false
            }
            self.loading = true
            try {
              const {list, count, cursor, ...data}: any = yield request(self.cursor)
              self.count = count
              self.cursor = cursor || (list.length ? list[list.length - 1].id : null)
              Object.assign(self, data)
              if (force) {
                self.result.clear()
              }
              list.forEach((el: any) => self.add(el))
              self.finished = list.length === 0 || count === self.result.length
            } finally {
              self.loading = false
            }
            return self.result
          }) as ({force}: {force: boolean}) => Promise<T[]>,
        },
      }
    }) as IPaginable<T> // TODO: better workaround to fix error?
}

export type RequestPromise = Promise<RequestReturnType>

// shape of data return from wocky
export type RequestReturnType = {list: any[]; count: number; cursor: string}

export type RequestType = (cursor: string | null, max?: number) => Promise<RequestReturnType>

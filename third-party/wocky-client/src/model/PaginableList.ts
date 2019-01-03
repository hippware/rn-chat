import {types, flow, isAlive, IType} from 'mobx-state-tree'

export function createPaginable<T>(type: IType<any, any, T>, name: string) {
  return types
    .model('PaginableList', {
      result: types.optional(types.array(type), []),
      cursor: types.maybeNull(types.string),
      count: 0,
    })
    .named(name)
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
          get list(): T[] {
            return self.result.filter((x: any) => isAlive(x))
          },
          get first(): T | null {
            return self.result.length > 0 ? self.result[0] : null
          },
          get last(): T | null {
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
          }) as (options?: {force: boolean}) => Promise<T[]>,
        },
      }
    })
}

export type RequestPromise = Promise<RequestReturnType>

// shape of data return from wocky
export type RequestReturnType = {list: any[]; count: number; cursor: string}

export type RequestType = (cursor: string | null, max?: number) => Promise<RequestReturnType>

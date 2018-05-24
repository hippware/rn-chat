import {types, flow, IModelType, isAlive} from 'mobx-state-tree'

export interface IPaginable extends IModelType<any, any> {
  result?: any[]
  list?: any[]
  cursor?: string
  count?: number
  loading?: boolean
  finished?: boolean
  add?: (i: any) => any
  refresh?: () => void
  load?: (args?: {force?: boolean}) => Promise<any[]>
  addToTop?: (i: any) => any
  remove?: (id: string) => void
}

export function createPaginable(type: any): IPaginable {
  return types
    .model('PaginableList', {
      result: types.optional(types.array(type), []),
      cursor: types.maybe(types.string),
      count: types.maybe(types.number),
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
      let request: (cursor: string | null, max?: number) => any
      return {
        views: {
          get length() {
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
          setRequest: (req: (cursor, max) => any) => (request = req),
          exists: (id: string): boolean => {
            return self.result.find((el: any) => isAlive(el) && el.id === id) !== undefined
          },
          remove: (id: string) => {
            const index = self.result.findIndex((el: any) => el.id === id)
            if (index !== -1) {
              self.result.splice(index, 1)
            }
          },
          // TODO fix code duplicate here, was not able to pass optional param because of generics
          loadPage: flow<number>(function*(max: number) {
            if (self.loading || self.finished) {
              return self.result
            }
            self.loading = true
            try {
              const {list, count, cursor, ...data} = yield request(self.cursor, max)
              self.count = count
              self.cursor = cursor || (list.length ? list[list.length - 1].id : null)
              Object.assign(self, data)
              list.forEach((el: any) => self.add(el))
              self.finished = list.length === 0
            } finally {
              self.loading = false
            }
            return self.result
          }),
          refresh: () => {
            self.result.clear()
            self.cursor = null
            self.finished = false
          },
          load: flow<any[]>(function* load({force}: {force?: boolean} = {}) {
            if (self.loading || (self.finished && !force)) {
              return self.result
            }
            if (force) {
              self.cursor = null
              self.finished = false
            }
            self.loading = true
            try {
              const {list, count, cursor, ...data} = yield request(self.cursor)
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
          }),
        },
      }
    })
}

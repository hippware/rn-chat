import {types, flow, IModelType, isAlive, IAnyType} from 'mobx-state-tree'

export interface IPaginable<T> extends IModelType<any, any> {
  result?: T[]
  list?: T[]
  cursor?: string
  count?: number
  loading?: boolean
  finished?: boolean
  add?: (i: T) => any
  refresh?: () => void
  load?: (args?: {force?: boolean}) => Promise<any[]>
  addToTop?: (i: T) => any
  remove?: (id: string) => void
}

export function createPaginable<T>(type: IAnyType): IPaginable<T> {
  return types
    .model('PaginableList', {
      result: types.optional(types.array(type), []),
      cursor: types.maybeNull(types.string),
      count: types.maybeNull(types.number),
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
          }) as ({force}: {force: boolean}) => Promise<any>,
        },
      }
    }) as IPaginable<T> // TODO: better workaround to fix error?
}

// tslint:disable-next-line:no_unused-variable
import {types, destroy, getEnv, flow, getParent, IModelType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
import {IBase} from './Base'

export function createPaginable(type: any) {
  return types
    .model('PaginableList', {
      result: types.optional(types.array(type), []),
      count: types.maybe(types.number)
    })
    .named('PaginableList')
    .volatile(self => ({
      loading: false,
      finished: false
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
      }
    }))
    .extend(self => {
      let request: Function
      function lastId() {
        return self.result.length ? (self.result[self.result.length - 1] as IBase).pageId : null
      }
      return {
        views: {
          get length() {
            return self.result.length
          },
          get list(): Array<any> {
            return self.result
          },
          get first(): any {
            return self.result.length > 0 ? self.result[0] : null
          },
          get last(): any {
            return self.result.length > 0 ? self.result[self.result.length - 1] : null
          }
        },
        actions: {
          setRequest: (req: Function) => (request = req),
          exists: (id: string): boolean => {
            return self.result.find((el: any) => el.id === id) !== null
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
              const {list, count, ...data} = yield request(lastId(), max)
              self.count = count
              Object.assign(self, data)
              list.forEach((el: any) => self.add(el))
              self.finished = self.result.length === count
            } catch (e) {
              console.log('ERROR:', e)
            } finally {
              self.loading = false
            }
            return self.result
          }),
          refresh: () => {
            self.result.clear()
            self.finished = false
          },
          load: flow<Array<any>>(function* load() {
            if (self.loading || self.finished) {
              return self.result
            }
            self.loading = true
            try {
              const {list, count, ...data} = yield request(lastId())
              self.count = count
              Object.assign(self, data)
              list.forEach((el: any) => self.add(el))
              self.finished = self.result.length === count
            } catch (e) {
              console.log('ERROR:', e)
            } finally {
              self.loading = false
            }
            return self.result
          })
        }
      }
    })
}

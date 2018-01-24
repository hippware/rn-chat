// tslint:disable-next-line:no_unused-variable
import {types, getEnv, flow, getParent, IModelType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
import {IBase} from './Base'

export function createPaginable(type: any) {
  return types
    .model('PaginableList', {
      result: types.optional(types.array(type), [])
    })
    .named('PaginableList')
    .volatile(self => ({
      loading: false,
      finished: false
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
          }
        },
        actions: {
          setRequest: (req: Function) => (request = req),
          add: (item: any) => {
            if (!self.result.find((el: any) => el.id === item.id)) {
              self.result.push(item)
            }
          },
          // TODO fix code duplicate here, was not able to pass optional param because of generics
          loadPage: flow<number>(function*(max: number) {
            if (self.loading || self.finished) {
              return self.result
            }
            self.loading = true
            try {
              const {list, count} = yield request(lastId(), max)
              list.forEach((el: any) => self.result.push(el))
              self.finished = self.result.length === count
            } catch (e) {
              console.log('ERROR:', e)
            } finally {
              self.loading = false
            }
            return self.result
          }),
          load: flow<Array<any>>(function* load() {
            if (self.loading || self.finished) {
              return self.result
            }
            self.loading = true
            try {
              const {list, count} = yield request(lastId())
              list.forEach((el: any) => self.result.push(el))
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

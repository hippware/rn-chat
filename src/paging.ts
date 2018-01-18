// tslint:disable-next-line:no_unused-variable
import {types, getEnv, flow, getParent, IModelType} from 'mobx-state-tree'

export function create(target: any, requestName: string, ...params: Array<any>): IPaginableList {
  return PaginableList.create({}, {request: getParent(target)[requestName].bind(getParent(target), ...params)})
}

export const PaginableList = types
  .model('PaginableList', {})
  .volatile(self => ({
    result: [],
    loading: false,
    finished: false
  }))
  .extend(self => {
    const {request} = getEnv(self)
    function lastId() {
      return self.result.length ? (self.result[self.result.length - 1] as any).id : null
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
        // TODO fix code duplicate here, was not able to pass optional param because of generics
        loadPage: flow<number>(function*(max: number) {
          if (self.loading || self.finished) {
            return self.result
          }
          self.loading = true
          try {
            const {list, count} = yield request(lastId(), max)
            self.result.push.apply(self.result, list)
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
            self.result.push.apply(self.result, list)
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
export type IPaginableList = typeof PaginableList.Type

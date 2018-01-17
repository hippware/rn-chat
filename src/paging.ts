// tslint:disable-next-line:no_unused-variable
import { types, getEnv, flow, getRoot, IModelType } from 'mobx-state-tree'

export function create(target: any, requestName: string, ...params: Array<any>): IPaginableList {
  return PaginableList.create({}, { request: getRoot(target)[requestName].bind(getRoot(target), ...params) })
}

export const PaginableList = types.model('PaginableList', {}).extend(self => {
  const { request } = getEnv(self)
  let loading = false
  let finished = false
  const result: Array<any> = []

  function lastId() {
    return result.length ? result[result.length - 1].user : null
  }

  return {
    views: {
      get loading() {
        return loading
      },
      get finished() {
        return finished
      },
      get length() {
        return result.length
      },
      get list() {
        return result
      }
    },
    actions: {
      // TODO fix code duplicate here, was not able to pass optional param because of generics
      loadPage: flow<number>(function*(max: number) {
        if (loading || finished) {
          return result
        }
        loading = true
        try {
          const { list, count } = yield request(lastId(), max)
          result.push.apply(result, list)
          finished = result.length === count
        } catch (e) {
          console.log('ERROR:', e)
        } finally {
          loading = false
        }
        return result
      }),
      load: flow<Array<any>>(function* load() {
        if (loading || finished) {
          return result
        }
        loading = true
        try {
          const { list, count } = yield request(lastId())
          result.push.apply(result, list)
          finished = result.length === count
        } catch (e) {
          console.log('ERROR:', e)
        } finally {
          loading = false
        }
        return result
      })
    }
  }
})

export type IPaginableList = typeof PaginableList.Type

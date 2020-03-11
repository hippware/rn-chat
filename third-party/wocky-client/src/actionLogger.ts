import {getPath, IMiddlewareEvent} from 'mobx-state-tree'
import {log} from '../../../src/utils/logger'

// Based off https://github.com/mobxjs/mobx-state-tree/blob/master/packages/mst-middlewares/src/simple-action-logger.ts
export function actionLogger(call: IMiddlewareEvent, next: (call: IMiddlewareEvent) => void) {
  if (call.type === 'action' && call.parentId === 0) {
    const base = '[MST] ' + getPath(call.context) + '/' + call.name
    if (call.args.length === 0) {
      log(base)
    } else {
      log(base + ' args:', call.args)
    }
  }
  return next(call)
}

export default actionLogger

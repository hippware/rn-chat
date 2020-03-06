import {getPath, IMiddlewareEvent} from 'mobx-state-tree'

// Based off https://github.com/mobxjs/mobx-state-tree/blob/master/packages/mst-middlewares/src/simple-action-logger.ts
export function actionLogger(call: IMiddlewareEvent, next: (call: IMiddlewareEvent) => void) {
  if (call.type === 'action' && call.parentId === 0) {
    const base = '[MST] ' + getPath(call.context) + '/' + call.name
    if (call.args.length === 0) {
      console.log(base)
    } else {
      console.log(base + ' args:', call.args)
    }
  }
  return next(call)
}

export default actionLogger

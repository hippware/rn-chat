import {types} from 'mobx-state-tree'

const Timer = types
  .model('Timer', {
    minute: types.optional(types.Date, new Date()),
  })
  .postProcessSnapshot((snapshot: any) => ({}))
  .actions(self => ({
    setMinute() {
      self.minute = new Date()
    },
  }))
  .actions(self => {
    let timer
    return {
      afterAttach() {
        timer = setInterval(() => {
          self.setMinute()
        }, 1000 * 60)
        self.setMinute()
      },
      beforeDestroy() {
        clearInterval(timer)
      },
    }
  })

export default Timer
// export interface ITimer extends Instance<typeof Timer> {}

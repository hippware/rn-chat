import {types, flow} from 'mobx-state-tree'
import {mst, shim, action} from 'classy-mst'

const TodoData = types
  .model({
    title: types.string,
    done: false
  })
  .named('TodoData')

class TodoCode extends shim(TodoData) {
  get isDone(): boolean {
    return this.done
  }
  @action
  toggle() {
    this.done = !this.done
  }

  @action
  run() {
    return flow(function*() {
      yield Promise.resolve('This gets lost')
      return 'Returned value'
    })()
  }
}

const Todo = mst(TodoCode, TodoData)
const NewTodoData = Todo.props({count: 0})
class NewTodoCode extends shim(NewTodoData, Todo) {
  @action
  toggle() {
    console.log('Toggled ' + ++this.count + ' times!')
    super.toggle()
  }
}
const NewTodo = mst(NewTodoCode, NewTodoData)
describe('hello', () => {
  it('first', async done => {
    try {
      const t = Todo.create({title: '123'})
      t.toggle()
      console.log(await t.run())
      console.log(t.isDone)
      done()
    } catch (e) {
      done(e)
    }
  })
})

import HomeStore from '../src/store/HomeStore'
import {Bot, SERVICE_NAME} from 'wocky-client'
import {types} from 'mobx-state-tree'

const model = types
  .model({
    homeStore: HomeStore,
    wocky: types
      .model(SERVICE_NAME, {
        localBots: types.model({
          list: types.array(Bot),
        }),
      })
      .actions(self => ({
        removeOne() {
          self.localBots.list.pop()
        },
        // tslint:disable:no-empty
        _loadBotSubscribers() {},
        _loadBotVisitors() {},
        _loadBotPosts() {},
      })),
  })
  .create({
    homeStore: {},
    wocky: {localBots: {list: [{id: '123'}, {id: '456'}]}},
  })

describe('HomeStore tests', () => {
  it('add/select/remove bot', () => {
    expect(model.homeStore.list.length).toEqual(4)
    model.homeStore.select(model.wocky.localBots.list[0].id)
    expect(model.homeStore.index).toEqual(2)
    model.homeStore.select(model.wocky.localBots.list[1].id)
    expect(model.homeStore.index).toEqual(3)
  })

  it('remove the last item (so the selected id no longer exists)', () => {
    const {homeStore, wocky} = model
    wocky.removeOne()
    expect(homeStore.list.length).toEqual(3)
    expect(homeStore.index).toEqual(0)

    homeStore.select(wocky.localBots.list[0].id)
    expect(homeStore.index).toEqual(2)
  })
})

import {Storages} from '../src/store/Factory'
import {types} from 'mobx-state-tree'
import {when} from 'mobx'

it('test', async done => {
  try {
    const storages = types.compose(Storages, types.model({})).create({}, {})
    const profile = storages.profiles.get('123', {avatar: '123', a: '1234', firstName: 'wow'})
    // storages.profiles.clear()
    // destroy(profile)
    when(() => profile.firstName === 'wow2', done)
    profile.load({firstName: 'wow2'})
    // console.log(JSON.stringify(profile))
    // done()
  } catch (e) {
    done(e)
  }
})

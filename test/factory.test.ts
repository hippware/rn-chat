import {Storages} from '../src/store/Factory'
import {types} from 'mobx-state-tree'
import {when} from 'mobx'

it('test', async done => {
  try {
    const storages = types.compose(Storages, types.model({})).create({}, {})
    const profile = storages.profiles.get('123', {avatar: '', a: '1234', firstName: 'wow'})
    console.log(JSON.stringify(profile), profile.avatar)
    // storages.profiles.clear()
    // destroy(profile)
    when(() => profile.firstName === 'wow2', done)
    profile.load({firstName: 'wow2'})
    // done()
  } catch (e) {
    done(e)
  }
})

import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import Home from '../src/components/Home/Home'
import {Provider} from 'mobx-react/native'
// import injects from './utils/inject-mocks'
// import wocky from './utils/mockWocky'

describe('Home', () => {
  it('renders with no data', () => {
    const wocky = {
      createChat: () => {
        /*noop*/
      },
      profile: {
        handle: 'jerkham',
        firstName: 'eric',
        lastName: 'kirkham',
        email: 'eric.kirkham@gmail.com',
        loaded: true,
        updateError: '',
      },
    }
    // NOTE: individual events don't get rendered in these snapshots...see *.test.js for each event type
    const toRender = (
      <Provider wocky={wocky}>
        <Home name="home" />
      </Provider>
    )
    const tree = renderer.create(toRender).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

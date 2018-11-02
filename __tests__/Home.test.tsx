import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import Home from '../src/components/Home/Home'
import {Provider} from 'mobx-react/native'
import './utils/inject-mocks'
import mockStore from './utils/mockStore'

describe('Home', () => {
  it('renders with no data', () => {
    // NOTE: individual events don't get rendered in these snapshots...see *.test.js for each event type
    const toRender = (
      <Provider {...mockStore}>
        <Home name="home" />
      </Provider>
    )
    const tree = renderer.create(toRender).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

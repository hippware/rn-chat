jest.useFakeTimers() // according to https://facebook.github.io/jest/docs/en/timer-mocks.html
import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import Home from '../src/components/Home'
import {Provider} from 'mobx-react/native'
import {EventList, EventBotNote, EventBotPost, EventBotCreate} from 'wocky-client'
import injects from './utils/inject-mocks'
import wocky from './utils/mockWocky'

describe('Home', () => {
  it('renders with no data', () => {
    // NOTE: individual events don't get rendered in these snapshots...see *.test.js for each event type
    const toRender = (
      <Provider wocky={wocky} {...injects}>
        <Home />
      </Provider>
    )
    const tree = renderer.create(toRender).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

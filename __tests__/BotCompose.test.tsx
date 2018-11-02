import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import {Provider} from 'mobx-react/native'

import './utils/mockMap'
import mockStore from './utils/mockStore'
import './utils/mockTextInput'

import {BotCompose} from '../src/components/BotCompose/BotCompose'

describe('BotCompose', () => {
  it('renders with no data', async () => {
    const toRender = (
      <Provider {...mockStore}>
        <BotCompose botId={'123'} />
      </Provider>
    )
    const tree = renderer.create(toRender).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders with owned bot', async () => {
    const toRender = (
      <Provider {...mockStore}>
        <BotCompose botId={'123'} />
      </Provider>
    )
    const tree = renderer.create(toRender).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

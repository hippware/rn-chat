import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import ChatScreen from '../src/components/ChatScreen'
import './utils/mockTextInput'
import mockStore from './utils/mockStore'
import {Provider} from 'mobx-react/native'

describe('ChatScreen', () => {
  it('renders with no data', () => {
    const toRender = (
      <Provider {...mockStore}>
        <ChatScreen item="1234" />
      </Provider>
    )
    const tree = renderer.create(toRender).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

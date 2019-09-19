import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import ChatListScreen from '../src/components/Chats/ChatListScreen'
import mockStore from './utils/mockStore'
import {Animated} from 'react-native'
import {Provider} from 'mobx-react'

describe('ChatListScreen', () => {
  it('renders with no data', () => {
    const tree = renderer
      .create(
        <Provider scrollY={new Animated.Value(0)} {...mockStore}>
          <ChatListScreen isActive={true} />
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

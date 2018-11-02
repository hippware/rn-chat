import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import ChatScreen from '../src/components/ChatScreen'
import './utils/mockTextInput'
import mockStore from './utils/mockStore'

describe('ChatScreen', () => {
  it('renders with no data', () => {
    const toRender = <ChatScreen item="1234" {...mockStore} />
    const tree = renderer.create(toRender).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

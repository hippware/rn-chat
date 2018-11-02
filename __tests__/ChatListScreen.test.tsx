import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import ChatListScreen from '../src/components/ChatListScreen'
import mockStore from './utils/mockStore'

describe('ChatListScreen', () => {
  it('renders with no data', () => {
    const tree = renderer.create(<ChatListScreen {...mockStore} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

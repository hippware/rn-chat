import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import SignIn from '../src/components/SignIn'
import './utils/mockTextInput'
import mockStore from './utils/mockStore'

describe('SignIn', () => {
  it('renders', () => {
    const tree = renderer.create(<SignIn {...mockStore} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

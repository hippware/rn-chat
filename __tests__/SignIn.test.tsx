import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import SignIn from '../src/components/SignIn'
import './utils/mockTextInput'
import mockStore from './utils/mockStore'
import {Provider} from 'mobx-react'

describe('SignIn', () => {
  it('renders', () => {
    const tree = renderer
      .create(
        <Provider {...mockStore}>
          <SignIn />
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

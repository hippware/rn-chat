import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import SignUp from '../src/components/SignUp'
import mockStore from './utils/mockStore'
import {Provider} from 'mobx-react/native'

describe('Signup', () => {
  it('renders', () => {
    const tree = renderer
      .create(
        <Provider {...mockStore}>
          <SignUp />
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

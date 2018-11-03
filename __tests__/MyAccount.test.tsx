import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import MyAccount from '../src/components/MyAccount'
import {Provider} from 'mobx-react/native'
import mockStore from './utils/mockStore'

jest.mock('../src/components/Version.tsx', () => () => 'Version')

describe('MyAccount', () => {
  it('renders', () => {
    const toRender = (
      <Provider {...mockStore}>
        <MyAccount />
      </Provider>
    )
    const tree = renderer.create(toRender).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

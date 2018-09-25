import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import MyAccount from '../src/components/MyAccount'
import {Provider} from 'mobx-react/native'

jest.mock('../src/components/Version.tsx', () => () => 'Version')

describe('MyAccount', () => {
  it('renders', () => {
    const wocky = {
      profile: {
        handle: 'eric',
        firstName: 'eric',
        lastName: 'kirkham',
        email: 'eric.kirkham@gmail.com',
        loaded: true,
      },
    }
    const profileValidationStore = {
      setProfile: () => {
        /* noop */
      },
    }
    const toRender = (
      <Provider
        wocky={wocky}
        profileValidationStore={profileValidationStore}
        warn={() => {
          /* noop */
        }}
      >
        <MyAccount />
      </Provider>
    )
    const tree = renderer.create(toRender).toJSON()
    ;(expect(tree) as any).toMatchSnapshot()
  })
})

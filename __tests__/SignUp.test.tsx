import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import SignUp from '../src/components/SignUp'
import {Provider} from 'mobx-react/native'

describe('Signup', () => {
  it('renders', () => {
    const wocky = {
      createChat: () => {
        /*noop*/
      },
      profile: {
        handle: 'jerkham',
        firstName: 'eric',
        lastName: 'kirkham',
        email: 'eric.kirkham@gmail.com',
        loaded: true,
        updateError: '',
      },
    }
    const analytics = {
      track: () => {
        /*noop*/
      },
    }
    const profileValidationStore = {
      setProfile: () => {
        /*noop*/
      },
    }
    const warn = () => {
      /*noop*/
    }
    const tree = renderer
      .create(
        <Provider
          wocky={wocky}
          profileValidationStore={profileValidationStore}
          analytics={analytics}
          warn={warn}
        >
          <SignUp />
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

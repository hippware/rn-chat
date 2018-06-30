// @flow

import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import BotDetails from '../src/components/LocationDetails'
import {Provider} from 'mobx-react/native'
import injects from './utils/inject-mocks'

describe('BotDetails', () => {
  const wocky = {}

  it('renders with no data', () => {
    // const toRender = (
    //   <Provider wocky={wocky} {...injects}>
    //     <BotDetails />
    //   </Provider>
    // );
    // const tree = renderer.create(toRender).toJSON();
    // expect(tree).toMatchSnapshot();
  })
})

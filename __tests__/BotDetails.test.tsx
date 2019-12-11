import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import BotDetails from '../src/components/BotDetails/BotDetailsNew'
import {Provider} from 'mobx-react'
import mockStore from './utils/mockStore'

describe('BotDetails', () => {
  it('renders with no data', () => {
    const toRender = (
      <Provider {...mockStore}>
        <BotDetails
          botId={'1234'}
          isNew={false}
          navigation={{state: {params: {isNew: false}}}}
          isActive
        />
      </Provider>
    )
    const tree = renderer.create(toRender).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

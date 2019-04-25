import React from 'react'
import SignUp from 'src/components/SignUp'
import {Provider} from 'mobx-react'

const noop = () => {
  /* noop */
}

const stores = {
  wocky: {
    profile: {
      id: '1234',
      handle: '',
      firstName: 'Eric',
      lastName: 'Kirkham',
    },
  },
  analytics: {
    track: noop,
  },
}

export default () => (
  <Provider {...stores}>
    <SignUp />
  </Provider>
)

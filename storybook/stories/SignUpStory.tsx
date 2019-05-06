import React from 'react'
import SignUp from 'src/components/SignUp'
import {Provider} from 'mobx-react'

const noop = () => {
  /* noop */
}

const stores = {
  wocky: {
    profile: {
      id: '32',
      handle: '',
      firstName: 'Earvin',
      lastName: 'Johnson',
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

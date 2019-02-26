import store from '../store'

import Reactotron from 'reactotron-react-native'
import {mst} from 'reactotron-mst'

// https://github.com/infinitered/reactotron/blob/master/docs/plugin-mst.md#filter
// todo: this doesn't seem to work as described above...at least not for homeStore
const RX = /postProcessSnapshot/
const filter = event => RX.test(event.name) === false

Reactotron.configure({
  name: 'Tinyrobot',
})
  .useReactNative({
    asyncStorage: false, // there are more options to the async storage.
    networking: {
      // optionally, you can turn it off with false.
      ignoreUrls: /symbolicate/,
    },
    editor: false, // there are more options to editor
    errors: {veto: stackFrame => false}, // or turn it off with false
    overlay: false, // just turning off overlay
  })
  .use(mst({filter}))
  .connect()

Reactotron.trackMstNode(store)

import store from '../store'
// import TinyRobotRouter from './components/RouterTest';

import Reactotron, {
  trackGlobalErrors,
  openInEditor,
  overlay,
  asyncStorage,
  networking,
} from 'reactotron-react-native'
import {mst} from 'reactotron-mst'

Reactotron.configure({
  name: 'Tinyrobot',
})
  .use(trackGlobalErrors())
  .use(openInEditor())
  .use(overlay())
  .use(asyncStorage())
  .use(networking())
  .use(mst())
  .connect()

Reactotron.trackMstNode(store)

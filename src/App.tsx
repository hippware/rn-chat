import React, {useState, useEffect} from 'react'
import {View} from 'react-native'
import {Provider} from 'mobx-react/native'
import TinyRobotRouter from './components/Router'
import analytics from './utils/analytics'
import {createStore} from './store'
import NotificationBanner from './components/NotificationBanner'
import Connectivity from './components/Connectivity'
import ErrorHandler from './components/common/ErrorHandler'

const App = () => {
  const [store, setStore] = useState()

  useEffect(() => {
    createStore().then(s => setStore(s))
  }, [])

  return store ? (
    <Provider store={store} {...store} analytics={analytics}>
      <View style={{flex: 1}} testID="wrapper">
        <ErrorHandler>
          <TinyRobotRouter />
          <NotificationBanner />
          <Connectivity />
        </ErrorHandler>
      </View>
    </Provider>
  ) : null
}

export default App

import React, {useState, useEffect} from 'react'
import {View} from 'react-native'
import {Provider} from 'mobx-react/native'
import TinyRobotRouter from './components/Router'
import analytics from './utils/analytics'
import {createStore} from './store/store'
import NotificationBanner from './components/NotificationBanner'
import Connectivity from './components/Connectivity'
import ErrorHandler from './components/common/ErrorHandler'

const App = () => {
  const [store, setStore] = useState()

  useEffect(() => {
    createStore().then(s => {
      setStore(s)
    })
  }, [])

  if (!store) return null
  const {mstStore, ...rest} = store

  return (
    <Provider store={mstStore} {...mstStore} {...rest} analytics={analytics}>
      <View style={{flex: 1}} testID="wrapper">
        <ErrorHandler>
          <TinyRobotRouter />
          <NotificationBanner />
          <Connectivity />
        </ErrorHandler>
      </View>
    </Provider>
  )
}

export default App

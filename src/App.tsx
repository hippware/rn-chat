import React, {useState, useEffect} from 'react'
import {AppState, View, Platform, StatusBar} from 'react-native'
import {Provider} from 'mobx-react'
import TinyRobotRouter from './components/Router'
import analytics from './utils/analytics'
import {createStore} from './store/store'
import NotificationBanner from './components/NotificationBanner'
import Connectivity from './components/Connectivity'
import ErrorHandler from './components/common/ErrorHandler'
import {bugsnagNotify} from 'src/utils/bugsnagConfig'

const App = () => {
  const [store, setStore] = useState<any>(null)

  useEffect(() => {
    // This seems to be undocumented event.
    AppState.addEventListener('memoryWarning', () => {
      const extras = {currentState: AppState.currentState}
      bugsnagNotify(new Error('AppState.memoryWarning fired'), 'memory_warning', extras)
      analytics.track('memory_warning', extras)
    })

    if (!store) {
      createStore().then(s => {
        setStore(s)
      })
    }
  }, [])

  // todo: how long does store creation take? Should we show something while it's being created?
  if (!store) return null
  const {mstStore, ...rest} = store

  return (
    <Provider store={mstStore} {...mstStore} {...rest} analytics={analytics}>
      <View style={{flex: 1}} testID="wrapper">
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
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

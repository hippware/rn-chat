import React, {useState, useEffect} from 'react'
import {AppState, View} from 'react-native'
import {Provider} from 'mobx-react'
import TinyRobotRouter from './components/Router'
import analytics from './utils/analytics'
import {createStore} from './store/store'
import NotificationBanner from './components/NotificationBanner'
import Connectivity from './components/Connectivity'
import ErrorHandler from './components/common/ErrorHandler'
import {bugsnagNotify} from 'src/utils/bugsnagConfig'
import Vitals from 'react-native-vitals'

const App = () => {
  const [store, setStore] = useState()

  useEffect(() => {
    createStore().then(s => {
      setStore(s)
    })
  }, [])

  Vitals.addLowMemoryListener(memory => {
    bugsnagNotify(new Error('Vitals LowMemory triggered'), 'low_memory', {memory})
    analytics.track('low_memory', {memory})
  })

  // This seems to be undocumented event. Not even sure what `state` is.
  AppState.addEventListener('memoryWarning', (state: any) => {
    bugsnagNotify(new Error('AppState memoryWarning triggered'), 'memory_warning', {state})
    analytics.track('memory_warning', {state})
  })

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

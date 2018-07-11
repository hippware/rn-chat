import React from 'react'
import {View} from 'react-native'
import {Provider, observer} from 'mobx-react/native'
import TinyRobotRouter from './components/Router'
import analytics from './utils/analytics'
import store, {notificationStore, reportStore, pushStore} from './store'
import NotificationBanner from './components/NotificationBanner'
import ErrorHandler from './components/common/ErrorHandler'
import Connectivity from './components/Connectivity'
import * as logger from './utils/log'
import {observable, action} from 'mobx'
// import TinyRobotRouter from './components/RouterTest';
// require('./utils/reactotron');

@observer
class App extends React.Component<{}> {
  @observable foregrounded: boolean = false

  @action onForegrounded = () => (this.foregrounded = true)

  render() {
    return (
      <Provider
        store={store}
        {...store}
        analytics={analytics}
        notificationStore={notificationStore}
        reportStore={reportStore}
        pushStore={pushStore}
        {...logger}
      >
        <ErrorHandler>
          <View style={{flex: 1}} testID="wrapper">
            {this.foregrounded && <TinyRobotRouter />}
            <NotificationBanner />
            <Connectivity onForegrounded={this.onForegrounded} />
          </View>
        </ErrorHandler>
      </Provider>
    )
  }
}

export default App

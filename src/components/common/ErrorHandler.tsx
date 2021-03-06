import React from 'react'
import {ScrollView, View, Image} from 'react-native'
import {observable} from 'mobx'
import {observer, inject} from 'mobx-react'
import {settings} from '../../globals'
import {RText} from '.'
import {colors} from '../../constants'
import Button from '../Button'
import {Actions} from 'react-native-router-flux'
import {getSnapshot} from 'mobx-state-tree'
import {IWocky} from 'src/wocky'
import bsClient from '../../utils/bugsnagConfig'

type Props = {
  wocky?: IWocky
  store?: any
  analytics?: any
}

class ErrorHandler extends React.Component<Props> {
  @observable error
  @observable errorInfo

  // todo: hookify this component once there is a compatible hook for `didCatch`
  // https://reactjs.org/docs/hooks-faq.html#do-hooks-cover-all-use-cases-for-classes
  componentDidCatch(error, errorInfo) {
    this.error = error
    this.errorInfo = errorInfo

    try {
      if (this.props.wocky && this.props.wocky.profile) {
        const {profile} = this.props.wocky!
        bsClient.setUser(profile!.id, profile!.displayName, profile!.email!)
      }
    } catch (err) {
      // intentionally swallow these errors to prevent crashes before bugsnag sending
    }
    bsClient.notify(error, report => {
      // metadata gets discarded like in https://github.com/bugsnag/bugsnag-react-native/issues/132
      report.metadata = errorInfo
    })
  }

  reload = async () => {
    this.props.analytics.track('reload', getSnapshot(this.props.store))
    this.error = null
    this.errorInfo = null
    // reset nav to 'reload' screen while resetting cache (prevent errors from screens/components listening to MST observables)
    Actions.reset('reload')
    await this.props.store.resetCache()
    Actions.logged()
  }

  render() {
    return this.error ? (
      <ErrorView error={this.error} errorInfo={this.errorInfo} reload={this.reload} />
    ) : (
      this.props.children
    )
  }
}

const ErrorView = ({error, errorInfo, reload}) => {
  if (settings.showFullErrorMessage) {
    return (
      <View style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{paddingTop: 60, marginHorizontal: 20}}
          style={{flex: 1}}
        >
          <RText size={20} style={{marginBottom: 20}}>
            Oops! there was an unexpected error. It has been reported to Bugsnag.
          </RText>
          <TheButton reload={reload} />
          <RText style={{marginTop: 20}} color={'black'}>
            {error.toString()}
          </RText>
          <RText style={{marginTop: 20}} color={'black'}>
            {errorInfo.componentStack}
          </RText>
        </ScrollView>
      </View>
    )
  } else {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Image
          source={require('../../../images/surpriseBot.png')}
          style={{height: 68, marginTop: 160, marginBottom: 40}}
          resizeMode="contain"
        />
        <RText
          size={30}
          weight="Light"
          color={colors.PINK}
          style={{textAlign: 'center', marginBottom: 30}}
        >
          {'Oops! something\r\nwent wrong.'}
        </RText>
        <RText size={18} color={colors.DARK_GREY} style={{marginBottom: 50}}>
          Please tap reload.
        </RText>
        <TheButton reload={reload} />
      </View>
    )
  }
}

const TheButton = ({reload}) => (
  <Button
    style={{position: 'relative', left: 0, right: 0, marginHorizontal: 30, marginTop: 50}}
    onPress={reload}
  >
    Reload
  </Button>
)

export default inject('wocky', 'store', 'analytics')(observer(ErrorHandler))

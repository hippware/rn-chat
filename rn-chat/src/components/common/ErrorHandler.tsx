import React from 'react'
import {ScrollView, View, Image, Text} from 'react-native'
import {observable} from 'mobx'
import {observer, inject} from 'mobx-react'
import {settings} from '../../globals'
import {RText} from './'
import {colors} from '../../constants'
import Button from '../Button'
import {Actions} from 'react-native-router-flux'
import {getSnapshot} from 'mobx-state-tree'
import {IWocky} from 'wocky-client'
import bsClient from '../../utils/bugsnagConfig'

type Props = {
  wocky?: IWocky
  store?: any
  analytics?: any
}

@inject('wocky', 'store', 'analytics')
@observer
class ErrorHandler extends React.Component<Props> {
  @observable error
  @observable errorInfo

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

  reload = () => {
    this.props.analytics.track('reload', getSnapshot(this.props.store))
    this.props.store.reload()
    this.error = null
    this.errorInfo = null
    Actions.reset('root')
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
  if (settings.isStaging) {
    return (
      <View style={{flex: 1}}>
        <ScrollView style={{paddingTop: 40}}>
          <Text>
            Oops! there was an unexpected error. It has been reported to Bugsnag. Try killing and
            reloading the app.
          </Text>
          <Text style={{marginTop: 20}}>{error.toString()}</Text>
          <Text style={{marginTop: 20}}>{errorInfo.componentStack}</Text>
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
        <Button
          style={{position: 'relative', left: 0, right: 0, marginHorizontal: 30, marginTop: 50}}
          onPress={reload}
        >
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Image
              source={require('../../../images/reload.png')}
              style={{height: 19, marginRight: 5}}
              resizeMode="contain"
            />
            <RText size={17.5} color={colors.WHITE}>
              Reload
            </RText>
          </View>
        </Button>
      </View>
    )
  }
}

export default ErrorHandler

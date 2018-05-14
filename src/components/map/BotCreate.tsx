import React from 'react'
import {TouchableOpacity} from 'react-native'
import {observable} from 'mobx'
import {inject, observer} from 'mobx-react/native'
import {Actions} from 'react-native-router-flux'
import Screen from '../Screen'
import BotAddress from './BotAddress'

import {RText} from '../common'
import {k} from '../Global'
import {colors} from '../../constants'
import {IWocky, IBot} from 'wocky-client'
import {ILocationStore} from '../../store/LocationStore'

const Right = inject('wocky', 'newBotStore', 'analytics')(
  observer(({newBotStore, wocky, analytics}) => (
    <TouchableOpacity
      onPress={async () => {
        const bot = wocky.getBot({id: newBotStore.botId})
        Actions.botCompose({botId: bot.id})
        analytics.track('botcreate_chooselocation', bot.toJSON())
      }}
      style={{marginRight: 20 * k}}
    >
      <RText size={15} color={colors.PINK}>
        Next
      </RText>
    </TouchableOpacity>
  ))
)

type Props = {
  wocky?: IWocky
  locationStore?: ILocationStore
  analytics?: any
  geocodingStore?: any
  newBotStore?: any
}

@inject('wocky', 'locationStore', 'analytics', 'geocodingStore', 'newBotStore')
@observer
class BotCreate extends React.Component<Props> {
  static rightButton = () => <Right />

  trackTimeout: any
  @observable bot?: IBot

  componentWillMount() {
    this.createBot()
  }

  createBot = async () => {
    const {wocky, locationStore} = this.props
    const bot = await wocky!.createBot()
    const {location} = locationStore!

    if (location) {
      bot.load({
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
          accuracy: location.accuracy
        }
      })
      bot.location!.load({isCurrent: true})
    }
    this.bot = bot
    this.props.newBotStore.setId(this.bot.id)
    const data = await this.props.geocodingStore.reverse(location)
    this.bot.load({addressData: data.meta, address: data.address})
  }

  componentDidMount() {
    // TODO HACK: prevent this from firing *after* creating a new bot and popping
    this.trackTimeout = setTimeout(() => this.props.analytics.track('botcreate_start'), 1000)
  }

  componentWillUnmount() {
    clearTimeout(this.trackTimeout)
  }

  render() {
    return <Screen>{this.bot ? <BotAddress bot={this.bot!} /> : null}</Screen>
  }
}

export default BotCreate

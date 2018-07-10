import React from 'react'
import Screen from '../Screen'
import BotAddress from './BotAddress'
import {observer, inject} from 'mobx-react/native'

type Props = {
  botId: string
  wocky?: any
}

@inject('wocky')
@observer
class BotAddressScene extends React.Component<Props> {
  bot: any

  componentWillMount() {
    this.bot = this.props.wocky.getBot({id: this.props.botId})
  }

  render() {
    return (
      <Screen>
        <BotAddress edit bot={this.bot} />
      </Screen>
    )
  }
}

export default BotAddressScene

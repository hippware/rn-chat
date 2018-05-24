// @flow

import React from 'react'
import {TouchableOpacity, Image} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {observable} from 'mobx'
import Report, {afterReport} from './Report'
import {k} from '../Global'

type Props = {
  botId: string
  wocky: any
}

const sendActive = require('../../../images/sendActive.png')

const Right = inject('wocky', 'reportStore')(({wocky, reportStore, botId}) => (
  <TouchableOpacity
    onPress={async () => {
      if (reportStore.submitting) return
      const bot = wocky.getBot({id: botId})
      await reportStore.reportBot(bot, wocky.profile)
      afterReport(reportStore)
    }}
    style={{marginRight: 10 * k}}
  >
    <Image source={sendActive} />
  </TouchableOpacity>
))

@inject('wocky')
@observer
export default class ReportBot extends React.Component<Props> {
  static rightButton = ({botId}) => <Right botId={botId} />

  @observable bot: any

  componentDidMount() {
    this.bot = this.props.wocky.getBot({id: this.props.botId})
  }

  render() {
    return (
      <Report
        subtitle={`${this.bot ? this.bot.title : ''}`}
        placeholder="Please describe why you are reporting this bot (e.g. spam, inappropriate content, etc.)"
      />
    )
  }
}

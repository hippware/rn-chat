import React, {useState, useEffect} from 'react'
import {TouchableOpacity, Image} from 'react-native'
import {inject} from 'mobx-react'
import {observer} from 'mobx-react-lite'
import Report, {afterReport} from './Report'
import {k} from '../Global'
import {IBot} from 'wocky-client'
import {ReportStore} from '../../store/ReportStore'

type Props = {
  botId: string
  wocky?: any
  reportStore?: ReportStore
}

const sendActive = require('../../../images/sendActive.png')

const Right = inject('wocky', 'reportStore')(({wocky, reportStore, botId}: Props) => (
  <TouchableOpacity
    onPress={async () => {
      if (reportStore!.submitting) return
      const bot = wocky.getBot({id: botId})
      await reportStore!.reportBot(bot, wocky.profile)
      afterReport(reportStore)
    }}
    style={{marginRight: 10 * k}}
  >
    <Image source={sendActive} />
  </TouchableOpacity>
))

export const ReportBotRightButton = ({botId}) => <Right botId={botId} />

const ReportBot = inject('wocky')(
  observer(({wocky, botId}: Props) => {
    const [bot, setBot] = useState<IBot | null>(null)

    useEffect(() => {
      setBot(wocky.getBot({id: botId}))
    }, [])

    return (
      <Report
        subtitle={`${bot ? bot.title : ''}`}
        placeholder="Please describe why you are reporting this location (e.g. spam, inappropriate content, etc.)"
      />
    )
  })
)

export default ReportBot

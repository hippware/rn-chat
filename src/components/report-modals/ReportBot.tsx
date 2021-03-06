import React, {useState, useEffect} from 'react'
import {TouchableOpacity, Image} from 'react-native'
import {inject} from 'mobx-react'
import Report, {afterReport} from './Report'
import {k} from '../Global'
import {IBot} from 'src/wocky'
import {ReportStore} from '../../store/ReportStore'
import {useWocky} from 'src/utils/injectors'
import {observer} from 'mobx-react'

type Props = {
  botId: string
  wocky?: any
  reportStore?: ReportStore
}

const sendActive = require('../../../images/sendActive.png')

const Right = inject(
  'wocky',
  'reportStore'
)(({wocky, reportStore, botId}: Props) => (
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

const ReportBot = observer(({botId}: Props) => {
  const [bot, setBot] = useState<IBot | null>(null)
  const {getBot} = useWocky()

  useEffect(() => {
    setBot(getBot({id: botId}))
  }, [])

  return (
    <Report
      subtitle={`${bot ? bot.title : ''}`}
      placeholder="Please describe why you are reporting this location (e.g. spam, inappropriate content, etc.)"
    />
  )
})

export default ReportBot

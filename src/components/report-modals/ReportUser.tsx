import React, {useEffect, useState} from 'react'
import {TouchableOpacity, Image} from 'react-native'
import {inject} from 'mobx-react'
import {observer} from 'mobx-react-lite'
import Report, {afterReport} from './Report'
import {k} from '../Global'
import {IProfile} from 'wocky-client'
import {iconClose} from '../Router'
import {Actions} from 'react-native-router-flux'

type Props = {
  userId: string
  wocky: any
}

const sendActive = require('../../../images/sendActive.png')

const Right = inject('wocky', 'reportStore')(({wocky, reportStore, userId}) => (
  <TouchableOpacity
    onPress={async () => {
      if (reportStore.submitting) return
      const profile = await wocky.getProfile(userId)
      await reportStore.reportUser(profile, wocky.profile)
      afterReport(reportStore)
    }}
    style={{marginRight: 10 * k}}
  >
    <Image source={sendActive} />
  </TouchableOpacity>
))

const ReportUser = inject('wocky')(
  observer(({userId, wocky}: Props) => {
    // todo: how to specify this in rnrf in functional components?
    // static rightButton = ({userId}) => <Right userId={userId} />

    const [profile, setProfile] = useState<IProfile | null>(null)

    useEffect(() => {
      wocky.getProfile(userId).then(p => setProfile(p))
    }, [])

    return (
      <Report
        subtitle={profile ? `@${profile.handle}` : ''}
        placeholder="Please describe why you are reporting this user (e.g. spam, inappropriate content, etc.)"
      />
    )
  })
)
;(ReportUser as any).navigationOptions = ({navigation}) => ({
  headerRight: <Right userId={navigation.state.params.userId} />,
  title: 'Report User',
  headerLeft: (
    <TouchableOpacity onPress={() => Actions.pop()} style={{marginLeft: 15}}>
      <Image source={iconClose} />
    </TouchableOpacity>
  ),
})

export default ReportUser

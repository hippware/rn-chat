import React, {useEffect, useState} from 'react'
import {TouchableOpacity, Image} from 'react-native'
import {inject} from 'mobx-react'
import Report, {afterReport} from './Report'
import {k} from '../Global'
import {IProfile} from 'wocky-client'
import {useWocky} from 'src/utils/injectors'

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
export const ReportUserRightButton = ({userId}) => <Right userId={userId} />

const ReportUser = ({userId}: Props) => {
  const [profile, setProfile] = useState<IProfile | null>(null)
  const {getProfile} = useWocky()

  useEffect(() => {
    getProfile(userId).then(p => setProfile(p))
  }, [])

  return (
    <Report
      subtitle={profile ? `@${profile.handle}` : ''}
      placeholder="Please describe why you are reporting this user (e.g. spam, inappropriate content, etc.)"
    />
  )
}

export default ReportUser

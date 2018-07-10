import React from 'react'
import {TouchableOpacity, Image} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {observable} from 'mobx'
import Report, {afterReport} from './Report'
import {k} from '../Global'

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

@inject('wocky', 'reportStore')
@observer
export default class ReportUser extends React.Component<Props> {
  static rightButton = ({userId}) => <Right userId={userId} />

  @observable profile: any

  componentDidMount() {
    this.props.wocky.getProfile(this.props.userId).then(profile => (this.profile = profile))
  }

  render() {
    return (
      <Report
        subtitle={this.profile ? `@${this.profile.handle}` : ''}
        placeholder="Please describe why you are reporting this user (e.g. spam, inappropriate content, etc.)"
      />
    )
  }
}

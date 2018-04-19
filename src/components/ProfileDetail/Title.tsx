import React from 'react'
import {observer, inject} from 'mobx-react/native'
import {observable, runInAction} from 'mobx'
import {IProfile, IWocky} from 'wocky-client'
import {ProfileHandle} from '../common'
import {isAlive} from 'mobx-state-tree'

@inject('wocky')
@observer
class Title extends React.Component<{item: string; wocky?: IWocky}> {
  @observable profile?: IProfile

  async componentWillMount() {
    const profile = await this.props.wocky!.getProfile(this.props.item)
    runInAction(() => (this.profile = profile))
  }
  render() {
    if (!this.profile || !isAlive(this.profile)) {
      return null
    }
    return <ProfileHandle profile={this.profile} size={18} />
  }
}

export default Title

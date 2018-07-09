import React from 'react'
import {observer, inject} from 'mobx-react/native'
import {observable} from 'mobx'
import {ProfileHandle} from '../common'
import {isAlive} from 'mobx-state-tree'

@inject('wocky')
@observer
class Title extends React.Component<any> {
  @observable profile: any
  async componentWillMount() {
    this.profile = await this.props.wocky.getProfile(this.props.item)
  }
  render() {
    if (!this.profile || !isAlive(this.profile)) {
      return null
    }
    return <ProfileHandle profile={this.profile} size={18} />
  }
}

export default Title

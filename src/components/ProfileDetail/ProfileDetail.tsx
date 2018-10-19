import React from 'react'
import {observer, inject} from 'mobx-react/native'
import {observable} from 'mobx'
import {IProfile, IWocky} from 'wocky-client'
import Screen from '../Screen'
import BotListView from '../BotListView'
import BotButton from '../BotButton'
import Header from './Header'
import Right from './RightNavButton'
import Title from './Title'
import {isAlive} from 'mobx-state-tree'

type Props = {
  item: string
  refresh?: boolean
  wocky?: IWocky
}

@inject('wocky')
@observer
class ProfileDetail extends React.Component<Props> {
  static rightButton = ({item}) => <Right item={item} />
  static renderTitle = ({item}) => <Title item={item} />

  handler: any
  list: any
  @observable profile?: IProfile

  componentWillMount() {
    this.load()
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps && nextProps.refresh) {
      this.load()
    }
  }

  load = async () => {
    this.profile = await this.props.wocky!.profiles.get(this.props.item)
    this.props.wocky!.loadProfile(this.props.item)
  }

  _header = () => <Header profile={this.profile!} />

  render() {
    if (!this.profile || !isAlive(this.profile)) {
      return null
    }
    return (
      <Screen testID="profileDetail">
        <BotListView ref={r => (this.list = r)} list={this.profile.ownBots} header={this._header} />
        <BotButton />
      </Screen>
    )
  }
}

export default ProfileDetail

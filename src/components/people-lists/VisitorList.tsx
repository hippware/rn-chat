import React from 'react'
import {observable} from 'mobx'
import {observer, inject} from 'mobx-react'
import {RText} from '../common'
import {IBot, IWocky} from 'wocky-client'
import {ILocationStore} from '../../store/LocationStore'
import {isAlive} from 'mobx-state-tree'
import FriendCard from './FriendCard'
import DraggablePopupList from '../common/DraggablePopupList'
import withKeyboardHOC from '../common/withKeyboardHOC'
import {colors} from '../../constants'
import {k} from '../Global'

type Props = {
  botId: string
  wocky?: IWocky
  locationStore?: ILocationStore
  isActive: boolean
}

const KeyboardAwareDraggablePopupList: any = withKeyboardHOC(DraggablePopupList)

@inject('wocky', 'locationStore')
@observer
export default class VisitorList extends React.Component<Props> {
  static navigationOptions = {
    fadeNavConfig: {
      back: true,
      title: (
        <RText size={18} color={colors.PURPLE}>
          Who's Here
        </RText>
      ),
    },
  }

  @observable bot?: IBot

  UNSAFE_componentWillMount() {
    this.bot = this.props.wocky!.getBot({id: this.props.botId})
    // TODO: refactor (remove?), it doesn't look good because we already load bot within BotDetails
    this.bot.visitors.load!({force: true})
    this.props.wocky!.loadBot(this.props.botId)
  }

  renderItem = ({item}) => <FriendCard profile={item} />

  render() {
    // TODO display spinner during loading
    return (
      <KeyboardAwareDraggablePopupList
        headerInner={this.renderHeader()}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
        data={this.bot && isAlive(this.bot) ? this!.bot!.visitors.list.slice() : []}
        keyboardShouldPersistTaps="handled"
        onEndReachedThreshold={0.5}
        onEndReached={() => this!.bot!.visitors.load()}
        isActive={this.props.isActive}
      />
    )
  }

  renderHeader = () => (
    <RText
      size={16}
      color={colors.PURPLE}
      weight="Medium"
      style={{width: '90%', alignSelf: 'center', marginBottom: 5 * k}}
    >
      {"Who's Here"}
    </RText>
  )
}

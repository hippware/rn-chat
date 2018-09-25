import React from 'react'
import {View} from 'react-native'
import {observable} from 'mobx'
import {observer, inject} from 'mobx-react/native'
import Screen from '../Screen'
import {Spinner, RText} from '../common'
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
}

const KeyboardAwareDraggablePopupList: any = withKeyboardHOC(DraggablePopupList)

@inject('wocky', 'locationStore')
@observer
export default class VisitorList extends React.Component<Props> {
  @observable bot?: IBot

  componentWillMount() {
    this.bot = this.props.wocky!.getBot({id: this.props.botId})
    this.bot.visitors.load!({force: true})
    this.props.wocky!.loadBot(this.props.botId, undefined)
  }

  renderItem = ({item}) => <FriendCard profile={item} />

  render() {
    return (
      <KeyboardAwareDraggablePopupList
        headerInner={this.renderHeader()}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
        data={this.bot && isAlive(this.bot) ? this.bot.visitors.list.slice() : []}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <View style={{alignItems: 'center', height: 600, width: '100%', paddingTop: 40}}>
            <Spinner />
          </View>
        }
        fadeNavConfig={{
          back: true,
          title: (
            <RText size={18} color={colors.PURPLE}>
              Who's Here
            </RText>
          ),
        }}
      />
    )
  }

  renderHeader = () => (
    <RText
      size={16}
      color={colors.PURPLE}
      weight="Medium"
      style={{marginLeft: 30 * k, marginBottom: 5 * k}}
    >
      {"Who's Here"}
    </RText>
  )
}

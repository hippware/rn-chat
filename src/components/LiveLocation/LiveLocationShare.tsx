import React from 'react'
import {observer, inject} from 'mobx-react'
import {Actions} from 'react-native-router-flux'
import Screen from '../Screen'
import {RText, BottomButton} from '../common'
import FriendMultiSelect from '../people-lists/FriendMultiSelect'
import {IWocky} from 'wocky-client'
import {ISearchStore} from '../../store/SearchStore'
import {View} from 'react-native'
import {minHeight} from '../Global'

type Props = {
  botId: string
  wocky: IWocky
  notificationStore: any // TODO proper
  store: any // TODO proper type
  analytics?: any
  searchStore?: ISearchStore
}

@inject('wocky', 'notificationStore', 'store', 'analytics', 'searchStore')
@observer
export default class LiveLocationShare extends React.Component<Props> {
  componentDidMount() {
    const {profile} = this.props.wocky!
    this.props.searchStore!.localResult.setList(profile!.sortedFriends.map(f => ({profile: f})))
  }

  render() {
    const selection = this.props.searchStore!.localResult
    const selected = selection.selected.length > 0
    return (
      <Screen>
        <View style={{marginBottom: 50 * minHeight, flex: 1}}>
          <FriendMultiSelect selection={selection} inviteMessage="To share your location!" />
        </View>
        <BottomButton
          isDisabled={!selected}
          onPress={() => {
            Actions.popTo('home')
            Actions.liveLocationCompose()
          }}
        >
          <RText size={15} color="white">
            Next
          </RText>
        </BottomButton>
      </Screen>
    )
  }
}

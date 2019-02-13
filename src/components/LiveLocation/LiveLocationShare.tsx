import React from 'react'
import {Alert, TouchableOpacity, StyleSheet} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {Actions} from 'react-native-router-flux'
import Screen from '../Screen'
import {colors} from '../../constants'
import {k} from '../Global'
import {RText, BottomButton} from '../common'
import FriendMultiSelect from '../people-lists/FriendMultiSelect'
import {IWocky, IBot} from 'wocky-client'
import {ISearchStore} from '../../store/SearchStore'
import {action} from 'mobx'

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
    const {getBot, profile} = this.props.wocky!
    this.props.searchStore!.localResult.setList(profile!.sortedFriends.map(f => ({profile: f})))
  }

  render() {
    const selection = this.props.searchStore!.localResult
    const selected = selection.selected.length > 0
    return (
      <Screen>
        <FriendMultiSelect selection={selection} inviteMessage="To share your location!" />
        <BottomButton
          isDisabled={!selected}
          onPress={() => {
            Actions.popTo('home')
            Actions.LiveLocationCompose()
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

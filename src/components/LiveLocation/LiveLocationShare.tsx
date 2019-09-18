import React, {useEffect} from 'react'
import {inject} from 'mobx-react'
import {observer} from 'mobx-react-lite'
import {Actions} from 'react-native-router-flux'
import Screen from '../Screen'
import {RText, BottomButton} from '../common'
import FriendMultiSelect from '../people-lists/FriendMultiSelect'
import {IWocky} from 'wocky-client'
import {ISearchStore} from '../../store/SearchStore'
import {View} from 'react-native'
import {minHeight} from '../Global'

type Props = {
  wocky: IWocky
  searchStore?: ISearchStore
}

const LiveLocationShare = inject('wocky', 'searchStore')(
  observer(({wocky, searchStore}: Props) => {
    useEffect(() => {
      searchStore!.localResult.setList(wocky.profile!.sortedFriends.map(f => ({profile: f})))
    }, [])

    const selection = searchStore!.localResult
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
  })
)

export default LiveLocationShare

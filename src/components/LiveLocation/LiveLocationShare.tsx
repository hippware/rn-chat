import React, {useEffect} from 'react'
import {inject} from 'mobx-react'
import {observer} from 'mobx-react'
import Screen from '../Screen'
import {RText, BottomButton} from '../common'
import FriendMultiSelect from '../people-lists/FriendMultiSelect'
import {IWocky} from 'wocky-client'
import {ISearchStore} from '../../store/SearchStore'
import {View} from 'react-native'
import {minHeight} from '../Global'
import {share, UNTIL_OFF} from './LiveLocationCompose'
import {ILocationStore} from '../../store/LocationStore'

type Props = {
  wocky: IWocky
  searchStore?: ISearchStore
  locationStore?: ILocationStore
}

const LiveLocationShare = inject(
  'wocky',
  'searchStore',
  'locationStore'
)(
  observer(({wocky, searchStore, locationStore}: Props) => {
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
            // Actions.pop()
            // Actions.liveLocationCompose()
            share(UNTIL_OFF, null, wocky, selection, locationStore!.location)
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

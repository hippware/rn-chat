import React, {useEffect} from 'react'
import Screen from '../Screen'
import {ProfileList} from '../people-lists'
import {Actions} from 'react-native-router-flux'
import {inject} from 'mobx-react'
import {observer} from 'mobx-react-lite'
import {IWocky} from 'wocky-client'
import {ISearchStore} from '../../store/SearchStore'
import SearchBar from '../people-lists/SearchBar'
import {Separator} from '../common'
import {colors} from '../../constants'

type Props = {
  wocky: IWocky
  searchStore?: ISearchStore
}

const SelectChatUser = inject('wocky', 'searchStore')(
  observer(({wocky, searchStore}: Props) => {
    useEffect(() => {
      searchStore!.localResult.setList(wocky.profile!.friends.list.map(f => ({profile: f.id})))
    }, [])

    return (
      <Screen>
        <SearchBar
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={text => searchStore!.localResult.setFilter(text)}
          value={searchStore!.localResult.filter}
          placeholder="Search name or username"
        />
        <Separator width={1} backgroundColor={colors.DARK_GREY} />
        <ProfileList
          selection={searchStore!.localResult}
          onSelect={profile => {
            Actions.pop()
            Actions.chat({item: profile.id})
          }}
        />
      </Screen>
    )
  })
)

export default SelectChatUser

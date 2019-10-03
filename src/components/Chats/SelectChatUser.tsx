import React, {useEffect} from 'react'
import Screen from '../Screen'
import {ProfileList} from '../people-lists'
import {Actions} from 'react-native-router-flux'
import {observer} from 'mobx-react'
import SearchBar from '../people-lists/SearchBar'
import {Separator} from '../common'
import {gray} from '../../constants/colors'
import {useWocky, useSearchStore} from 'src/utils/injectors'

const SelectChatUser = observer(() => {
  const {profile} = useWocky()
  const searchStore = useSearchStore()

  useEffect(() => {
    searchStore!.localResult.setList(profile!.friends.list.map(f => ({profile: f.id})))
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
      <Separator width={1} backgroundColor={gray(172)} />
      <ProfileList
        selection={searchStore!.localResult}
        onSelect={prof => {
          Actions.pop()
          Actions.chat({item: prof.id})
        }}
      />
    </Screen>
  )
})

export default SelectChatUser

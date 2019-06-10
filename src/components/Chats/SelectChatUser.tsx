import React from 'react'
import Screen from '../Screen'
import {ProfileList} from '../people-lists'
import {Actions} from 'react-native-router-flux'
import {observer, inject} from 'mobx-react/native'
import {IWocky} from 'wocky-client'
import {ISearchStore} from '../../store/SearchStore'
import SearchBar from '../people-lists/SearchBar'

type Props = {
  wocky: IWocky
  searchStore?: ISearchStore
}

@inject('wocky', 'searchStore')
@observer
class SelectChatUser extends React.Component<Props> {
  componentDidMount() {
    this.props.searchStore!.localResult.setList(
      this.props.wocky.profile!.friends.list.map(f => ({profile: f.id}))
    )
  }

  render() {
    const selection = this.props.searchStore!.localResult
    return (
      <Screen>
        <SearchBar
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={text => selection.setFilter(text)}
          value={selection.filter}
          placeholder="Search name or username"
          style={{
            fontSize: 14,
            fontFamily: 'Roboto-Light',
            flex: 1,
            backgroundColor: 'rgb(247, 247, 247)',
          }}
        />
        <ProfileList
          selection={selection}
          onSelect={profile => {
            Actions.pop()
            Actions.chat({item: profile.id})
          }}
        />
      </Screen>
    )
  }
}

export default SelectChatUser

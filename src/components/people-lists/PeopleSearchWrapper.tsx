// @flow

import React from 'react'
import {TouchableOpacity} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {observer, inject} from 'mobx-react/native'
import Screen from '../Screen'
import SearchBar from './SearchBar'
import ProfileList from './ProfileList'
import {FollowableProfileItem} from './customProfileItems'

type Props = {
  children: any
  searchStore?: any
}

@inject('wocky', 'searchStore')
@observer
class SearchWrapper extends React.Component<Props> {
  renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => Actions.profileDetails({item: item.profile.id})}>
        <FollowableProfileItem profile={item.profile} />
      </TouchableOpacity>
    )
  }

  render() {
    const {searchStore} = this.props
    const {globalResult, global} = searchStore
    return (
      <Screen>
        <SearchBar
          onChangeText={searchStore.setGlobal}
          value={searchStore.global}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Search name or username"
        />
        {global.length > 0 ? (
          globalResult.list && globalResult.list.length ? (
            <ProfileList selection={searchStore.globalResult} renderItem={this.renderItem} />
          ) : null
        ) : (
          this.props.children
        )}
      </Screen>
    )
  }
}

export default SearchWrapper

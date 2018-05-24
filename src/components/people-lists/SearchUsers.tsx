// @flow

import React from 'react'
import {Image, View, Text, TouchableOpacity} from 'react-native'
import Screen from '../Screen'
import {observer, inject} from 'mobx-react/native'
import SearchBar from './SearchBar'
import ProfileList from './ProfileList'
import {Actions} from 'react-native-router-flux'
import {FollowableProfileItem} from './customProfileItems'
import {k} from '../Global'

@inject('searchStore')
@observer
class SearchUsers extends React.Component<any> {
  static rightButton = null

  renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => Actions.profileDetails({item: item.profile.id})}>
        <FollowableProfileItem profile={item.profile} />
      </TouchableOpacity>
    )
  }

  renderEmpty = () => (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Text
        style={{
          fontSize: 15,
          textAlign: 'center',
          backgroundColor: 'transparent',
          color: 'rgb(185,185,185)',
          fontFamily: 'Roboto-Regular',
          marginTop: 80 * k,
        }}
      >
        {'Please enter a name or\r\nusername!'}
      </Text>
      <Image source={require('../../../images/emptySearchBot.png')} style={{marginTop: 20 * k}} />
    </View>
  )

  render() {
    const {searchStore} = this.props
    const {globalResult} = searchStore
    return (
      <Screen>
        <SearchBar
          onChangeText={searchStore.setGlobal}
          value={searchStore.global}
          autoCorrect={false}
          autoCapitalize="none"
          autoFocus
        />
        {globalResult.list && globalResult.list.length ? (
          <ProfileList selection={searchStore.globalResult} renderItem={this.renderItem} />
        ) : (
          this.renderEmpty()
        )}
      </Screen>
    )
  }
}

export default SearchUsers

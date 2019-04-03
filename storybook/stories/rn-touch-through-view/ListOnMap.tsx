import React from 'react'
import MapHome from 'src/components/Home/MapHome'
import {Provider} from 'mobx-react/native'
import DraggablePopupList from 'src/components/common/DraggablePopupList'
import {View, Text, TextInput} from 'react-native'
import FriendSearch, {
  KeyboardAwareDraggablePopupList,
} from 'src/components/people-lists/FriendSearch'
import {colors} from 'src/constants'

const mockLocationStore = {
  location: {
    latitude: 34.078169,
    longitude: -118.3870989,
  },
}

const mockWocky = {}

const mockHomeStore = {
  list: [],
  stopFollowingUserOnMap: () => {},
  setMapCenter: () => {},
  setFocusedLocation: () => {},
  setMapType: () => {},
}

const mockNavStore = {}

const mockSearchStore = {
  globalResult: {
    filteredList: [],
  },
}

const renderItem = ({item}) => (
  <View
    style={{
      height: 100,
      with: '100%',
      borderColor: 'red',
      borderWidth: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Text>{item.toString()}</Text>
  </View>
)

const keyExtractor = item => item.toString()

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

const SimulatedSplitRenderer = ({children}) => {
  return (
    <Provider
      locationStore={mockLocationStore}
      wocky={mockWocky}
      homeStore={mockHomeStore}
      navStore={mockNavStore}
      searchStore={mockSearchStore}
    >
      <View style={{flex: 1}}>
        <MapHome />
        {children}
      </View>
    </Provider>
  )
}

// this one works fine
export const DraggableOnMap = () => (
  <SimulatedSplitRenderer>
    <DraggablePopupList data={data} renderItem={renderItem} keyExtractor={keyExtractor} />
  </SimulatedSplitRenderer>
)

// in this one the "keyboard aware" part doesn't work on Android (no keyboard events to react to), but the user can still "touch through" to the map behind it
export const KeyboardAwareDraggableOnMap = () => (
  <SimulatedSplitRenderer>
    <KeyboardAwareDraggablePopupList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      headerInner={
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            borderColor: colors.LIGHT_GREY,
            borderBottomWidth: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 10,
            marginBottom: 10,
          }}
        >
          <TextInput
            style={{
              flex: 1,
              fontSize: 16,
              fontFamily: 'Roboto-Regular',
              color: colors.PURPLE,
            }}
            autoFocus
            // ref={r => (this.input = r)}
            // onChangeText={searchStore.setGlobal}
            // value={searchStore.global}
            returnKeyType="search"
            clearButtonMode="while-editing"
            // onFocus={() => this.list.scrollToOffset({offset: 0, animated: false})}
            placeholder="Search by name or username"
            selectionColor={colors.COVER_BLUE}
          />
        </View>
      }
    />
  </SimulatedSplitRenderer>
)

export const MockFriendSearch = () => {
  return (
    <SimulatedSplitRenderer>
      <FriendSearch />
    </SimulatedSplitRenderer>
  )
}

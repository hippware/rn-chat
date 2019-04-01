import React from 'react'
import MapHome from 'src/components/Home/MapHome'
import {Provider} from 'mobx-react/native'
import DraggablePopupList from 'src/components/common/DraggablePopupList'
import {View, Text} from 'react-native'

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

export default () => {
  return (
    <Provider
      locationStore={mockLocationStore}
      wocky={mockWocky}
      homeStore={mockHomeStore}
      navStore={mockNavStore}
    >
      <View style={{flex: 1}}>
        <MapHome />
        <DraggablePopupList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]}
          renderItem={({item}) => (
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
          )}
          keyExtractor={item => item.toString()}
        />
      </View>
    </Provider>
  )
}

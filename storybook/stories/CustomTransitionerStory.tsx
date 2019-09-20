import React, {useEffect} from 'react'
import {Provider} from 'mobx-react'
import {Router, Stack, Scene, Actions} from 'react-native-router-flux'
import {navBarStyle} from '../../src/components/styles'
import SplitRenderer from 'src/components/custom-navigators/SplitRenderer'
import {View, TouchableOpacity} from 'react-native'
import {RText} from 'src/components/common'
import DraggablePopupList from 'src/components/common/DraggablePopupList'
import SplashScreen from 'react-native-splash-screen'

const stores = {
  homeStore: {},
}

export default () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <Provider {...stores}>
      <Router {...navBarStyle}>
        <Stack hideNavBar>
          <Stack renderer={SplitRenderer}>
            <Scene key="home" component={Home} />
            <Scene key="bottomList" component={BottomList} />
          </Stack>
        </Stack>
      </Router>
    </Provider>
  )
}

class Home extends React.Component {
  static navigationOptions = {
    title: 'Hello',
  }
  componentDidMount() {
    // Actions.bottomList()
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <RText size={50}>Home Screen</RText>
        <TouchableOpacity
          style={{padding: 10, borderWidth: 1}}
          onPress={() => Actions.bottomList()}
        >
          <RText>Press me</RText>
        </TouchableOpacity>
      </View>
    )
  }
}

// tslint:disable-next-line
class BottomList extends React.Component<any> {
  static navigationOptions = ({navigation}) => ({
    // backAction: navigation.state.params.isNew ? () => Actions.popTo('home') : Actions.pop,
    // backAction: 'back',
    fadeNavConfig: {
      back: true,
      backAction: navigation.state.params.isNew ? () => Actions.popTo('home') : Actions.pop,
      // title: <NavTitle bot={bot} onLongPress={this.onNavLongPress} />,
    },
  })
  render() {
    return (
      <DraggablePopupList
        isActive
        data={[1, 2, 3, 4, 5]}
        headerInner={
          <TouchableOpacity
            style={{padding: 10, borderWidth: 1, alignItems: 'center', marginBottom: 20}}
            onPress={() => Actions.pop()}
          >
            <RText>Close bottom menu</RText>
          </TouchableOpacity>
        }
        renderItem={({item}) => (
          <RText
            style={{
              height: 100,
              width: '100%',
              borderColor: 'red',
              borderWidth: 1,
              textAlign: 'center',
              textAlignVertical: 'center',
            }}
          >
            {item.toString()}
          </RText>
        )}
        keyExtractor={item => item.toString()}
      />
    )
  }
}

import React from 'react'
import {TouchableOpacity, Image, Animated} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {navBarStyle} from '../Router'

type Props = {
  transitionProps: any
}

export default class BackButton extends React.Component<Props> {
  offsetLeft: Animated.Value = new Animated.Value(-100)

  // https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
  UNSAFE_componentWillReceiveProps(nextProps) {
    // console.log('& cwrp', nextProps)
    const {transitionProps: {navigation: {state: {index}}}} = nextProps
    Animated.spring(this.offsetLeft, {
      toValue: index > 0 ? 0 : -100,
      useNativeDriver: true,
    }).start()
  }

  render() {
    // transitionProps.navigation.state
    // state.index > 0 && state.routes[state.index].params.back &&
    return (
      <Animated.View
        style={{
          position: 'absolute',
          top: 30,
          left: 0,
          width: 51,
          height: 55,
          transform: [
            {
              translateX: this.offsetLeft,
            },
          ],
        }}
      >
        <Image
          style={{position: 'absolute', top: 0, left: 0}}
          source={require('../../../images/backButtonContainer.png')}
        />
        <TouchableOpacity
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
          onPress={() => Actions.pop()}
        >
          <Image source={navBarStyle.backButtonImage} />
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

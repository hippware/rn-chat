import React from 'react'
import {TouchableOpacity, Image, Animated} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {navBarStyle} from '../styles'

type Props = {
  scene: any
  transitionProps: any
}

export default class BackButton extends React.Component<Props> {
  offsetLeft: Animated.Value = new Animated.Value(-100)

  // https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
  UNSAFE_componentWillReceiveProps(nextProps) {
    const {scene: {index, isActive}} = nextProps
    Animated.spring(this.offsetLeft, {
      toValue: index > 0 && isActive ? 0 : -100,
      useNativeDriver: true,
    }).start()
  }

  render() {
    return (
      <Animated.View
        style={{
          position: 'absolute',
          top: 50,
          left: 0,
          width: 51,
          height: 55,
          transform: [
            {
              translateX: this.offsetLeft,
            },
          ],
          zIndex: -1,
        }}
      >
        <Image
          style={{position: 'absolute', top: 0, left: 0}}
          source={require('../../../images/backButtonContainer.png')}
        />
        <TouchableOpacity
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
          onPress={this.props.scene.descriptor.options.backAction || Actions.pop}
        >
          <Image source={navBarStyle.backButtonImage} />
        </TouchableOpacity>
        )
      </Animated.View>
    )
  }
}

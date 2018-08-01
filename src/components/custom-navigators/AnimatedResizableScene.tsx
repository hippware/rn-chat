import React from 'react'
import {Animated} from 'react-native'
import {height as screenHeight} from '../Global'

export default class AnimatedResizableScene extends React.Component<any> {
  state = {height: new Animated.Value(0)}
  render() {
    const {scene} = this.props
    const {navigation, getComponent} = scene.descriptor
    const Scene = getComponent()
    return (
      <Animated.View
        style={
          scene.index > 0
            ? {height: 0, transform: [{translateY: this.state.height}]}
            : {height: screenHeight} // TODO animate main screen
        }
      >
        <Scene
          screenProps={{
            onLayout: ({nativeEvent}) => {
              Animated.spring(this.state.height, {
                toValue: -nativeEvent.layout.height,
                // useNativeDriver: true,
              }).start()
            },
          }}
          navigation={navigation}
        />
      </Animated.View>
    )
  }
}

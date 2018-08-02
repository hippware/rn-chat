import React from 'react'
import {Animated} from 'react-native'
import {height as screenHeight} from '../Global'
import {observable, when, action, reaction, runInAction} from '../../../node_modules/mobx'
import {observer} from '../../../node_modules/mobx-react/native'

@observer
class AnimatedResizableScene extends React.Component<any> {
  @observable sceneHeight?: number = 0
  state = {height: new Animated.Value(0)}

  componentWillMount() {
    reaction(
      () => this.sceneHeight,
      height => {
        // console.log('& start spring')
        Animated.spring(this.state.height, {
          toValue: -height,
          // useNativeDriver: true,
        }).start()
      }
    )
  }

  componentWillReceiveProps({transitionProps, scene}) {
    if (scene.index > 0) {
      if (transitionProps.index < 1) {
        this.setSceneHeight(0)
      }
    }
  }

  @action
  setSceneHeight = height => {
    // console.log('& onlayout', height)
    this.sceneHeight = height
  }

  render() {
    const {scene, transitionProps} = this.props
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
            // onLayout: ({nativeEvent}) => {
            //   Animated.spring(this.state.height, {
            //     toValue: -nativeEvent.layout.height,
            //     // useNativeDriver: true,
            //   }).start()
            // },
            onLayout: ({nativeEvent: {layout: {height}}}) => this.setSceneHeight(height),
          }}
          navigation={navigation}
        />
      </Animated.View>
    )
  }
}

export default AnimatedResizableScene

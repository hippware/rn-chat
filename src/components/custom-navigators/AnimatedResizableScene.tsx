import React from 'react'
import {Animated} from 'react-native'
import {height as screenHeight} from '../Global'
import {observable, action, reaction} from '../../../node_modules/mobx'
import {observer} from '../../../node_modules/mobx-react/native'

type Props = {
  scene: any
  transitionProps: any
}

@observer
class AnimatedResizableScene extends React.Component<Props> {
  @observable sceneHeight?: number = 0
  state = {height: new Animated.Value(0)}

  componentWillMount() {
    reaction(
      () => this.sceneHeight,
      height => {
        Animated.spring(this.state.height, {
          toValue: -height,
          useNativeDriver: true,
        }).start()
      }
    )
  }

  componentWillReceiveProps({transitionProps, scene}) {
    // if (scene.index > 0) {
    //   console.log('& scene', scene, transitionProps)
    // }

    if (scene.index > 0) {
      if (transitionProps.index < 1) {
        this.setSceneHeight(0)
      }
    }
  }

  @action
  setSceneHeight = height => {
    this.sceneHeight = height
  }

  _getScreenStyle = () => {
    const {scene: {index, route: {params: {fromTop}}}} = this.props
    if (index === 0) {
      // the "main" screen
      return {flex: 1}
    } else {
      return {
        position: 'absolute',
        left: 0,
        right: 0,
        top: fromTop ? undefined : screenHeight,
        bottom: fromTop ? screenHeight : undefined,
        transform: [
          {
            translateY: fromTop
              ? Animated.multiply(this.state.height, new Animated.Value(-1)) // TODO: should we do this with interpolation instead?
              : this.state.height,
          },
        ],
      }
    }
  }

  render() {
    const {scene} = this.props
    const {navigation, getComponent} = scene.descriptor
    const Scene = getComponent()
    const style = this._getScreenStyle()
    return (
      <Animated.View style={style}>
        <Scene
          screenProps={{
            onLayout: ({nativeEvent: {layout: {height}}}) => this.setSceneHeight(height),
          }}
          navigation={navigation}
        />
      </Animated.View>
    )
  }
}

export default AnimatedResizableScene

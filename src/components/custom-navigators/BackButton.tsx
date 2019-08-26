import React, {useState} from 'react'
import {TouchableOpacity, Image, Animated} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {navBarStyle} from '../styles'
import {IHomeStore} from 'src/store/HomeStore'
import {inject} from 'mobx-react'
import {observer} from 'mobx-react-lite'
import {FADE_NAV_BAR_HEADER_HEIGHT} from './NavBarHeader'

type Props = {
  scene: any
  homeStore?: IHomeStore
}

const BackButton = inject('homeStore')(
  observer(({scene, homeStore}: Props) => {
    const [offsetLeft] = useState(new Animated.Value(-100))

    const {index, isActive} = scene
    Animated.spring(offsetLeft, {
      toValue: index > 0 && isActive ? 0 : -100,
      useNativeDriver: true,
    }).start()

    return (
      <Animated.View
        style={{
          position: 'absolute',
          top: FADE_NAV_BAR_HEADER_HEIGHT + 10,
          left: -5,
          width: 51,
          height: 55,
          transform: [
            {
              translateX: offsetLeft,
            },
          ],
        }}
      >
        <Image
          style={{position: 'absolute', top: 0, left: 0}}
          source={
            homeStore!.mapType === 'hybrid'
              ? require('../../../images/backButtonContainerDarkShadow.png')
              : require('../../../images/backButtonContainer.png')
          }
        />
        <TouchableOpacity
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
          onPress={scene.descriptor.options.backAction || Actions.pop}
        >
          <Image source={navBarStyle.backButtonImage} />
        </TouchableOpacity>
      </Animated.View>
    )
  })
)

export default BackButton

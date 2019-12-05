import React, {useState} from 'react'
import {TouchableOpacity, Image, Animated} from 'react-native'
import {navBarStyle} from '../styles'
import {FADE_NAV_BAR_HEADER_HEIGHT} from './NavBarHeader'
import {useHomeStore} from 'src/utils/injectors'
import {observer} from 'mobx-react'

type Props = {
  backAction: any
  preview: boolean
}

const BackButton = observer(({preview, backAction}: Props) => {
  const [offsetLeft] = useState(new Animated.Value(-100))
  const {mapType} = useHomeStore()
  Animated.spring(offsetLeft, {
    toValue: !preview ? 0 : -100,
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
          mapType === 'hybrid'
            ? require('../../../images/backButtonContainerDarkShadow.png')
            : require('../../../images/backButtonContainer.png')
        }
      />
      <TouchableOpacity
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
        onPress={backAction}
      >
        <Image source={navBarStyle.backButtonImage} />
      </TouchableOpacity>
    </Animated.View>
  )
})

export default BackButton

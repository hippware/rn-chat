import React, {useState, useEffect} from 'react'
import {TouchableOpacity, Image, Animated, ImageBackground} from 'react-native'
import {navBarStyle} from '../styles'
import {FADE_NAV_BAR_HEADER_HEIGHT} from './NavBarHeaderNew'
import {useHomeStore, useNavStore} from 'src/utils/injectors'
import {observer} from 'mobx-react'
import {Actions} from 'react-native-router-flux'
import {autorun} from 'mobx'

const BackButton = observer(() => {
  const [offsetLeft] = useState(new Animated.Value(-100))
  const {mapType} = useHomeStore()
  const navStore = useNavStore()

  useEffect(() => {
    autorun(
      () => {
        const {preview, backButton, backAction} = navStore!.params
        const show = preview === false || backButton || !!backAction
        Animated.spring(offsetLeft, {
          toValue: show ? 0 : -100,
          useNativeDriver: true,
        }).start()
      },
      {
        name: 'BackButton: show/hide based on nav store changes',
      }
    )
  }, [])

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: FADE_NAV_BAR_HEADER_HEIGHT + 30,
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
      <ImageBackground
        style={{flex: 1}}
        source={
          mapType === 'hybrid'
            ? require('../../../images/backButtonContainerDarkShadow.png')
            : require('../../../images/backButtonContainer.png')
        }
      >
        <TouchableOpacity
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
          onPress={
            navStore!.params.backAction || navStore!.params.preview === false
              ? () => Actions.refresh({preview: true})
              : () => Actions.pop()
          }
        >
          <Image source={navBarStyle.backButtonImage} />
        </TouchableOpacity>
      </ImageBackground>
    </Animated.View>
  )
})

export default BackButton

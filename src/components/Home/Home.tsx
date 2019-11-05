import React from 'react'
import {View} from 'react-native'
import {observer} from 'mobx-react'
import MapHome from './MapHome'
import ButtonColumn from './ButtonColumn'
import HomeBanner from './HomeBanner'
import {width, height} from '../Global'
import {useNavStore, useHomeStore} from 'src/utils/injectors'

type Props = {
  name: string
}

const Home = observer(({name}: Props) => {
  const homeStore = useHomeStore()
  const navStore = useNavStore()
  const {fullScreenMode} = homeStore
  const {scene, isPreviewScene} = navStore!
  const isCurrent = scene === name || isPreviewScene

  return (
    <View
      style={{
        width,
        height,
        justifyContent: 'space-between',
      }}
      testID="screenHome"
    >
      <MapHome />
      <HomeBanner enabled={!fullScreenMode && isCurrent} />
      {isCurrent && <ButtonColumn enabled={!fullScreenMode && isCurrent} />}
    </View>
  )
})

export default Home

import React from 'react'
import {View} from 'react-native'
import {observer} from 'mobx-react-lite'
import MapHome from './MapHome'
import HorizontalCardList from './HorizontalCardList'
import ActiveGeoBotBanner from './ActiveGeoBotBanner'
import {width, height} from '../Global'
import {useNavStore, useHomeStore} from 'src/utils/injectors'

type Props = {
  name: string
}

const Home = observer(({name}: Props) => {
  const homeStore = useHomeStore()
  const navStore = useNavStore()
  const {fullScreenMode, setIndex, list, index} = homeStore!
  const isCurrent = navStore!.scene === name
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
      <ActiveGeoBotBanner enabled={!fullScreenMode && isCurrent} />
      {isCurrent && (
        <HorizontalCardList
          setIndex={setIndex}
          list={list.slice()}
          index={index}
          enabled={!fullScreenMode && isCurrent}
        />
      )}
    </View>
  )
})

export default Home

import React from 'react'
import {View} from 'react-native'
import {observer} from 'mobx-react-lite'
import MapHome from './MapHome'
import HorizontalCardList from './HorizontalCardList'
import ActiveGeoBotBanner from './ActiveGeoBotBanner'
import {IHomeStore} from '../../store/HomeStore'
import {INavStore} from '../../store/NavStore'
import {width, height} from '../Global'
import {inject} from 'mobx-react'
import alert from 'src/utils/alert'

type Props = {
  homeStore?: IHomeStore
  navStore?: INavStore
  name: string
  userId?: string
}

const Home = inject('homeStore', 'navStore')(
  observer(({homeStore, navStore, name, userId}: Props) => {
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
)

export default Home

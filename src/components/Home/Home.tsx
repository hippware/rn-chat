import React from 'react'
import {View} from 'react-native'
import {inject, observer} from 'mobx-react/native'
import MapHome from './MapHome'
import HorizontalCardList from './HorizontalCardList'
import ActiveGeoBotBanner from './ActiveGeoBotBanner'
import {IHomeStore} from '../../store/HomeStore'
import {INavStore} from '../../store/NavStore'

type Props = {
  homeStore?: IHomeStore
  navStore?: INavStore
  name: string
}

@inject('homeStore', 'navStore')
@observer
export default class Home extends React.Component<Props> {
  render() {
    const {homeStore, navStore} = this.props
    const {fullScreenMode, setIndex, list, index} = homeStore
    const isCurrent = navStore.scene === this.props.name
    return (
      <View style={{flex: 1, justifyContent: 'space-between'}} testID="screenHome">
        <MapHome />
        <ActiveGeoBotBanner enabled={!fullScreenMode && isCurrent} />
        <HorizontalCardList
          setIndex={setIndex}
          list={list}
          index={index}
          enabled={!fullScreenMode && isCurrent}
        />
      </View>
    )
  }
}

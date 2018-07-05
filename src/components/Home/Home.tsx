import React from 'react'
import {View} from 'react-native'
import {observer} from 'mobx-react/native'
import Map from './Map'
import {computed} from 'mobx'
import {Actions} from 'react-native-router-flux'
import HorizontalCardList from './HorizontalCardList'
import RightPanel from './RightPanel'
import ActiveGeoBotBanner from './ActiveGeoBotBanner'

interface IProps {}

@observer
export default class Home extends React.Component<IProps> {
  render() {
    return (
      <View style={{flex: 1}} testID="screenHome">
        <Map />
        <ActiveGeoBotBanner />
        {/* todo: fix these to allow for fullScreenMode and to slide out of view */}
        {!this.showingBottomPopup && <RightPanel />}

        <HorizontalCardList />
      </View>
    )
  }

  @computed
  get showingBottomPopup() {
    // TODO: move this logic to rnrf
    return ['bottomMenu', 'locationDetails'].includes(Actions.currentScene)
  }
}

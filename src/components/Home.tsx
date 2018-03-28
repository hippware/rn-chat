import React from 'react'
import {View} from 'react-native'
import {observer} from 'mobx-react/native'
import autobind from 'autobind-decorator'
import BotButton from './BotButton'
import EventList from './EventListView'
import Connectivity from './Connectivity'
import {Actions} from 'react-native-router-flux'

@autobind
@observer
export default class Home extends React.Component<{}> {
  private eventList: any

  private scrollToTop() {
    this.eventList && this.eventList.wrappedInstance.scrollToTop()
  }

  componentDidMount() {
    setTimeout(() => {
      // Actions.friendsMain();
      // Actions.botDetails({item: '80927e0c-18d8-11e8-a5ab-0a580a020223'});
      // Actions.botShareSelectFriends({botId: '80927e0c-18d8-11e8-a5ab-0a580a020223'});
      // Actions.followed();
    }, 500)
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <EventList ref={ref => (this.eventList = ref)} />
        <BotButton />
        <Connectivity />
      </View>
    )
  }
}

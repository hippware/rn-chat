import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import {isAlive} from 'mobx-state-tree'
import {observer, inject} from 'mobx-react/native'
import {k} from './Global'
import {IWocky, IEvent} from 'wocky-client'
import {RText, Separator} from './common'
import DraggablePopupList from './common/DraggablePopupList'
import EventCard from './event-cards/EventCard'
import {colors} from '../constants'
import {navBarStyle} from './Router'

type Props = {
  wocky?: IWocky
}

@inject('wocky')
@observer
class Notifications extends React.Component<Props> {
  componentDidMount() {
    // TODO: move this to wocky-client?
    this.props.wocky.notifications.load({force: true})
  }

  render() {
    const {profile, notifications} = this.props.wocky
    if (!profile || !isAlive(profile)) {
      return null
    }
    return (
      <DraggablePopupList
        fadeNavConfig={{
          back: true,
          title: <RText style={navBarStyle.titleStyle}>Updates</RText>,
        }}
        headerInner={<RText size={16}>Updates</RText>}
        data={notifications.length > 0 ? notifications.list : null}
        // ListFooterComponent={
        //   connected
        //     ? observer(() => <ListFooter footerImage={footerImage} finished={finished} />)
        //     : null
        // }
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        onEndReachedThreshold={0.5}
        onEndReached={notifications.load}
        initialNumToRender={2}
        ItemSeparatorComponent={() => (
          <View style={{backgroundColor: 'white'}}>
            <Separator />
          </View>
        )}
      />
    )
  }

  renderItem = ({item}: {item: IEvent}) => <EventCard item={item} />
  // renderItem = ({item}: {item: IEvent}) => {
  //   console.log('& render', item)
  //   return null
  // }

  keyExtractor = (item: any) => item.id
}

export default Notifications

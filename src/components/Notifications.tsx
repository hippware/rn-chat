import React from 'react'
import {isAlive} from 'mobx-state-tree'
import {observer, inject} from 'mobx-react/native'
import {IWocky, IEvent} from 'wocky-client'
import {RText} from './common'
import DraggablePopupList from './common/DraggablePopupList'
import EventCard from './event-cards/EventCard'
import ListFooter from './ListFooter'
import {navBarStyle} from './styles'

type Props = {
  wocky?: IWocky
}

@inject('wocky')
@observer
class Notifications extends React.Component<Props> {
  componentDidMount() {
    this.props.wocky!.viewNotifications()
  }

  componentWillUnmount() {
    this.props.wocky!.viewNotifications()
  }

  render() {
    const {profile, notifications} = this.props.wocky!
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
        data={notifications.length > 0 ? notifications.list.slice() : []}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        onEndReachedThreshold={0.5}
        onEndReached={notifications.load}
        ListFooterComponent={observer(() => (
          <ListFooter style={{backgroundColor: 'white'}} finished={notifications.finished} />
        ))}
      />
    )
  }

  renderItem = ({item}: {item: IEvent}) => <EventCard item={item} />

  keyExtractor = (item: any) => item.id
}

export default Notifications

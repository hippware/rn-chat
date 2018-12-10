import React from 'react'
import {isAlive} from 'mobx-state-tree'
import {observer, inject} from 'mobx-react/native'
import {IWocky, IEvent} from 'wocky-client'
import {RText} from './common'
import DraggablePopupList from './common/DraggablePopupList'
import EventCard from './event-cards/EventCard'
import ListFooter from './ListFooter'
import {navBarStyle, placeholderStyle} from './styles'
import {colors} from 'src/constants'
import {View} from 'react-native'

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
          <View>
            {notifications.length === 0 ? (
              <View>
                <RText
                  weight="Regular"
                  color={colors.GREY}
                  style={placeholderStyle.placeholderText}
                >
                  No new updates
                </RText>
              </View>
            ) : (
              <ListFooter
                style={{backgroundColor: 'white'}}
                finished={notifications.finished || notifications.length === 0}
              />
            )}
          </View>
        ))}
      />
    )
  }

  renderItem = ({item}: {item: IEvent}) => <EventCard item={item} />

  keyExtractor = (item: any) => item.id
}

export default Notifications

import React from 'react'
import {View} from 'react-native'
import {isAlive} from 'mobx-state-tree'
import {observer, inject} from 'mobx-react/native'
import {k} from './Global'
import {IWocky, IEventBot} from 'wocky-client'
import {RText, DraggablePopupList, Separator} from './common'
import EventCard from './event-cards/EventCard'

type Props = {
  wocky?: IWocky
}

@inject('wocky')
@observer
class Notifications extends React.Component<Props> {
  render() {
    const {profile, events} = this.props.wocky
    if (!profile || !isAlive(profile)) {
      return null
    }
    return (
      <DraggablePopupList
        headerInner={
          <RText size={16} style={{marginBottom: 20 * k}}>
            Updates
          </RText>
        }
        data={events.length > 0 ? events.list : null}
        // ListFooterComponent={
        //   connected
        //     ? observer(() => <ListFooter footerImage={footerImage} finished={finished} />)
        //     : null
        // }
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        onEndReachedThreshold={0.5}
        onEndReached={events.load}
        initialNumToRender={2}
        ItemSeparatorComponent={() => (
          <View style={{backgroundColor: 'white'}}>
            <Separator />
          </View>
        )}
      />
    )
  }

  renderItem = ({item}: {item: IEventBot}) => <EventCard item={item} />

  keyExtractor = (item: any) => item.id
}

export default Notifications

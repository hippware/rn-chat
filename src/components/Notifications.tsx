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
import SwitchButton from './SwitchButton'
import {PINK, WHITE} from '../constants/colors'

type Props = {
  wocky?: IWocky
}

@inject('wocky')
@observer
class Notifications extends React.Component<Props> {
  state = {
    index: 1,
  }
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
        headerInner={
          <View style={{flex: 1, alignItems: 'center'}}>
            <SwitchButton
              text1="Updates"
              text2="Requests"
              switchWidth={220}
              switchHeight={32}
              btnStyle={{}}
              btnHeight={32}
              btnBorderColor={PINK}
              btnBackgroundColor={PINK}
              switchBackgroundColor={WHITE}
              switchBorderColor={PINK}
              switchBorderRadius={16}
              activeFontColor={WHITE}
              fontColor={PINK}
              onValueChange={(index: number) => {
                this.setState({index})
              }}
            />
          </View>
        }
        data={notifications.length > 0 ? notifications.list.slice() : []}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        onEndReachedThreshold={0.5}
        onEndReached={() => notifications.load()}
        ListFooterComponent={observer(() => (
          <View>
            {notifications.length === 0 ? (
              <View>
                <RText
                  weight="Regular"
                  color={colors.GREY}
                  style={placeholderStyle.placeholderText as any}
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

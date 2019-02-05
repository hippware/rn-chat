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
import {View, StyleSheet} from 'react-native'
import SwitchButton from './SwitchButton'
import {PINK, WHITE} from '../constants/colors'

type Props = {
  wocky?: IWocky
}

@inject('wocky')
@observer
class Notifications extends React.Component<Props> {
  componentWillMount() {
    this.props.wocky!.notifications.setMode(1)
  }
  componentDidMount() {
    this.props.wocky!.notifications.readAll()
  }

  componentWillUnmount() {
    this.props.wocky!.notifications.readAll()
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
          title: <RText style={navBarStyle.titleStyle}>{notifications.title}</RText>,
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
              onValueChange={index => {
                notifications.setMode(index)
                notifications.load()
              }}
            >
              {notifications.hasUnreadRequests && <View style={styles.newDot} />}
            </SwitchButton>
          </View>
        }
        data={notifications.data}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        onEndReachedThreshold={0.5}
        onEndReached={() => notifications.load()}
        ListFooterComponent={observer(() => (
          <View>
            {notifications.data.length === 0 ? (
              <View>
                <RText
                  weight="Regular"
                  color={colors.GREY}
                  style={placeholderStyle.placeholderText as any}
                >
                  {notifications.emptyTitle}
                </RText>
              </View>
            ) : (
              <ListFooter
                style={{backgroundColor: 'white'}}
                finished={notifications.finished || notifications.data.length === 0}
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

const styles = StyleSheet.create({
  newDot: {
    position: 'absolute',
    top: -5,
    right: 0,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 13 / 2,
    width: 13,
    height: 13,
    backgroundColor: colors.GOLD,
  },
})

export default Notifications

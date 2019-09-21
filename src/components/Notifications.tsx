import React, {useEffect} from 'react'
import {isAlive} from 'mobx-state-tree'
import {observer} from 'mobx-react-lite'
import {IEvent} from 'wocky-client'
import {RText} from './common'
import DraggablePopupList from './common/DraggablePopupList'
import EventCard from './event-cards/EventCard'
import ListFooter from './ListFooter'
import {navBarStyle, placeholderStyle} from './styles'
import {colors} from 'src/constants'
import {View, StyleSheet} from 'react-native'
import SwitchButton from './SwitchButton'
import {PINK, WHITE} from '../constants/colors'
import {useWocky} from 'src/utils/injectors'

type Props = {
  isActive: boolean
  navigation: any
}

const Notifications = ({isActive, navigation}: Props) => {
  const wocky = useWocky()
  useEffect(() => {
    // send all injected props + bot "up" to static context
    navigation.setParams({wocky})
    wocky.notifications.load().then(() => wocky.notifications.readAll())
    return () => wocky.notifications.setMode(1) // reset
  }, [])

  const {profile, notifications} = wocky
  if (!profile || !isAlive(profile)) {
    return null
  }
  return (
    <DraggablePopupList
      isActive={isActive}
      headerInner={
        <View style={{flex: 1, alignItems: 'center'}}>
          <SwitchButton
            value={notifications.mode as 1 | 2 | undefined}
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
      renderItem={({item}: {item: IEvent}) => <EventCard item={item} />}
      keyExtractor={(item: IEvent) => item.id}
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
;(Notifications as any).navigationOptions = ({
  navigation: {
    state: {
      params: {wocky},
    },
  },
}) => ({
  fadeNavConfig: {
    back: true,
    title: wocky && <RText style={navBarStyle.titleStyle}>{wocky.notifications.title}</RText>,
  },
})

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

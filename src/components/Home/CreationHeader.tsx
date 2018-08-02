import React from 'react'
import {SafeAreaView, View, TouchableOpacity, StyleSheet} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {CloseButton, RText} from '../common'
import AddressBar from '../map/AddressBar'
import {observable, reaction} from 'mobx'
import {IWocky, IBot} from 'wocky-client'
import {ILocationStore} from '../../store/LocationStore'
import {colors} from '../../constants'
import {k} from '../Global'
import {Actions} from 'react-native-router-flux'
import {getSnapshot} from 'mobx-state-tree'
import {INavStore} from '../../store/NavStore'
import {IHomeStore} from '../../store/HomeStore'

type Props = {
  wocky?: IWocky
  locationStore?: ILocationStore
  analytics?: any
  geocodingStore?: any
  navStore?: INavStore
  homeStore?: IHomeStore
  screenProps: any
  navigation: any
}

@inject('wocky', 'locationStore', 'analytics', 'geocodingStore', 'navStore', 'homeStore')
@observer
export default class CreationHeader extends React.Component<Props> {
  @observable bot?: IBot
  trackTimeout: any
  handler: any

  componentWillMount() {
    this.createBot()
    this.trackTimeout = setTimeout(() => this.props.analytics.track('botcreate_start'), 1000)
    this.handler = reaction(
      () => {
        if (this.props.homeStore.mapCenterLocation && this.bot) {
          return this.props.homeStore.mapCenterLocation
        }
      },
      loc => {
        if (loc) {
          this.bot.load({
            location: {
              latitude: loc.latitude,
              longitude: loc.longitude,
              accuracy: loc.accuracy,
            },
          })
          this.props.geocodingStore.reverse(loc).then(data => {
            this.bot.load({addressData: data.meta, address: data.address})
          })
        }
      },
      {
        name: 'CreationHeader: load bot location based on map center',
      }
    )
  }

  componentWillUnmount() {
    clearTimeout(this.trackTimeout)
    this.handler()
  }

  createBot = async () => {
    const {wocky, homeStore: {mapCenterLocation}, locationStore: {location}} = this.props
    const bot = await wocky!.createBot()
    if (location || mapCenterLocation) {
      const l = mapCenterLocation || location
      bot.load({
        location: {
          latitude: l.latitude,
          longitude: l.longitude,
          accuracy: l.accuracy,
        },
        geofence: true,
      })
      bot.location!.load({isCurrent: true})
    }
    this.bot = bot
    const data = await this.props.geocodingStore.reverse(location)
    this.bot.load({addressData: data.meta, address: data.address})
  }

  next = () => {
    this.props.analytics.track('botcreate_chooselocation', getSnapshot(this.bot))
    Actions.botCompose({botId: this.bot.id})
  }

  render() {
    return (
      <View
        style={styles.container}
        onLayout={this.props.screenProps && this.props.screenProps.onLayout}
      >
        <View style={styles.nav}>
          <View style={{width: 100}}>
            <CloseButton style={{left: 0}} />
          </View>
          <RText size={17} style={{textAlign: 'center'}}>
            Pin Location
          </RText>
          <View style={{width: 100}}>
            <TouchableOpacity onPress={this.next} style={{alignSelf: 'flex-end'}}>
              <RText size={17} color={colors.PINK}>
                Next
              </RText>
            </TouchableOpacity>
          </View>
        </View>
        {this.bot && <AddressBar bot={this.bot} isActive={this.props.navigation.isFocused()} />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  nav: {
    flexDirection: 'row',
    padding: 10,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50 * k,
  },
})

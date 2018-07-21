import React from 'react'
import {SafeAreaView, View, TouchableOpacity, StyleSheet} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {CloseButton, RText} from '../common'
import AddressBar from '../map/AddressBar'
import {observable} from 'mobx'
import {IWocky, IBot} from 'wocky-client'
import {ILocationStore} from '../../store/LocationStore'
import {colors} from '../../constants'
import {k} from '../Global'

type Props = {
  wocky?: IWocky
  locationStore?: ILocationStore
  analytics?: any
  geocodingStore?: any
  newBotStore?: any
}

@inject('wocky', 'locationStore', 'analytics', 'geocodingStore', 'newBotStore')
@observer
export default class CreationHeader extends React.Component<Props> {
  @observable bot?: IBot
  trackTimeout: any

  componentWillMount() {
    this.createBot()
  }

  componentDidMount() {
    // TODO HACK: prevent this from firing *after* creating a new bot and popping
    this.trackTimeout = setTimeout(() => this.props.analytics.track('botcreate_start'), 1000)
  }

  componentWillUnmount() {
    clearTimeout(this.trackTimeout)
  }

  createBot = async () => {
    const {wocky, locationStore} = this.props
    const bot = await wocky!.createBot()
    const {location} = locationStore!
    if (location) {
      bot.load({
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
          accuracy: location.accuracy,
        },
      })
      bot.location!.load({isCurrent: true})
    }
    this.bot = bot
    this.props.newBotStore.setId(this.bot.id)
    const data = await this.props.geocodingStore.reverse(location)
    this.bot.load({addressData: data.meta, address: data.address})
  }

  next = () => {
    // TODO
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
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
        {this.bot && <AddressBar bot={this.bot} />}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

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

type Props = {
  wocky?: IWocky
  locationStore?: ILocationStore
  analytics?: any
  geocodingStore?: any
  navStore?: INavStore
}

@inject('wocky', 'locationStore', 'analytics', 'geocodingStore', 'navStore')
@observer
export default class CreationHeader extends React.Component<Props> {
  @observable bot?: IBot
  trackTimeout: any

  componentWillMount() {
    // HACK: since this component stays mounted, must do cleanup with a reaction rather than componentWillMount/componentWillUnmount
    reaction(
      () => this.props.navStore.scene === 'createBot',
      (active: boolean) => {
        if (active) {
          this.createBot()
          this.trackTimeout = setTimeout(() => this.props.analytics.track('botcreate_start'), 1000)
        } else if (!!this.bot) {
          this.bot = undefined
          clearTimeout(this.trackTimeout)
        }
      }
    )
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
    const data = await this.props.geocodingStore.reverse(location)
    this.bot.load({addressData: data.meta, address: data.address})
  }

  next = () => {
    this.props.analytics.track('botcreate_chooselocation', getSnapshot(this.bot))
    Actions.botCompose({botId: this.bot.id})
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

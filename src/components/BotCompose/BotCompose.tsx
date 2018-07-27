import React from 'react'
import {View, TextInput, StyleSheet, TouchableOpacity, Image, Alert, Text} from 'react-native'
import {RText} from '../common'
import BottomPopup from '../BottomPopup'
import {colors} from '../../constants'
import {width, k} from '../Global'
import Carousel from 'react-native-snap-carousel'
import {IWocky, IBot} from 'wocky-client'
import {observer, inject, Observer} from 'mobx-react/native'
import {observable, action} from 'mobx'
import {Actions} from 'react-native-router-flux'
import {getSnapshot} from 'mobx-state-tree'

const {drinks, trees, heart, silverware, store, plane} = require('../../constants/botIcons.json')

const itemSize = 53
const noteIcon = require('../../../images/iconAddnote.png')

type Props = {
  botId: string
  edit?: boolean
  titleBlurred?: boolean
  wocky?: IWocky
  notificationStore?: any
  locationStore?: any
  log?: any
  analytics?: any
}

@inject('wocky', 'notificationStore', 'analytics', 'log')
@observer
class BotCompose extends React.Component<Props> {
  botTitle: any
  @observable isLoading: boolean = false
  controls: any
  @observable bot?: IBot

  componentWillMount() {
    // this.bot = this.props.wocky!.getBot({id: this.props.botId})
  }

  render() {
    return (
      <BottomPopup noCloseTab back>
        <View
          style={{
            backgroundColor: 'transparent',
            marginTop: 182, // TODO: magic number...use exported constants
          }}
        >
          <IconSelector style={{marginBottom: 10}} />
          <TextInput style={styles.textStyle} placeholder="Name this place" />
          <View style={{flexDirection: 'row', paddingVertical: 20 * k, paddingHorizontal: 30 * k}}>
            <EditCTA text="Note" icon={noteIcon} />
            <EditCTA text="Photo" icon={noteIcon} />
          </View>
          {/* TODO
           * How do we lock the button to the bottom of the screen?
           * Ideally BottomPopup isn't a fixed height, but instead rises as high as necessary to display all items
           */}
          <TouchableOpacity
            style={{
              width: '100%',
              backgroundColor: colors.PINK, // TODO: gradient background
              paddingVertical: 10 * k,
              alignItems: 'center',
            }}
            // onPress={() => console.log('TODO: Pin Location press')}
          >
            <RText color="white" size={15}>
              Pin Location
            </RText>
          </TouchableOpacity>
          {/* <View style={{backgroundColor: 'transparent', height: 1500}} /> */}
        </View>
      </BottomPopup>
    )
  }

  save = async (): Promise<void> => {
    const bot = this.bot!
    if (!bot.title) {
      // TODO: slide-down notification
      Alert.alert('Title cannot be empty')
      if (this.botTitle) this.botTitle.focus()
      return
    }
    try {
      this.isLoading = true
      const {isNew, geofence} = bot
      await bot.save()
      if (isNew) {
        // Actions.pop({animated: false})
        Actions.pop()
        setTimeout(() => {
          if (geofence) Actions.geofenceShare({botId: bot.id})
          else Actions.botDetails({item: bot.id, isNew: true})
        })
      } else {
        Actions.pop()
      }
      this.props.analytics.track('botcreate_complete', getSnapshot(bot))
    } catch (e) {
      this.props.notificationStore.flash('Something went wrong, please try again.')
      this.props.analytics.track('botcreate_fail', {bot: getSnapshot(bot), error: e})
      this.props.log('BotCompose save problem', e)
    } finally {
      this.isLoading = false
    }
  }

  // private setEditRef = (r: any) => (this.controls = r)
}

// TODO
// scrollToNote = () => {
//   if (this.bot!.description === '') this.controls.focus()
// }

const EditCTA = ({text, icon}: any) => (
  <TouchableOpacity
    // onPress={() => console.log('TODO: onPress')}
    style={{marginRight: 50 * k, alignItems: 'center', justifyContent: 'center'}}
  >
    <Image source={icon} />
    <RText size={14} color={colors.PINK} style={{marginTop: 8 * k, left: 5 * k}}>
      {text}
    </RText>
  </TouchableOpacity>
)

class IconSelector extends React.Component<any> {
  selector?: any
  @observable index?: number = 0

  render() {
    return (
      <View style={this.props.style}>
        <Carousel
          ref={r => (this.selector = r)}
          data={[silverware, drinks, trees, plane, store, heart]}
          renderItem={this.renderIcon}
          // firstItem={index}
          sliderWidth={width}
          itemWidth={itemSize}
          onBeforeSnapToItem={this.onSnap} // enable if you don't need to unselect current bot for you/tutorial
          // onSnapToItem={setIndex}
          inactiveSlideOpacity={1}
          // enableMomentum
          // enableSnap={false}
        />
      </View>
    )
  }

  renderIcon = ({item, index}) => {
    return (
      <Observer>
        {() => (
          <View style={[styles.iconWrapper]}>
            <View style={[styles.shadow, this.index === index && styles.selectedIcon]}>
              <Text style={styles.icon}>{item}</Text>
            </View>
          </View>
        )}
      </Observer>
    )
  }

  keyExtractor = item => item

  @action onSnap = (index: number) => (this.index = index)
}

export default BotCompose

const styles = StyleSheet.create({
  textStyle: {
    height: 50 * k,
    width: '100%',
    borderBottomColor: colors.LIGHT_GREY,
    borderBottomWidth: 1,
    padding: 10 * k,
    paddingLeft: 21 * k,
    fontFamily: 'Roboto-Regular',
    fontSize: 16 * k,
  },
  iconWrapper: {
    height: itemSize,
    width: itemSize,
    padding: 3,
  },
  shadow: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowOffset: {height: 0, width: 0},
    shadowRadius: 4,
    shadowOpacity: 0.18,
    shadowColor: colors.PINK,
    borderRadius: 4.4,
    flex: 1,
  },
  selectedIcon: {
    shadowOffset: undefined,
    shadowRadius: 0,
    shadowOpacity: 0,
    borderWidth: 2,
    borderColor: colors.PINK,
  },
  icon: {
    fontFamily: 'fontello',
    fontSize: 25,
    color: colors.PINK,
  },
})

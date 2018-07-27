import React from 'react'
import {View, TextInput, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native'
import {RText} from '../common'
import BottomPopup from '../BottomPopup'
import {colors} from '../../constants'
import {width, k} from '../Global'
import Carousel from 'react-native-snap-carousel'
import {IWocky, IBot} from 'wocky-client'
import {observer, inject} from 'mobx-react/native'
import {observable} from 'mobx'
import {Actions} from 'react-native-router-flux'
import {getSnapshot} from 'mobx-state-tree'

const itemSize = 50
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
  render() {
    return (
      <View style={this.props.style}>
        <Carousel
          // ref={r => (this.list = r)}
          data={['1', '2', '3']}
          renderItem={this.renderItem}
          // firstItem={index}
          sliderWidth={width}
          itemWidth={itemSize}
          // onSnapToItem={index => list[index].select()} // enable if you don't need to unselect current bot for you/tutorial
          // onSnapToItem={setIndex}
          inactiveSlideOpacity={1}
        />
      </View>
    )
  }

  renderItem = ({item, index}) => (
    <View style={{height: itemSize, width: itemSize, borderColor: colors.PINK, borderWidth: 2}} />
  )

  keyExtractor = item => item
}

export default BotCompose

const styles = StyleSheet.create({
  textStyle: {
    height: 50 * k,
    width: '100%',
    // borderTopColor: colors.LIGHT_GREY,
    borderBottomColor: colors.LIGHT_GREY,
    // borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 10 * k,
    paddingLeft: 21 * k,
    fontFamily: 'Roboto-Regular',
    fontSize: 16 * k,
  },
})

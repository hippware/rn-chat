import React from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Keyboard,
  // InputAccessoryView
} from 'react-native'
// import {width} from '../Global'
import {RText} from '../common'
import BottomPopup from '../BottomPopup'
import {colors} from '../../constants'
import {k} from '../Global'
import {IWocky, IBot} from 'wocky-client'
import {observer, inject} from 'mobx-react/native'
import {observable, action} from 'mobx'
import {Actions} from 'react-native-router-flux'
import {getSnapshot} from 'mobx-state-tree'
import IconSelector from './IconSelector'
const noteIcon = require('../../../images/iconAddnote.png')
const photoIcon = require('../../../images/attachPhotoPlus.png')

// https://github.com/facebook/react-native/issues/19465#issuecomment-399111765
// const InputAccessoryView = require('InputAccessoryView')

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
  @observable isLoading: boolean = false
  @observable bot?: IBot
  @observable keyboardShowing: boolean = false
  controls: any
  botTitle: any
  keyboardDidShowListener: any
  keyboardDidHideListener: any
  accessoryText?: any

  componentWillMount() {
    this.bot = this.props.wocky!.getBot({id: this.props.botId})
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide)
  }

  render() {
    const inputAccessoryViewID = 'uniqueID'
    return (
      <BottomPopup noCloseTab back>
        <View
          style={{
            backgroundColor: 'transparent',
            marginTop: 172, // TODO: magic number...use exported constants
          }}
        >
          {this.bot && <IconSelector style={{marginBottom: 10}} bot={this.bot} />}
          <TextInput
            style={styles.textStyle}
            placeholder="Name this place"
            inputAccessoryViewID={inputAccessoryViewID}
            ref={r => (this.botTitle = r)}
            onChangeText={text => this.bot.load({title: text})}
            value={this.bot.title}
          />
          {/* <InputAccessoryView nativeID={inputAccessoryViewID}>
            {this.keyboardShowing && (
              <TextInput
                style={[styles.textStyle, {width}]}
                placeholder="Name this place"
                // autoFocus
                ref={r => (this.accessoryText = r)}
                autoFocus
              />
            )}
          </InputAccessoryView> */}
          <View style={{flexDirection: 'row', paddingVertical: 20 * k, paddingHorizontal: 30 * k}}>
            <EditCTA text="Note" icon={noteIcon} />
            <EditCTA text="Photo" icon={photoIcon} />
          </View>
          {/* TODO
           * How do we lock the button to the bottom of the screen?
           * Ideally BottomPopup isn't a fixed height, but instead rises as high as necessary to display all items
           */}
          <TouchableOpacity
            style={{
              width: '100%',
              backgroundColor: colors.PINK, // TODO: gradient background
              paddingVertical: 15 * k,
              alignItems: 'center',
            }}
            onPress={this.save}
          >
            <RText color="white" size={15}>
              Pin Location
            </RText>
          </TouchableOpacity>
        </View>
      </BottomPopup>
    )
  }

  @action
  _keyboardDidShow = () => {
    // console.log('show')
    this.keyboardShowing = true
    // if (this.accessoryText) this.accessoryText.focus()
  }

  @action
  _keyboardWillHide = () => {
    // console.log('will hide')
    this.keyboardShowing = false
    // if (this.accessoryText) this.accessoryText.blur()
  }

  save = async (): Promise<void> => {
    const bot = this.bot!
    if (!bot.title) {
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
          else Actions.botDetails({botId: bot.id, isNew: true})
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

export default BotCompose

const styles = StyleSheet.create({
  textStyle: {
    height: 50 * k,
    width: '100%',
    borderBottomColor: colors.GREY,
    borderBottomWidth: 1,
    borderTopColor: colors.GREY,
    borderTopWidth: 1,
    backgroundColor: 'white',
    padding: 10 * k,
    paddingLeft: 21 * k,
    fontFamily: 'Roboto-Regular',
    fontSize: 16 * k,
  },
})

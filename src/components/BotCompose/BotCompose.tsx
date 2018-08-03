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
import {RText, Spinner} from '../common'
import BottomPopup from '../BottomPopup'
import {colors} from '../../constants'
import {k} from '../Global'
import {IWocky, IBot} from 'wocky-client'
import {observer, inject} from 'mobx-react/native'
import {observable, action} from 'mobx'
import {Actions} from 'react-native-router-flux'
import {getSnapshot} from 'mobx-state-tree'
import IconSelector from './IconSelector'
import {showImagePicker} from '../ImagePicker'

const noteIcon = require('../../../images/iconAddnote.png')
const noteIconDone = require('../../../images/noteAdded.png')
const photoIcon = require('../../../images/attachPhotoPlus.png')
const photoIconDone = require('../../../images/photoAdded.png')

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
  screenProps: any
}

@inject('wocky', 'notificationStore', 'analytics', 'log')
@observer
class BotCompose extends React.Component<Props> {
  @observable isLoading: boolean = false
  @observable bot?: IBot
  @observable keyboardShowing: boolean = false
  @observable uploadingPhoto: boolean = false
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
      <BottomPopup onLayout={this.props.screenProps && this.props.screenProps.onLayout} back>
        {this.bot && <IconSelector bot={this.bot} />}
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
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            paddingVertical: 20 * k,
            paddingHorizontal: 30 * k,
          }}
        >
          <EditCTA text="Note" icon={this.bot.description ? noteIconDone : noteIcon} />
          <EditCTA
            text="Photo"
            icon={this.bot.image ? photoIconDone : photoIcon}
            onPress={this.addPhoto}
            pending={this.uploadingPhoto}
          />
        </View>
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
      </BottomPopup>
    )
  }

  addPhoto = (): void => {
    showImagePicker(null, async (source, response) => {
      try {
        this.uploadingPhoto = true
        await this.bot!.upload({file: source, ...response})
      } catch (e) {
        this.props.notificationStore.flash(`Upload error: ${e}`)
      } finally {
        this.uploadingPhoto = false
      }
    })
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

const EditCTA = ({text, icon, onPress, pending}: any) => (
  <TouchableOpacity
    onPress={onPress}
    style={{marginRight: 20 * k, alignItems: 'center', justifyContent: 'center'}}
  >
    {pending ? (
      <View style={{width: 58, alignItems: 'center', justifyContent: 'center'}}>
        <Spinner size={40} />
      </View>
    ) : (
      <Image source={icon} />
    )}

    <RText size={14} color={colors.PINK} style={{marginTop: 8 * k}}>
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

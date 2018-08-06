import React from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Keyboard,
  Animated,
  // InputAccessoryView
} from 'react-native'
// import {width} from '../Global'
import {RText, Spinner} from '../common'
import {colors} from '../../constants'
import {k, width} from '../Global'
import {IWocky, IBot} from 'wocky-client'
import {observer, inject} from 'mobx-react/native'
import {observable, action, reaction} from 'mobx'
import {Actions} from 'react-native-router-flux'
import {getSnapshot} from 'mobx-state-tree'
import IconSelector from './IconSelector'
import IconStore from '../../store/IconStore'
import {showImagePicker} from '../ImagePicker'
import EmojiSelector from 'react-native-emoji-selector'

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
  iconStore?: IconStore
  notificationStore?: any
  locationStore?: any
  log?: any
  analytics?: any
  screenProps: any
}

type State = {
  keyboardHeight: Animated.Value
  emojiHeight: Animated.Value
}

@inject('wocky', 'iconStore', 'notificationStore', 'analytics', 'log')
@observer
class BotCompose extends React.Component<Props, State> {
  @observable isLoading: boolean = false
  @observable bot?: IBot
  @observable keyboardShowing: boolean = false
  @observable uploadingPhoto: boolean = false
  // @observable keyboardHeight: number = 0
  controls: any
  botTitle: any
  keyboardDidShowListener: any
  keyboardDidHideListener: any
  accessoryText?: any

  state: State = {
    keyboardHeight: new Animated.Value(0),
    emojiHeight: new Animated.Value(0),
  }

  componentWillMount() {
    this.bot = this.props.wocky!.getBot({id: this.props.botId})

    reaction(
      () => this.props.iconStore.isEmojiKeyboardShown,
      shown => {
        Animated.timing(this.state.emojiHeight, {
          toValue: shown ? 305 : 0,
          duration: 500,
        }).start()
      }
    )
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide)
  }

  onEmojiSelected = e => {
    this.props.iconStore.changeEmoji(e)
  }

  onSnap = () => {
    if (this.botTitle) {
      this.botTitle.blur()
    }
  }

  render() {
    const inputAccessoryViewID = 'uniqueID'
    return (
      <View>
        {this.bot && <IconSelector onSnap={this.onSnap} bot={this.bot} />}
        {
          <Animated.View style={{height: this.state.emojiHeight, backgroundColor: 'white'}}>
            <EmojiSelector
              onEmojiSelected={this.onEmojiSelected}
              showSearchBar={false}
              columns={8}
            />
          </Animated.View>
        }
        {!this.props.iconStore.isEmojiKeyboardShown && (
          <View>
            {/* <Animated.View> */}
            <TextInput
              style={styles.textStyle}
              placeholder="Name this place"
              inputAccessoryViewID={inputAccessoryViewID}
              ref={r => (this.botTitle = r)}
              onChangeText={text => this.bot.load({title: text})}
              value={this.bot.title}
            />
            {/* </Animated.View> */}
            <View>
              {!this.keyboardShowing && (
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
              )}
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
              </TouchableOpacity>,
            </View>
          </View>
        )}
        <Animated.View style={{right: 0, left: 0, bottom: 0, height: this.state.keyboardHeight}} />
      </View>
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
  _keyboardWillShow = ({endCoordinates, duration}: any) => {
    this.keyboardShowing = true
    Animated.timing(this.state.keyboardHeight, {
      toValue: endCoordinates.height,
      duration,
    }).start()
  }

  @action
  _keyboardWillHide = ({duration}: any) => {
    this.keyboardShowing = false
    Animated.timing(this.state.keyboardHeight, {
      toValue: 0,
      duration,
    }).start()
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

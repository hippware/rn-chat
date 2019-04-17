import React from 'react'
import {
  StyleSheet,
  Keyboard,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from 'react-native'
import {RText, Spinner} from '../common'
import withKeyboard from '../common/withKeyboardHOC'
import {colors} from '../../constants'
import {k, height, minHeight} from '../Global'
import {IWocky, IBot} from 'wocky-client'
import {observer, inject} from 'mobx-react/native'
import {observable, reaction, computed} from 'mobx'
import {Actions} from 'react-native-router-flux'
import {getSnapshot} from 'mobx-state-tree'
import IconStore from '../../store/IconStore'
import {showImagePicker} from '../ImagePicker'
import EmojiSelector from 'react-native-emoji-selector'
import LinearGradient from 'react-native-linear-gradient'
import {IHomeStore} from '../../store/HomeStore'
import {BlurView} from 'react-native-blur'
import globalStyles from '../styles'
import alert from '../../utils/alert'

const noteIcon = require('../../../images/iconAddnote.png')
const noteIconDone = require('../../../images/noteAdded.png')
const photoIcon = require('../../../images/attachPhotoPlus.png')
const photoIconDone = require('../../../images/photoAdded.png')

export function backAction(iconStore: IconStore) {
  iconStore!.isEmojiKeyboardShown
    ? iconStore!.toggleEmojiKeyboard()
    : alert('Unsaved Changes', 'Are you sure you want to discard the changes?', [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Discard',
          style: 'destructive',
          onPress: async () => {
            Actions.pop()
          },
        },
      ])
}

type Props = {
  botId: string
  edit?: boolean
  titleBlurred?: boolean
  wocky?: IWocky
  iconStore?: IconStore
  homeStore?: IHomeStore
  notificationStore?: any
  locationStore?: any
  log?: any
  analytics?: any
  keyboardShowing?: boolean
}

const emojiKeyboardHeight = height / 2

@inject('wocky', 'homeStore', 'iconStore', 'notificationStore', 'analytics', 'log', 'locationStore')
@observer
export class BotCompose extends React.Component<Props> {
  @observable isLoading: boolean = false
  @observable bot?: IBot
  @observable uploadingPhoto: boolean = false
  @observable text: string = ''
  controls: any
  botTitle: any
  note: any
  accessoryText?: any
  handler: any
  handler2: any

  componentWillMount() {
    this.bot = this.props.wocky!.getBot({id: this.props.botId})
    // all bots now are geofence
    if (this.props.homeStore!.mapCenterLocation) {
      this.bot!.load({geofence: true, location: {...this.props.homeStore!.mapCenterLocation}})
    }
    if (this.bot) {
      this.text = this.bot.title || ''
      this.props.iconStore!.setEmoji(this.bot.icon)
    }
  }

  componentDidMount() {
    this.handler = reaction(
      () => ({...this.props.homeStore!.mapCenterLocation}),
      location => {
        if (this.props.homeStore!.creationMode) {
          this.bot!.load({location})
        }
      }
    )
  }

  componentWillUnmount() {
    this.props.iconStore!.reset()
    this.handler()
  }

  @computed
  get saveable() {
    return this.text
  }

  onEmojiSelected = e => {
    this.props.iconStore!.setEmoji(e)
    this.props.iconStore!.toggleEmojiKeyboard()
  }

  onSnap = () => {
    if (this.botTitle) {
      this.botTitle.blur()
    }
  }

  render() {
    const theColors = this.saveable
      ? ['rgb(242,68,191)', 'rgb(254,110,98)', 'rgb(254,92,108)']
      : [colors.DARK_GREY, colors.DARK_GREY]
    return (
      <View>
        <View
          style={{
            shadowColor: 'rgba(254, 92, 108, 0.3)',
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowRadius: 12,
            shadowOpacity: 1,
            height: this.props.iconStore!.isEmojiKeyboardShown ? emojiKeyboardHeight : 0,
            backgroundColor: Platform.select({
              ios: 'transparent',
              android: 'white',
            }),
          }}
        >
          {/* todo: add blurview on Android hacks: https://github.com/react-native-community/react-native-blur#android */}
          {Platform.OS === 'ios' && (
            <BlurView
              blurType="light"
              blurAmount={5}
              style={
                [
                  globalStyles.absolute,
                  {
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    overflow: 'hidden',
                  },
                ] as any
              }
            />
          )}
          <EmojiSelector
            showHistory
            onEmojiSelected={this.onEmojiSelected}
            showSearchBar={false}
            columns={8}
          />
        </View>
        {!this.props.iconStore!.isEmojiKeyboardShown && (
          <View>
            <TextInput
              style={styles.textStyle}
              placeholder="Name this place"
              ref={r => (this.botTitle = r)}
              onChangeText={text => (this.text = text)}
              value={this.text}
              selectionColor={colors.COVER_BLUE}
            />
            <View>
              {!this.props.keyboardShowing && (
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    paddingVertical: 20 * k,
                    paddingHorizontal: 30 * k,
                  }}
                >
                  <EditCTA
                    text="Note"
                    icon={this.bot!.description ? noteIconDone : noteIcon}
                    onPress={() => Actions.editNote({botId: this.bot!.id})}
                  />
                  <EditCTA
                    text="Photo"
                    icon={this.bot!.image ? photoIconDone : photoIcon}
                    onPress={this.addPhoto}
                    pending={this.uploadingPhoto}
                  />
                </View>
              )}
              <TouchableOpacity
                style={{width: '100%', height: 50 * minHeight}}
                disabled={!this.saveable}
                onPress={this.save}
              >
                <LinearGradient
                  start={{x: 0, y: 0.5}}
                  end={{x: 1, y: 0.5}}
                  colors={theColors}
                  style={styles.gradient}
                >
                  <RText color="white" size={15}>
                    {this.props.edit ? 'Save Changes' : 'Pin Location'}
                  </RText>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    )
  }

  addPhoto = async () => {
    const image = await showImagePicker()
    if (image) {
      try {
        this.uploadingPhoto = true
        await this.bot!.upload({size: image.size, file: image})
      } catch (e) {
        this.props.notificationStore.flash(`Upload error: ${e}`)
      } finally {
        this.uploadingPhoto = false
      }
    }
  }

  save = async (): Promise<void> => {
    if (!this.text) {
      Alert.alert('Title cannot be empty')
      if (this.botTitle) this.botTitle.focus()
      return
    }
    try {
      this.isLoading = true
      const {load, save, setUserLocation} = this.bot!
      load({title: this.text, icon: this.props.iconStore!.emoji})
      Keyboard.dismiss()
      setUserLocation(this.props.locationStore.location)
      await save()

      if (!this.props.edit) {
        // need to add new bot to localBots (to be displayed on MapHome)
        this.props.wocky!.localBots.add(this.bot!)

        setTimeout(() => {
          Actions.geofenceShare({botId: this.bot!.id}) // all bots now are 'geofence'
        })
      } else {
        Actions.pop()
      }
      this.props.analytics.track('botcreate_complete', getSnapshot(this.bot!))
    } catch (e) {
      this.props.notificationStore.flash('Something went wrong, please try again.')
      this.props.analytics.track('botcreate_fail', {bot: getSnapshot(this.bot!), error: e})
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

    <RText size={15} color={colors.PINK}>
      {text}
    </RText>
  </TouchableOpacity>
)

export default withKeyboard(BotCompose)

const styles = StyleSheet.create({
  textStyle: {
    height: 50 * minHeight,
    borderBottomColor: colors.GREY,
    borderBottomWidth: 1,
    borderTopColor: colors.GREY,
    borderTopWidth: 1,
    backgroundColor: 'white',
    padding: 13,
    paddingLeft: 21 * k,
    fontFamily: 'Roboto-Regular',
    fontSize: 17,
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingVertical: 15 * minHeight,
    alignItems: 'center',
  },
})

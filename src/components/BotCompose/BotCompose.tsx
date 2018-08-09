import React from 'react'
import {StyleSheet, View, TextInput, TouchableOpacity, Image, Alert, Animated} from 'react-native'
import {RText, Spinner} from '../common'
import withKeyboard from '../common/withKeyboardHOC'
import {colors} from '../../constants'
import {k} from '../Global'
import {IWocky, IBot} from 'wocky-client'
import {observer, inject} from 'mobx-react/native'
import {observable, reaction} from 'mobx'
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
  keyboardShowing?: boolean
}

@inject('wocky', 'iconStore', 'notificationStore', 'analytics', 'log')
@observer
export class BotCompose extends React.Component<Props> {
  @observable isLoading: boolean = false
  @observable bot?: IBot
  @observable uploadingPhoto: boolean = false
  controls: any
  botTitle: any
  note: any
  accessoryText?: any
  emojiHeight = new Animated.Value(0)

  componentWillMount() {
    this.bot = this.props.wocky!.getBot({id: this.props.botId})
    this.props.iconStore.setIcon(this.bot.icon)

    reaction(
      () => this.props.iconStore.isEmojiKeyboardShown,
      shown => {
        Animated.timing(this.emojiHeight, {
          toValue: shown ? 305 : 0,
          duration: 500,
        }).start()
      }
    )
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
    return (
      <View>
        <IconSelector onSnap={this.onSnap} bot={this.bot} key="1" />,
        <Animated.View style={{height: this.emojiHeight, backgroundColor: 'white'}} key="2">
          <EmojiSelector onEmojiSelected={this.onEmojiSelected} showSearchBar={false} columns={8} />
        </Animated.View>
        {!this.props.iconStore.isEmojiKeyboardShown && (
          <View>
            <TextInput
              style={styles.textStyle}
              placeholder="Name this place"
              ref={r => (this.botTitle = r)}
              onChangeText={text => this.bot.load({title: text})}
              value={this.bot.title}
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
                    icon={this.bot.description ? noteIconDone : noteIcon}
                    onPress={() => Actions.editNote({botId: this.bot.id})}
                  />
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
              </TouchableOpacity>
            </View>
          </View>
        )}
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

export default withKeyboard(BotCompose)

const styles = StyleSheet.create({
  textStyle: {
    height: 50 * k,
    left: 0,
    right: 0,
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

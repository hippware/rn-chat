import React, {useState, useEffect} from 'react'
import {StyleSheet, Keyboard, View, TouchableOpacity, Image, Alert, Platform} from 'react-native'
import {RText, RTextInput, Spinner, withKeyboardHOC} from '../common'
import {colors} from '../../constants'
import {k, height, minHeight} from '../Global'
import {IWocky, IBot} from 'wocky-client'
import {inject} from 'mobx-react'
import {reaction} from 'mobx'
import {Actions} from 'react-native-router-flux'
import {getSnapshot} from 'mobx-state-tree'
import IconStore from '../../store/IconStore'
import {showImagePicker} from '../ImagePicker'
import EmojiSelector from 'react-native-emoji-selector'
import LinearGradient from 'react-native-linear-gradient'
import {IHomeStore} from '../../store/HomeStore'
import {BlurView} from 'react-native-blur'
import alert from '../../utils/alert'
import {log, warn} from '../../utils/logger'
import {observer} from 'mobx-react'

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
          onPress: () => {
            Actions.pop()
          },
        },
      ])
}

type Props = {
  botId: string
  title?: string
  edit?: boolean
  titleBlurred?: boolean
  wocky?: IWocky
  iconStore?: IconStore
  homeStore?: IHomeStore
  notificationStore?: any
  locationStore?: any
  geocodingStore?: any
  analytics?: any
  keyboardShowing?: boolean
}

const emojiKeyboardHeight = height / 2

const BotCompose = inject(
  'wocky',
  'homeStore',
  'iconStore',
  'notificationStore',
  'analytics',
  'locationStore',
  'geocodingStore'
)(
  observer((props: Props) => {
    let botTitle
    let disposer

    const [bot, setBot] = useState<IBot | undefined>(undefined)
    const [uploadingPhoto, setUploadingPhoto] = useState(false)
    const [text, setText] = useState<string>('')
    const [textReactsToLocation, setTextReacts] = useState(false)

    useEffect(() => {
      const tempBot = props.wocky!.getBot({id: props.botId})
      setBot(tempBot)
      if (props.homeStore!.mapCenterLocation) {
        tempBot!.load({geofence: true, location: {...props.homeStore!.mapCenterLocation}})
      }

      setText(props.title || '')

      if (tempBot) {
        if (tempBot.title) {
          setText(tempBot.title)
          setTextReacts(false)
        }

        props.iconStore!.setEmoji(tempBot.icon)
      }

      disposer = reaction(
        () => ({
          location: props.homeStore!.mapCenterLocation,
        }),
        ({location}) => {
          try {
            const {creationMode} = props.homeStore!
            if (creationMode) {
              tempBot!.load({location: {...location}})
              if (textReactsToLocation) {
                props.geocodingStore!.reverse(location).then(data => {
                  if (data && data.address) {
                    setText(data.address)
                  }
                })
              }
            }
          } catch (err) {
            warn('autorun error', err)
          }
        },
        // NOTE: if we already have a title from the AddressBar then we shouldn't update the title (fireImmediately) with the address
        {name: 'Update location on map move', fireImmediately: !props.title}
      )

      return () => {
        disposer()
      }
    }, [])

    const theColors = !!text
      ? ['rgb(242,68,191)', 'rgb(254,110,98)', 'rgb(254,92,108)']
      : [colors.DARK_GREY, colors.DARK_GREY]

    return bot ? (
      <View style={styles.container}>
        {props.iconStore!.isEmojiKeyboardShown ? (
          <View
            style={{
              shadowColor: 'rgba(254, 92, 108, 0.3)',
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowRadius: 12,
              shadowOpacity: 1,
              height: emojiKeyboardHeight,
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
                    StyleSheet.absoluteFill,
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
              onEmojiSelected={onEmojiSelected}
              showSearchBar={false}
              columns={8}
            />
          </View>
        ) : (
          <View style={styles.container}>
            <RTextInput
              style={styles.textStyle}
              placeholder="Name this place"
              textInputRef={r => (botTitle = r)}
              onChangeText={t => {
                setTextReacts(false)
                setText(t)
              }}
              value={text}
              selectionColor={colors.COVER_BLUE}
            />
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
                icon={bot!.description ? noteIconDone : noteIcon}
                onPress={() => {
                  bot!.load({title: text, icon: props.iconStore!.emoji})
                  Actions.editNote({botId: bot!.id})
                }}
              />
              <EditCTA
                text="Photo"
                icon={bot!.image ? photoIconDone : photoIcon}
                onPress={addPhoto}
                pending={uploadingPhoto}
              />
            </View>
            <TouchableOpacity
              style={{width: '100%', height: 50 * minHeight}}
              disabled={!text}
              onPress={save}
            >
              <LinearGradient
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
                colors={theColors}
                style={styles.gradient}
              >
                <RText color="white" size={15}>
                  {props.edit ? 'Save Changes' : 'Pin Location'}
                </RText>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </View>
    ) : null

    function onEmojiSelected(e) {
      props.iconStore!.setEmoji(e)
      props.iconStore!.toggleEmojiKeyboard()
    }

    async function addPhoto() {
      const image = await showImagePicker()
      if (image) {
        try {
          setUploadingPhoto(true)
          bot!.setFile(image)
          await bot!.upload()
        } catch (e) {
          props.notificationStore.flash(`Upload error: ${e}`)
        } finally {
          setUploadingPhoto(false)
        }
      }
    }

    async function save(): Promise<void> {
      if (!text) {
        Alert.alert('Title cannot be empty')
        if (botTitle) botTitle.focus()
        return
      }
      try {
        const {load, save: saveBot, setUserLocation} = bot!
        load({title: text, icon: props.iconStore!.emoji})
        Keyboard.dismiss()
        setUserLocation(props.locationStore.location)
        await saveBot()

        if (!props.edit) {
          // need to add new bot to localBots (to be displayed on MapHome)
          props.wocky!.localBots.add(bot!)

          setTimeout(() => {
            Actions.geofenceShare({botId: bot!.id}) // all bots now are 'geofence'
          })
        } else {
          Actions.pop()
        }
        props.analytics.track('botcreate_complete', getSnapshot(bot!))
      } catch (e) {
        props.notificationStore.flash('Something went wrong, please try again.')
        props.analytics.track('botcreate_fail', {bot: getSnapshot(bot!), error: e})
        log('BotCompose save problem', e)
      }
    }
  })
)

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

const KeyboardAwareBotCompose = Platform.OS === 'ios' ? withKeyboardHOC(BotCompose) : BotCompose

export default KeyboardAwareBotCompose

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
  container: {position: 'absolute', bottom: 0, left: 0, right: 0},
})

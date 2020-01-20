import React, {useState, useEffect, useRef} from 'react'
import {
  View,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
  StyleSheet,
} from 'react-native'
import {inject} from 'mobx-react'
import {observer} from 'mobx-react'
import {Spinner, RText, RTextInput} from '../common'
import {colors} from '../../constants'
import {showImagePicker, PickerImage} from '../ImagePicker'
import {k, minHeight} from '../Global'
import {IWocky, IBot, IBotPost} from 'wocky-client'
import withKeyboardHOC from '../common/withKeyboardHOC'
import {log} from '../../utils/logger'

const IMAGE_HEIGHT = 70 * k

type Props = {
  bot: IBot
  wocky?: IWocky
  afterPostSent: () => void
  notificationStore?: any // TODO proper type
  navStore: any
}

const AddBotPost = inject(
  'notificationStore',
  'wocky',
  'navStore'
)(
  observer((props: Props) => {
    const [imageURI, setImageURI] = useState('')
    const [text, setText] = useState('')
    const [sendingPost, setSendingPost] = useState(false)
    const [image, setImage] = useState<PickerImage | undefined>(undefined)
    const textInput = useRef<TextInput>(null)

    // let image: PickerImage | undefined | void
    let post: IBotPost | null = null

    useEffect(() => {
      // remove unpublished post
      if (post && post.id && props.bot) {
        props.bot.removePost(post.id)
      }
    }, [])

    async function onSend() {
      if (sendingPost) return
      setSendingPost(true)
      const {notificationStore, bot} = props
      try {
        post = bot.createPost(text.trim())
        if (image) {
          post!.setFile(image)
          await post!.upload()
        }
        await post!.publish()
        post = null
        setText('')
        setImageURI('')
        setImage(undefined)
        textInput.current!.blur()
        Keyboard.dismiss()
        props.afterPostSent()
      } catch (e) {
        log('AddBotPost error', e)
        const message =
          e.code === '403'
            ? 'Cannot publish, access denied'
            : 'Something went wrong, please try again'
        notificationStore.flash(message)
      } finally {
        setSendingPost(false)
      }
    }

    async function onAttach() {
      const tempImage = await showImagePicker()
      if (tempImage) {
        // todo: fix uri here
        setImageURI(tempImage.uri)
        setImage(tempImage)
        if (textInput) {
          textInput.current!.focus()
        }
      }
    }

    const textLength = text.trim().length
    const {wocky} = props

    return (
      <View
        style={{
          backgroundColor: colors.WHITE,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderColor: colors.GREY,
        }}
      >
        <View style={[styles.textInputContainer]}>
          <TouchableOpacity
            hitSlop={{top: 15, left: 15, right: 15, bottom: 15}}
            style={{borderWidth: 0, borderColor: 'transparent'}}
            onPress={onAttach}
            disabled={!!imageURI}
          >
            <Image
              style={{height: 21}}
              resizeMode="contain"
              source={
                imageURI
                  ? require('../../../images/attachPhotoGray.png')
                  : require('../../../images/attachPhoto.png')
              }
            />
          </TouchableOpacity>
          <RTextInput
            ref={textInput}
            onChangeText={setText}
            style={[styles.textInput, styles.textInputDay, {height: 'auto'}]}
            placeholder="Add a comment"
            placeholderTextColor={colors.DARK_GREY}
            multiline
            returnKeyType="default"
            enablesReturnKeyAutomatically
            value={text}
            maxLength={5000}
            selectionColor={colors.COVER_BLUE}
          />
          <TouchableOpacity
            hitSlop={{top: 15, left: 15, right: 15, bottom: 15}}
            disabled={(textLength === 0 && !imageURI) || !wocky!.connected || sendingPost}
            onPress={onSend}
          >
            {sendingPost ? (
              <Spinner size={22} />
            ) : (
              <RText
                size={16}
                color={(textLength || imageURI) && wocky!.connected ? colors.PINK : colors.GREY}
              >
                Post
              </RText>
            )}
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor: 'white'}}>
          <ImagePost
            imageURI={imageURI}
            deleteImage={() => {
              setImageURI('')
              setImage(undefined)
            }}
          />
        </View>
      </View>
    )
  })
)

const ImagePost = ({imageURI, deleteImage}) => {
  return imageURI ? (
    <View style={styles.imageContainer}>
      <Image
        source={{uri: imageURI}}
        style={{
          height: IMAGE_HEIGHT,
          width: IMAGE_HEIGHT,
          marginLeft: 60,
          marginTop: 10 * minHeight,
          marginBottom: 10 * minHeight,
        }}
      />
      <TouchableOpacity onPress={deleteImage}>
        <Image
          source={require('../../../images/deleteImage.png')}
          style={{position: 'relative', right: 10}}
        />
      </TouchableOpacity>
    </View>
  ) : null
}

const KeyboardAwareBotPost = Platform.OS === 'ios' ? withKeyboardHOC(AddBotPost) : AddBotPost
export default KeyboardAwareBotPost

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
  },
  textInputContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 15,
    alignItems: 'flex-start',
  },
  textInput: {
    alignSelf: 'center',
    fontFamily: 'Roboto-Light',
    fontSize: 17,
    flex: 1,
    margin: 0,
    paddingTop: 0,
    paddingHorizontal: 11,
  },
  textInputDay: {
    color: colors.DARK_PURPLE,
  },
  textInputNight: {
    color: 'white',
  },
})

import React from 'react'
import {View, Keyboard, TextInput, TouchableOpacity, Image, StyleSheet} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {observable, action} from 'mobx'
import {Spinner, RText} from '../common'
import {colors} from '../../constants'
import {showImagePicker} from '../ImagePicker'
import {k, minHeight} from '../Global'
import {IWocky, IBot, IBotPost} from 'wocky-client'
import withKeyboardHOC from '../common/withKeyboardHOC'

const IMAGE_HEIGHT = 70 * k

type Props = {
  bot: IBot
  wocky?: IWocky
  scrollToEnd: () => void
  notificationStore?: any // TODO proper type
  navStore: any
}

type ImageData = {
  source: {
    isStatic: boolean
    name: string
    type: string
    uri: string
  }
  size: number
  width: number
  height: number
}

@inject('notificationStore', 'wocky', 'navStore')
@observer
class AddBotPost extends React.Component<Props> {
  @observable imageURI?: string
  image?: ImageData
  @observable text: string = ''
  @observable focused: boolean = false
  // TODO: add `publishing` and `published` props on wocky-client botpost
  @observable sendingPost: boolean = false
  post?: IBotPost | null
  textInput: any

  componentWillUnmount() {
    // remove unpublished post
    if (this.post && this.post.id && this.props.bot) {
      this.props.bot.removePost(this.post.id)
    }
  }

  onSend = async () => {
    if (this.sendingPost) return
    this.sendingPost = true
    const {notificationStore, bot} = this.props
    try {
      this.post = bot.createPost(this.text.trim())
      if (this.image) {
        await this.post!.upload({size: this.image.size, file: this.image.source})
      }
      await this.post!.publish()
      this.post = null
      this.text = ''
      this.imageURI = undefined
      this.image = undefined
      this.textInput.blur()
      Keyboard.dismiss()
      this.props.scrollToEnd()
    } catch (e) {
      const message =
        e.code === '403'
          ? 'Cannot publish, bot is private now'
          : 'Something went wrong, please try again'
      notificationStore.flash(message)
      // TODO: clean up local state by removing bad post? Maybe in componentWillUnmount?
      // https://github.com/hippware/rn-chat/issues/1828
    } finally {
      this.sendingPost = false
    }
  }

  onAttach = () => {
    showImagePicker({
      callback: (source, response) => {
        const {size, width, height} = response
        this.imageURI = source.uri
        this.image = {source, size, width, height}
        if (this.textInput) {
          this.textInput.focus()
        }
      },
    })
  }

  render() {
    const textLength = this.text.trim().length
    const {wocky} = this.props
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
            onPress={this.onAttach}
            disabled={!!this.imageURI}
          >
            <Image
              style={{height: 21}}
              resizeMode="contain"
              source={
                this.imageURI
                  ? require('../../../images/attachPhotoGray.png')
                  : require('../../../images/attachPhoto.png')
              }
            />
          </TouchableOpacity>
          <TextInput
            ref={text => (this.textInput = text)}
            onChangeText={action((text: string) => (this.text = text))}
            style={[styles.textInput, styles.textInputDay, {height: 'auto'}]}
            placeholder="Add a comment"
            placeholderTextColor={colors.DARK_GREY}
            onFocus={() => (this.focused = true)}
            onBlur={() => (this.focused = false)}
            multiline
            returnKeyType="default"
            enablesReturnKeyAutomatically
            value={this.text}
            maxLength={5000}
            selectionColor={colors.COVER_BLUE}
          />
          <TouchableOpacity
            hitSlop={{top: 15, left: 15, right: 15, bottom: 15}}
            disabled={(textLength === 0 && !this.imageURI) || !wocky!.connected || this.sendingPost}
            onPress={this.onSend}
          >
            {this.sendingPost ? (
              <Spinner size={22} />
            ) : (
              <RText
                size={16}
                color={
                  (textLength || this.imageURI) && wocky!.connected ? colors.PINK : colors.GREY
                }
              >
                Post
              </RText>
            )}
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor: 'white'}}>
          <ImagePost
            imageURI={this.imageURI}
            deleteImage={() => {
              this.imageURI = undefined
              this.image = undefined
            }}
          />
        </View>
      </View>
    )
  }
}

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

export default withKeyboardHOC(AddBotPost)

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

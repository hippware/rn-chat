import React from 'react'
import {View, StyleSheet, Image, ImageSourcePropType, TouchableOpacity} from 'react-native'
import {observer} from 'mobx-react'
import {IMessage, IWocky, IProfile, IFile, MessageStatus} from 'src/wocky'
import {RText, Avatar, Spinner} from '../common'
import Triangle from '../map/Triangle'
import {width} from '../Global'
import {colors} from 'src/constants'

type Props = {
  message: IMessage
  diffMessage: IMessage | null
  wocky?: IWocky
}

const lightPink = 'rgb(255, 228, 231)'
const pink = 'rgb(254, 173, 181)'
const triangleSize = 12

type StatusProps = {
  isImage: boolean
  status: MessageStatus
  send: () => Promise<void>
}

const StatusText = ({isImage, status, send}: StatusProps) => {
  if (status === MessageStatus.Sending) {
    return <RText style={styles.statusText}>Sending...</RText>
  }
  if (status === MessageStatus.Error) {
    return (
      <TouchableOpacity onPress={() => send()}>
        <RText style={styles.statusText}>
          {isImage ? 'Image not sent.' : 'Message not sent'} Tap to retry.
        </RText>
      </TouchableOpacity>
    )
  }
  return null
}

const ChatMessageWrapper = observer(
  ({message: {isOutgoing, getUpload, content, otherUser, status, send}}: Props) => {
    const left = !isOutgoing

    // NOTE: since Messages can have both image + text we need to render them as "separate" messages here
    return (
      <View>
        {!!getUpload && (
          <ChatMessage left={left} media={getUpload} otherUser={otherUser} status={status} />
        )}
        {!!content && (
          <ChatMessage left={left} text={content} otherUser={otherUser} status={status} />
        )}
        <StatusText isImage={!!getUpload} status={status} send={send} />
      </View>
    )
  }
)

const ChatMessage = ({
  left,
  media,
  text,
  otherUser,
  status,
}: {
  left: boolean
  media?: IFile
  text?: string
  otherUser: IProfile
  status: MessageStatus
}) => {
  // TODO: media.loading doesn't work well here...there's a delay before `loading` gets set
  const color = media && !media.thumbnail ? colors.GREY : left ? lightPink : pink
  const triangleStyle = left ? {left: -triangleSize} : {right: -triangleSize}
  return (
    <View
      style={[
        styles.rowContainer,
        {
          justifyContent: left ? 'flex-start' : 'flex-end',
          paddingRight: left ? 0 : triangleSize,
        },
      ]}
    >
      {left && <Avatar size={40} profile={otherUser} style={{marginRight: 10}} tappable={false} />}
      <View style={{flex: 1, alignItems: left ? 'flex-start' : 'flex-end'}}>
        {!!media ? (
          <ImageMessage media={media} left={left} color={color} status={status} />
        ) : (
          <RText
            style={[
              styles.bubble,
              {
                backgroundColor: color,
                borderColor: color,
              },
            ]}
            size={15}
          >
            {text}
          </RText>
        )}
        <Triangle
          width={triangleSize}
          height={triangleSize}
          color={color}
          direction={left ? 'left' : 'right'}
          style={{position: 'absolute', bottom: triangleSize, ...triangleStyle}}
        />
      </View>
    </View>
  )
}

const ImageMessage = observer(
  ({media, color, status}: {media: IFile; left: boolean; color: string; status: MessageStatus}) => {
    if (media && !media.thumbnail) {
      return (
        <View
          style={[
            styles.bubble,
            {
              backgroundColor: color,
              borderColor: color,
              width: 80,
              alignItems: 'center',
            },
          ]}
        >
          <Spinner color="white" />
        </View>
      )
    }

    const image = media.thumbnail as ImageSourcePropType

    const {width: iWidth, height: iHeight} = Image.resolveAssetSource(image)
    const maxDim = width * 0.75
    const dimensions =
      iWidth / iHeight < 1
        ? {height: maxDim, width: (maxDim / iHeight) * iWidth}
        : {width: maxDim, height: (maxDim / iWidth) * iHeight}
    return (
      <View>
        <Image
          style={[
            styles.bubble,
            styles.mediaBubble,
            dimensions,
            {
              backgroundColor: color,
              borderColor: color,
            },
          ]}
          resizeMode="contain"
          source={image as ImageSourcePropType}
        />
        {status === MessageStatus.Sending && (
          <View style={styles.overlay}>
            <Spinner color="white" />
          </View>
        )}
        {status === MessageStatus.Error && (
          <View style={styles.overlay}>
            <Image source={require('../../../images/uploadError.png')} />
          </View>
        )}
      </View>
    )
  }
)

export default ChatMessageWrapper

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  mediaBubble: {
    padding: 0,
  },
  bubble: {
    borderRadius: 8,
    padding: 12,
    overflow: 'hidden',
    borderWidth: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  statusText: {
    textAlign: 'right',
    marginTop: -5,
    marginBottom: 3,
    fontSize: 13,
    color: colors.DARK_GREY,
  },
})

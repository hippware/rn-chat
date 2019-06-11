import React from 'react'
import {View, StyleSheet} from 'react-native'
import {observer} from 'mobx-react/native'
import {IMessage, IWocky, IFile} from 'wocky-client'
import ResizedImage from './ResizedImage'
import {width, k} from '../Global'
import {RText, Avatar} from '../common'
import Triangle from '../map/Triangle'

type Props = {
  message: IMessage
  diffMessage: IMessage | null
  wocky?: IWocky
}

const lightPink = 'rgb(255, 228, 231)'
const pink = 'rgb(254, 173, 181)'
const triangleSize = 12

const ChatMessage = observer(({message: {isOutgoing, getUpload, content, otherUser}}: Props) => {
  const left = !isOutgoing
  const media = getUpload()
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
      <View
        style={[
          styles.bubble,
          // media && media.thumbnail && styles.mediaBubble,
          left ? styles.bubbleLeft : styles.bubbleRight,
        ]}
      >
        {!!content && <RText size={15}>{content}</RText>}
        {!!media && <MessageMedia media={media} left={left} />}
        <Triangle
          width={triangleSize}
          height={triangleSize}
          color={left ? lightPink : pink}
          direction={left ? 'left' : 'right'}
          style={{position: 'absolute', bottom: triangleSize, ...triangleStyle}}
        />
      </View>
    </View>
  )
})

const MessageMedia = observer(({media, left}: {media: IFile; left: boolean}) => {
  const w = left ? width - 150 * k : width - 93
  // , height: w * media.source.height / media.source.width
  return (
    <View style={{width: w}}>
      <ResizedImage image={media.thumbnail} />
    </View>
  )
})

export default ChatMessage

const styles = StyleSheet.create({
  bubbleLeft: {
    backgroundColor: lightPink,
  },
  bubbleRight: {
    backgroundColor: pink,
  },
  // mediaBubble: {
  //   paddingLeft: 0,
  //   paddingRight: 0,
  //   paddingBottom: 0,
  //   paddingTop: 0,
  // },
  bubble: {
    borderRadius: 8,
    padding: 12,
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
})

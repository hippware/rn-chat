import React from 'react'
import {View, StyleSheet, Image, ImageSourcePropType} from 'react-native'
import {observer} from 'mobx-react/native'
import {IMessage, IWocky} from 'wocky-client'
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
  const media = getUpload
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
      <View style={{borderWidth: 0}}>
        <View
          style={[
            styles.bubble,
            media && media.thumbnail && styles.mediaBubble,
            left ? styles.bubbleLeft : styles.bubbleRight,
          ]}
        >
          {!!media ? (
            <Image
              style={styles.mediaMessage}
              resizeMode="contain"
              source={media.thumbnail as ImageSourcePropType}
            />
          ) : (
            <RText size={15}>{content}</RText>
          )}
        </View>
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

export default ChatMessage

const styles = StyleSheet.create({
  bubbleLeft: {
    backgroundColor: lightPink,
  },
  bubbleRight: {
    backgroundColor: pink,
  },
  mediaBubble: {
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: {
    borderRadius: 8,
    padding: 12,
    overflow: 'hidden',
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  mediaMessage: {
    height: 200,
    width: 200,
  },
})

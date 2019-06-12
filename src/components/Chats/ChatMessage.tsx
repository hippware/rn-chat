import React from 'react'
import {View, StyleSheet, Image, ImageSourcePropType} from 'react-native'
import {observer} from 'mobx-react/native'
import {IMessage, IWocky} from 'wocky-client'
import {RText, Avatar} from '../common'
import Triangle from '../map/Triangle'
import {width} from '../Global'

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
      <View>
        {!!media && media.thumbnail ? (
          <ImageMessage image={media.thumbnail} left={left} />
        ) : (
          <RText style={[styles.bubble, left ? styles.bubbleLeft : styles.bubbleRight]} size={15}>
            {content}
          </RText>
        )}
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

const ImageMessage = ({image, left}: {image: ImageSourcePropType; left: boolean}) => {
  const {width: iWidth, height: iHeight} = Image.resolveAssetSource(image)
  const maxDim = width * 0.75
  const dimensions =
    iWidth / iHeight < 1
      ? {height: maxDim, width: (maxDim / iHeight) * iWidth}
      : {width: maxDim, height: (maxDim / iWidth) * iHeight}
  return (
    <Image
      style={[
        styles.bubble,
        styles.mediaBubble,
        dimensions,
        left ? styles.bubbleLeft : styles.bubbleRight,
      ]}
      resizeMode="contain"
      source={image as ImageSourcePropType}
    />
  )
}

export default ChatMessage

const styles = StyleSheet.create({
  bubbleLeft: {
    backgroundColor: lightPink,
    borderColor: lightPink,
  },
  bubbleRight: {
    backgroundColor: pink,
    borderColor: pink,
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
})

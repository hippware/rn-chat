import React from 'react'
import {View, StyleSheet, Image, Text} from 'react-native'
import {observer} from 'mobx-react/native'
import {IMessage, IWocky} from 'wocky-client'
import ResizedImage from './ResizedImage'
import {width, k} from '../Global'
import {colors} from 'src/constants'

type Props = {
  message: IMessage
  diffMessage: IMessage | null
  wocky?: IWocky
}

const ChatMessage = observer(({message}: Props) => {
  const left = !message.isOutgoing
  const right = !left

  return (
    <View
      style={[
        styles.rowContainer,
        {
          justifyContent: left ? 'flex-start' : 'flex-end',
        },
      ]}
    >
      <View
        style={[
          message.media && message.media ? styles.mediaBubble : styles.bubble,
          left ? styles.bubbleLeft : right ? styles.bubbleRight : styles.bubbleCenter,
        ]}
      >
        {renderText(message.content, left, right)}
        {message.media && message.media && renderMedia(message.media, left)}
      </View>
      {left && (
        <Image
          style={{position: 'absolute', bottom: 12, left: -4}}
          source={require('../../../images/triangleWhite.png')}
        />
      )}
      {right && (
        <Image
          style={{position: 'absolute', bottom: 5, right: 2}}
          source={require('../../../images/triangleYellow.png')}
        />
      )}
    </View>
  )
})

function renderMedia(media, left) {
  // if (!media.loaded) {}
  const w = left ? width - 150 * k : width - 93
  return (
    <View style={{width: w, height: w * media.height / media.width}}>
      <ResizedImage key={`${media.id}image`} image={media} />
    </View>
  )
}

function renderText(text, left, right) {
  return (
    <Text
      style={[styles.text, left ? styles.textLeft : right ? styles.textRight : styles.textCenter]}
    >
      {text}
    </Text>
  )
}

export default ChatMessage

const styles = StyleSheet.create({
  text: {
    color: '#000',
  },
  textLeft: {
    color: colors.DARK_PURPLE,
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
  },
  textRight: {
    color: colors.DARK_PURPLE,
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
  },
  textCenter: {
    textAlign: 'center',
  },
  bubbleLeft: {
    marginLeft: 8,
    marginRight: 70,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignSelf: 'flex-start',
  },
  bubbleRight: {
    marginRight: 14,
    marginLeft: 70,
    backgroundColor: 'rgba(255,254,227,0.9)',
    alignSelf: 'flex-end',
  },
  bubbleCenter: {
    backgroundColor: '#007aff',
    alignSelf: 'center',
  },
  mediaBubble: {
    borderRadius: 2,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingTop: 0,
  },
  bubble: {
    borderRadius: 2,
    paddingLeft: 14,
    paddingRight: 14,
    paddingBottom: 12,
    paddingTop: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  imagePosition: {
    height: 30,
    width: 30,
    alignSelf: 'flex-end',
    marginLeft: 8,
    marginRight: 8,
  },
  image: {
    alignSelf: 'center',
    borderRadius: 15,
  },
})

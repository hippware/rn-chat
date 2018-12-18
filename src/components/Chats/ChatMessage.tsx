import React from 'react'
import {View, StyleSheet, Image, Text} from 'react-native'
import {observer, inject} from 'mobx-react/native'
// import ChatBubble from './ChatBubble'
import {IMessage, IWocky} from 'wocky-client'
import ResizedImage from './ResizedImage'
import {width, k} from '../Global'
import {colors} from 'src/constants'

type Props = {
  message: IMessage
  diffMessage: IMessage | null
  wocky?: IWocky
}

const ChatMessage = inject('wocky')(
  observer(({message, wocky}: Props) => {
    const left = message.from && message.from.id !== wocky!.profile!.id
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
            message.media && message.media.source ? styles.mediaBubble : styles.bubble,
            left ? styles.bubbleLeft : right ? styles.bubbleRight : styles.bubbleCenter,
          ]}
        >
          {renderText(message.body, left, right)}
          {message.media && message.media.source && renderMedia(message.media, left)}
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
)

function renderMedia(media, left) {
  // if (!media.loaded) {}
  const w = left ? width - 150 * k : width - 93
  return (
    <View style={{width: w, height: w * media.source.height / media.source.width}}>
      <ResizedImage key={`${media.source.id}image`} image={media.source} />
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
  errorButtonContainer: {
    marginLeft: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#e6e6eb',
    borderRadius: 15,
    width: 30,
    height: 30,
  },
  errorButton: {
    fontSize: 22,
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  name: {
    color: '#aaaaaa',
    fontSize: 12,
    marginLeft: 55,
    marginBottom: 5,
  },
  nameInsideBubble: {
    color: '#666666',
    marginLeft: 0,
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
  imageLeft: {},
  imageRight: {},
  spacer: {
    width: 10,
  },
  status: {
    color: '#aaaaaa',
    fontSize: 12,
    textAlign: 'right',
    marginRight: 15,
    marginBottom: 10,
    marginTop: -5,
  },
})

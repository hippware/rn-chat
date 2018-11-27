import React from 'react'
import {Image, Text, View, StyleSheet, Dimensions} from 'react-native'
import ResizedImage from './ResizedImage'
import {k} from './Global'
import ParsedText from 'react-native-parsed-text'

const {width} = Dimensions.get('window')
import {observer} from 'mobx-react/native'
import {colors} from '../constants'

const defaultStyles = StyleSheet.create({
  bubble: {
    borderRadius: 2,
    paddingLeft: 14,
    paddingRight: 14,
    paddingBottom: 12,
    paddingTop: 5,
  },
  mediaBubble: {
    borderRadius: 2,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingTop: 0,
  },
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
    // shadowOffset: {width:0, height: 1},
    // shadowColor: '#000',
    // shadowOpacity: 0.12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignSelf: 'flex-start',
  },
  bubbleRight: {
    marginRight: 14,
    marginLeft: 70,
    // shadowOffset: {width:0, height: 1},
    // shadowColor: '#000',
    // shadowOpacity: 0.12,
    backgroundColor: 'rgba(255,254,227,0.9)',
    alignSelf: 'flex-end',
  },
  bubbleCenter: {
    backgroundColor: '#007aff',
    alignSelf: 'center',
  },
  bubbleError: {
    backgroundColor: '#e01717',
  },
})

const ChatBubble = props => {
  const {
    text,
    renderCustomText,
    handleUrlPress,
    handlePhonePress,
    handleEmailPress,
    parseText,
    media,
    position,
    id,
    name,
    status,
    ...other
  } = props
  const styles = {...defaultStyles, ...other.styles}
  function renderMedia() {
    // if (!media.loaded) {}
    const w = position === 'left' ? width - 150 * k : width - 93
    return (
      <View
        key={`${media.source.id}view`}
        style={{width: w, height: w * media.source.height / media.source.width}}
      >
        <ResizedImage key={`${media.source.id}image`} image={media.source} />
      </View>
    )
  }

  function renderText() {
    if (renderCustomText) {
      return renderCustomText(props)
    }

    if (parseText === true) {
      return (
        <ParsedText
          style={[
            styles.text,
            position === 'left'
              ? styles.textLeft
              : position === 'right' ? styles.textRight : styles.textCenter,
          ]}
          parse={[
            {
              type: 'url',
              style: {
                textDecorationLine: 'underline',
              },
              onPress: handleUrlPress,
            },
            {
              type: 'phone',
              style: {
                textDecorationLine: 'underline',
              },
              onPress: handlePhonePress,
            },
            {
              type: 'email',
              style: {
                textDecorationLine: 'underline',
              },
              onPress: handleEmailPress,
            },
          ]}
        >
          {text}
        </ParsedText>
      )
    }
    return (
      <Text
        style={[
          styles.text,
          position === 'left'
            ? styles.textLeft
            : position === 'right' ? styles.textRight : styles.textCenter,
        ]}
      >
        {text}
      </Text>
    )
  }
  return (
    <View style={{flex: 1}}>
      <View
        style={[
          media && media.source ? styles.mediaBubble : styles.bubble,
          position === 'left'
            ? styles.bubbleLeft
            : position === 'right' ? styles.bubbleRight : styles.bubbleCenter,
          status === 'ErrorButton' ? styles.bubbleError : null,
        ]}
        key={`${id}bubble`}
      >
        {name}
        {renderText()}
        {media && media.source && renderMedia()}
      </View>
      {position === 'left' && (
        <Image
          style={{position: 'absolute', bottom: 12, left: -4}}
          source={require('../../images/triangleWhite.png')}
        />
      )}
      {position === 'right' && (
        <Image
          style={{position: 'absolute', bottom: 5, right: 2}}
          source={require('../../images/triangleYellow.png')}
        />
      )}
    </View>
  )
}
export default observer(ChatBubble)

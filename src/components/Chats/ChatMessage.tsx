import React from 'react'
import {View, StyleSheet, Image} from 'react-native'
import {observer} from 'mobx-react/native'
import {IMessage, IWocky, IFile} from 'wocky-client'
import ResizedImage from './ResizedImage'
import {width, k} from '../Global'
import {RText} from '../common'

type Props = {
  message: IMessage
  diffMessage: IMessage | null
  wocky?: IWocky
}

const ChatMessage = observer(({message: {isOutgoing, media, content}}: Props) => {
  const left = !isOutgoing
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
          media && media.thumbnail ? styles.mediaBubble : styles.bubble,
          left ? styles.bubbleLeft : styles.bubbleRight,
        ]}
      >
        {!!content && <RText size={15}>{content}</RText>}
        {!!media && <MessageMedia media={media} left={left} />}
      </View>
      <Triangle left={left} />
    </View>
  )
})

const MessageMedia = observer(({media, left}: {media: IFile; left: boolean}) => {
  const w = left ? width - 150 * k : width - 93
  // , height: w * media.source.height / media.source.width
  return (
    <View style={{width: w}}>
      <ResizedImage image={media.thumbnail} />
      {/* <ProgressiveImage style={{height: width, width}} file={media} resizeMode="contain" /> */}
    </View>
  )
})

const Triangle = ({left}) =>
  left ? (
    <Image
      style={{position: 'absolute', bottom: 12, left: 2}}
      source={require('../../../images/triangleWhite.png')}
    />
  ) : (
    <Image
      style={{position: 'absolute', bottom: 5, right: 2}}
      source={require('../../../images/triangleYellow.png')}
    />
  )

export default ChatMessage

const styles = StyleSheet.create({
  bubbleLeft: {
    marginLeft: 14,
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
})

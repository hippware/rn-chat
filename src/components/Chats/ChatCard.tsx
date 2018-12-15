import React from 'react'
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native'
import {observer} from 'mobx-react/native'
import Card from '../Card'
import {CardText, Avatar} from '../common'
import {k} from '../Global'
import ResizedImage from './ResizedImage'
import {colors} from '../../constants'
import {isAlive} from 'mobx-state-tree'
import {IChat} from 'wocky-client'

type Props = {
  chat: IChat
  onPostOptions?: any
  onPress: any
  style?: any
}

@observer
export default class ChatCard extends React.Component<Props> {
  button: any

  render() {
    const isDay = true
    const {chat} = this.props
    if (!chat || !isAlive(chat)) return null
    const msg = chat.messages.last
    const {otherUser} = chat
    let media: any = null
    try {
      media = msg.media && msg.media.source ? msg.media : null
    } catch (err) {
      // console.log('TODO: Fix msg.media reference error', err)
    }
    return (
      <Card
        style={[this.props.style]}
        onPress={() => this.props.onPress(chat)}
        innerStyle={{paddingTop: 20 * k}}
        footer={
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 30 * k,
              right: 0,
              height: 40 * k,
            }}
          >
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Avatar key={`${otherUser.id}avatar`} size={40 * k} profile={otherUser} />
            </View>

            <Date {...this.props}>
              <Text
                style={{
                  fontFamily: 'Roboto-Light',
                  fontSize: 12 * k,
                  color: colors.DARK_GREY,
                }}
              >
                {msg.date}
              </Text>
            </Date>
          </View>
        }
      >
        {!!msg.body && (
          <Text style={{padding: 15 * k}}>
            {!!msg.from && (
              <CardText isDay={isDay}>{msg.from.isOwn ? 'you' : `@${msg.from.handle}`}: </CardText>
            )}
            <Text
              style={{
                fontFamily: 'Roboto-Light',
                color: isDay ? 'rgb(81,67,96)' : 'white',
                fontSize: 15,
              }}
            >
              {msg.body}
            </Text>
          </Text>
        )}
        {media && (
          <View style={{paddingTop: 15 * k}}>
            <ResizedImage image={media.source} />
          </View>
        )}
        {chat.unreadCount > 0 && (
          <View style={{position: 'absolute', right: 0, bottom: 0, height: 15, width: 15}}>
            <Image source={require('../../../images/iconNewPriority.png')} />
          </View>
        )}
      </Card>
    )
  }
}

const Date = ({onPostOptions, children}: any) =>
  onPostOptions ? (
    <TouchableOpacity onPress={e => onPostOptions(e, e.nativeEvent.target)} style={styles.date}>
      {children}
      <Image style={{marginLeft: 5 * k}} source={require('../../../images/iconPostOptions.png')} />
    </TouchableOpacity>
  ) : (
    <View
      style={{
        position: 'absolute',
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        top: 20 * k,
        right: 20 * k,
      }}
    >
      {children}
    </View>
  )

const styles = StyleSheet.create({
  smallText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: colors.DARK_GREY,
  },
  date: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    top: 20 * k,
    right: 20 * k,
  },
})

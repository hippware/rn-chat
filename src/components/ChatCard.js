import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Card from './Card'
import CardText from './CardText'
import Avatar from './Avatar'
import { k } from './Global'
import ResizedImage from './ResizedImage'
import { Actions } from 'react-native-router-native'
import Profile from '../model/Profile'
import Chats from '../model/Chats'
import Chat from '../model/Chat'
import { observer } from 'mobx-react/native'
import location from '../store/locationStore'
import Message from '../model/Message'
@observer
export default class ChatCard extends React.Component {
    render () {
        const isDay = location.isDay
        const chat: Chat = this.props.item
        const msg: Message = chat.last
        const participants = chat.participants
        return (
            <Card style={[this.props.style]}
                  isDay={isDay}
                  onPress={() => this.props.onPress(chat)}
                  innerStyle={{paddingTop: 20 * k}}
                  footer={
                      <View style={{position: 'absolute', top: 0, left: 30 * k, right: 0, height: 40 * k}}>
                          <View style={{flex: 1, flexDirection: 'row'}}>
                              {participants.map(profile =>
                                  <Avatar key={profile.user + 'avatar'} size={40 * k} profile={profile}
                                          source={profile.avatar && profile.avatar.source} title={profile.displayName}
                                          isDay={isDay}/>)}
                          </View>

                          {this.props.onPostOptions &&
                          <TouchableOpacity ref='button' onPress={e => this.props.onPostOptions(e, this.refs.button)}
                                            style={{
                                                position: 'absolute',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                top: 20 * k,
                                                right: 20 * k
                                            }}>
                              <Text style={{
                                  fontFamily: 'Roboto-Light',
                                  fontSize: 12,
                                  color: 'rgb(155,155,155)'
                              }}>{msg.date} </Text>
                              <Image source={require('../../images/iconPostOptions.png')}/>
                          </TouchableOpacity>}
                          {!this.props.onPostOptions && <View style={{
                              position: 'absolute',
                              backgroundColor: 'transparent',
                              flexDirection: 'row',
                              alignItems: 'center',
                              top: 20 * k,
                              right: 20 * k
                          }}>
                              <Text style={{
                                  fontFamily: 'Roboto-Light',
                                  fontSize: 12 * k,
                                  color: 'rgb(155,155,155)'
                              }}>{msg.date}</Text>
                          </View>
                          }
                      </View>
                  }>
                {!!msg.body && <Text style={{padding: 15 * k}}>
                    {!!msg.from &&
                    <CardText isDay={isDay}>{msg.from.isOwn ? 'you' : `@${msg.from.handle}`}: </CardText>}
                    <Text style={{
                        fontFamily: 'Roboto-Light',
                        color: isDay ? 'rgb(81,67,96)' : 'white',
                        fontSize: 15
                    }}>{msg.body}</Text>
                </Text>}
                {!!msg.media && msg.media.source &&
                <View style={{paddingTop: 15 * k}}><ResizedImage image={msg.media}/></View>}
                {!!this.props.item.location && <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 15 * k,
                    paddingRight: 15 * k,
                    paddingTop: 10
                }}><Image source={require('../../images/iconLocation.png')}/><Text
                    style={styles.smallText}> {this.props.item.location}</Text></View>}
                {!!this.props.item.channel && <Text style={[{
                    paddingLeft: 15 * k,
                    paddingRight: 15 * k
                }, styles.smallText]}>#{this.props.item.channel}</Text>}
                {chat.unread > 0 &&
                <View style={{position: 'absolute', right: 0, bottom: 0, height: 15, width: 15}}><Image
                    source={require('../../images/iconNewPriority.png')}/></View>}
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    smallText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: 'rgb(155,155,155)'
    }

})


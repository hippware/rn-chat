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
import EventBot from '../model/EventBot'
import Bot from '../model/Bot'
import { observer } from 'mobx-react/native'
import location from '../store/locationStore'
import statem from '../../gen/state'
import event from '../store/eventStore'
import EventBotHeadline from './EventBotHeadline'
import BotAvatar from './BotAvatar'

@observer
export default class EventBotCard extends React.Component {
    onPress () {
        statem.home.botDetails({item: this.props.item.bot.id})
    }

    render () {
        const isDay = location.isDay
        const eventBot: EventBot = this.props.item
        const bot = eventBot.bot || {}

        return <View style={{paddingTop: 15, paddingBottom: 10}}>
            <View style={{paddingLeft: 19 * k, paddingRight: 23 * k, paddingBottom: 12}}>
                <CardText isDay={isDay}>{`@${eventBot.target.handle}`} invited you to a new bot.
                </CardText>
            </View>
            <EventBotHeadline {...this.props}/>
        </View>
    }
}


import { createModelSchema, ref, list, child } from 'serializr'
import { observable, computed } from 'mobx'
import Bot from './Bot'
import Event from './Event'
import Message from './Message'
import Profile from './Profile'
import moment from 'moment'
import autobind from 'autobind-decorator'
import factory from '../factory/botFactory'
import assert from 'assert'
import EventBot from './EventBot'

@autobind
export default class EventBotShare extends EventBot {
    @computed get target (): Profile { return this.message.from }

    @observable message: Message

    constructor (id, botId, server, time, message) {
        super(id, botId, server, time)
        this.message = message
    }

    presenterClass () {
        return require('../components/EventBotShareCard').default
    }

    asMap () {
        return {botShare: this}
    }

}

createModelSchema(EventBotShare, {
//  chat: child(Chat),
    _id: true,
    time: true,
    bot: ref('fullId', (fullId, cb) => cb(null, Bot.serializeInfo.factory({json: {fullId}}))),
    loaded: true,
    message: child(Message),
    _isHidden: true,
})

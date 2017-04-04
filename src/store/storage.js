import { USE_IOS_XMPP } from '../globals'
import autobind from 'autobind-decorator'
import { deserialize, serialize, createModelSchema, ref, list, child } from 'serializr'
import model, { Model } from '../model/model'
import { autorunAsync, autorun } from 'mobx'
import Chats from '../model/Chats'
import FriendList from '../model/FriendList'
import EventChat from '../model/EventChat'
import EventFriend from '../model/EventFriend'
import EventContainer from '../model/EventContainer'
import EventList from '../model/EventList'
import Profile from '../model/Profile'
import File from '../model/File'
import FileSource from '../model/FileSource'
import Chat from '../model/Chat'
import Message from '../model/Message'
import file from './fileStore'
import message from './messageStore'
import profile from './profileStore'

let Provider
if (USE_IOS_XMPP) {
    console.log('real RealmStore')
    Provider = require('./storage/LocalStorageStore').default
//  Provider = require('./storage/RealmStore').default;
} else {
    console.log('mock AsyncStorage')
    Provider = require('./storage/TestStorage').default
}

@autobind
class Storage {
    provider = new Provider()

    constructor () {
        autorunAsync(() => {
            try {
                const data = serialize(model)
                this.provider.save(data)
            } catch (e) {
                console.log('STORE ERROR', e)
                model.clear()
            }
        })

    }

    async load () {
        let res = await this.provider.load()
        console.log('Storage.load:', res)
        //res={};
        let d = {}
        try {
            d = deserialize(Model, res) || {}
        } catch (e) {
            console.warn('SERIALIZE ERROR:', e)
        }
        //console.log("Storage.load messages:", JSON.stringify(d.messages));
        //delete d.followingBots;
        //delete d.ownBots;
        model.load(d)

        if (!model.user || !model.password || !model.server) {
            console.log('STORAGE EMPTY', model.user, model.password, model.server)
            throw ''
        }
        return model
    }

    save () {
//    this.provider.save(serialize(model));
        //model.clear();
        return model
    }
}
export default new Storage()



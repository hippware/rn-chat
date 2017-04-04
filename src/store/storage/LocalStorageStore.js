const KEY = 'rnchat:model'
import { USE_IOS_XMPP } from '../../globals'
import autobind from 'autobind-decorator'
let storage
if (USE_IOS_XMPP) {
    console.log('real AsyncStorage')
    storage = require('react-native').AsyncStorage
} else {
    console.log('mock AsyncStorage')
    storage = {setItem: (x, d) => {console.log('setItem:', x, d)}, getItem: () => undefined}
}

@autobind
export default class LocalStorage {
    load () {
        return new Promise((resolve, reject) => {
            // persistence
            storage.getItem(KEY, (error, data) => {
                if (data) {
                    try {
                        const json = JSON.parse(data)
                        //console.log("CACHED DATA:", json);
                        resolve(json)
                    } catch (error) {
                        console.log('ERROR PARSING JSON', data)
                        reject(error)
                    }
                } else {
                    resolve()
                }
            })
        })
    }

    save (data) {
        //console.log("STORING:", data)
        storage.setItem(KEY, JSON.stringify(data))
    }
}

 
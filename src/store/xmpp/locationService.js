require('./strophe')
var Strophe = global.Strophe
import * as xmpp from './xmpp'
import autobind from 'autobind-decorator'

import assert from 'assert'
const NS = 'http://jabber.org/protocol/pubsub'
const NODE = 'http://jabber.org/protocol/geoloc'
const GEOLOC_NS = 'http://jabber.org/protocol/geoloc'

/***
 * This class adds roster functionality to standalone XMPP service
 */
@autobind
class LocationService {
    constructor () {
        xmpp.message.filter(msg => msg.event && msg.event.items && msg.event.items.node === GEOLOC_NS
        && msg.event.items.item)
            .onValue(msg => this.onLocation(msg.from.split('@')[0], msg.event.items.item.geoloc))
    }

    onLocation (user, location) {
        if (this.delegate && this.delegate.onLocationChange) {
            this.delegate.onLocationChange(user, location)
        }
    }

    addLocation (iq, {latitude, longitude, accuracy}) {
        assert(latitude, 'latitude is required')
        assert(longitude, 'longitude is required')
        iq.c('geoloc', {xmlns: GEOLOC_NS})
            .c('lat').t(latitude).up()
            .c('lon').t(longitude).up()

        if (accuracy) {
            iq.c('accuracy').t(accuracy)
        }
    }

    async share (location) {
        console.log('LOCATION SHARE', JSON.stringify(location))
        const iq = $iq({type: 'set'})
            .c('pubsub', {xmlns: NS})
            .c('publish', {node: NODE})
            .c('item')

        this.addLocation(iq, location)
        await xmpp.sendIQ(iq, true)
    }
}

export default new LocationService()
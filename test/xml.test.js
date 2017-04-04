import Utils from '../src/store/xmpp/utils'
import message from '../src/store/messageStore'

describe('parse', function () {
    step('test message event', function () {
        const test = '<message xmlns="jabber:client" from="1a175ee4-55d5-11e6-8fee-0eea5386eb69@staging.dev.tinyrobot.com/59C05E385AEB3C1471977007528431" to="d6976ac8-5a3a-11e6-8008-0e2ac49618c7@staging.dev.tinyrobot.com" type="chat" id="s1471977049615972"><body>The timestamp is the date I opened the app.</body><archived by="d6976ac8-5a3a-11e6-8008-0e2ac49618c7@staging.dev.tinyrobot.com" id="AEM1BKKVS4G1"/><delay xmlns="urn:xmpp:delay" from="staging.dev.tinyrobot.com" stamp="2016-08-23T18:30:49.704000Z">Offline Storage</delay></message>'
        const xml = new DOMParser().parseFromString(test, 'text/xml').documentElement
        const data = Utils.parseXml(xml)
        const msg = message.processMessage(data.message)
        console.log(msg.dateAsString)
    })
})
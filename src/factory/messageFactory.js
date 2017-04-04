import autobind from 'autobind-decorator'
import Message from '../model/Message'
import model from '../model/model'
import assert from 'assert'
@autobind
class MessageFactory {
    messages: { string: Message } = {}

    clear () {
        this.messages = {}
    }

    load (messages) {
        console.log('MessageFactory.load', messages.length)
        for (let i = 0; i < messages.length; i++) {
            this.messages[messages[i].id] = messages[i]
        }
    }

    create = ({id, time, ...data}) => {
        assert(id, 'id is not defined')
        if (!this.messages[id]) {
            console.log('CREATE MESSAGE WITH ID:', id, data)
            this.messages[id] = new Message({id, time, ...data})
            if (data.body) {
                //console.log("CREATE MESSAGE WITH ID, PUSH", data.body);
                model.messages.push(this.messages[id])
            }
        } else {
            console.log('EXISTING MESSAGE WITH ID:', id, data)
            this.messages[id].load(data)
        }
        return this.messages[id]
    }
}

export default new MessageFactory()
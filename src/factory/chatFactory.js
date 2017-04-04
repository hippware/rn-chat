import autobind from 'autobind-decorator';
import Chat from '../model/Chat';

@autobind
class ChatFactory {
    chats: { string: Chat } = {};

    clear() {
        this.chats = {};
    }

    create = (id: string) => {
        if (!this.chats[id]) {
            console.log("CREATE CHAT", id);
            this.chats[id] = new Chat(id);
        }
        return this.chats[id];
    };


}

export default new ChatFactory()
import model, {Model} from '../src/model/model';
import Profile from '../src/model/Profile';
import Chat from '../src/model/Chat';
import Message from '../src/model/Message';
import EventFriend from '../src/model/EventFriend';
import EventChat from '../src/model/EventChat';
import EventMessage from '../src/model/EventMessage';
import event from '../src/store/eventStore';
import {when} from 'mobx';
import {deserialize, serialize, createModelSchema, ref, list, child} from 'serializr';
import {expect, assert} from 'chai';
import moment from 'moment';

describe("deserialize", function () {
    step("test deserialize", function () {
        const data = {
            chats: {
                _list: [{
                    id: 'd6976ac8-5a3a-11e6-8008-0e2ac49618c7',
                    time: 1480408999761,
                    _messages: [{
                        id: 's1479890589030751',
                        from: 'd6976ac8-5a3a-11e6-8008-0e2ac49618c7',
                        to: '1c24eb20-ab4d-11e6-b9de-0eea5386eb69',
                        unread: false,
                        _time: 1479890589163,
                        body: 'Jjk',
                        isHidden: false
                    }],
                    _participants: ['d6976ac8-5a3a-11e6-8008-0e2ac49618c7']
                }]
            },
            // events:
            // { version: 'd5434e12-b606-11e6-b162-971226003eaa',
            //   _list:
            //     [ { unread: true,
            //       botNote:
            //         { bot: '7b915d94-afe1-11e6-a392-0e2ac49618c7',
            //           updated: 1480405114000,
            //           note: { id: 'bot', content: 'Utfvjk', title: '' },
            //           _isHidden: false } },
            //       { unread: true,
            //         botNote:
            //           { bot: '3c395340-afcd-11e6-8506-0e600a8611a9',
            //             updated: 1479979788000,
            //             note:
            //               { id: 'bot',
            //                 content: '1234455 fsdlfk wow! Folks dfkjsdlkjf Klerk full jskldfjklsjf kinsfolk kljeklrjkltjklrej tklerjkljlklksdjkl fjlkdsjflsdjklf klsjfkldsjkl fiddling klsdjfkl sdjkflskdf klsdjfkl jskldfj klsdjfkl sdklfjklsdjflksklfdsl k 234324 24',
            //                 title: '' },
            //             _isHidden: false } },
            //       { unread: true,
            //         message:
            //           { id: 'd6976ac8-5a3a-11e6-8008-0e2ac49618c7@staging.dev.tinyrobot.com',
            //             profile: 'd6976ac8-5a3a-11e6-8008-0e2ac49618c7',
            //             message: 's1479890589030751',
            //             _isHidden: false } } ] },
        };
        const d = deserialize(Model, data);
        model.load(d);
        expect(model.chats._list.length).to.be.equal(1);
//    expect(model.events._list.length).to.be.equal(3);


    });

    step("deserialize timestamp", () => {
        console.log(moment(event.get_timestamp('46c123d8-dd54-11e6-8979-7b9ce2004d1f')).calendar())
    });
    // step("test friend event", function(done){
    //   model.events.clear();
    //   const profile = new Profile("User1");
    //   profile.isFollower = true;
    //   model.friends.add(profile);
    //   when(()=>model.events.list.length === 1 && model.events.list[0].event instanceof EventMessage, ()=>{
    //     done();
    //   })
    // });

    // step("test message event", function(done){
    //   model.events.clear();
    //   const chat = new Chat("newChat");
    //   model.chats.add(chat);
    //   chat.addMessage(new Message({id:'id', from:new Profile("test2"), body:'hello'}));
    //   const profile = new Profile("test2");
    //   profile.isFollower = true;
    //   model.friends.add(profile);
    //   when(()=>model.events.list.length === 1 && model.events.list[0].event instanceof EventMessage && model.events.list[0].message != null, done)
    // });
});
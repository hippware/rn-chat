import expect from 'expect'
import reducer from '../../src/reducers/conversation';
import * as actions from '../../src/actions/conversations';
import * as xmpp from '../../src/actions/xmpp/xmpp';

describe('conversation reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual({
                list:[],
                conversations:{}})
    });

    it('should state with one conversation', () => {
        const time = 123;
        expect(
            reducer(undefined, actions.addConversation("user1", time))
        ).toEqual({
            list:["user1"],
            conversations:{user1: {composing: false, username: 'user1', time, lastMsg:'', history:[]}}})
    });
    it('should state with one conversation after duplicate addition', () => {
        const time = 123;
        const state = reducer(undefined, actions.addConversation("user1", time));
        expect(
            reducer(state, actions.addConversation("user1", 123123))
        ).toEqual({
            list:["user1"],
            conversations:{user1: {composing: false, username: 'user1', time, lastMsg:'', history:[]}}})
    });
    it('should state with two conversations after two additions', () => {
        const time = 123;
        const time2 = 1232;
        const state = reducer(undefined, actions.addConversation("user1", time));
        expect(
            reducer(state, actions.addConversation("user2", time2))
        ).toEqual({
            list:["user2","user1"],
            conversations: {
                user1: {composing: false, username: 'user1', time, lastMsg: '', history: []},
                user2: {composing: false, username: 'user2', time:time2, lastMsg: '', history: []}
            }

        });
    });

    it('should state with one conversation after two additions and remove', () => {
        const time = 123;
        const time2 = 1232;
        let state = reducer(undefined, actions.addConversation("user1", time));
        state = reducer(state, actions.addConversation("user2", time2));
        expect(
            reducer(state, actions.removeConversation("user2"))
        ).toEqual({
            list:["user1"],
            conversations: {
                user1: {composing: false, username: 'user1', time, lastMsg: '', history: []}
            }

        });
    });

    it('should state with one conversation after add addition and remove non-existend user', () => {
        const time = 123;
        let state = reducer(undefined, actions.addConversation("user1", time));
        expect(
            reducer(state, actions.removeConversation("user2"))
        ).toEqual({
            list:["user1"],
            conversations: {
                user1: {composing: false, username: 'user1', time, lastMsg: '', history: []}
            }

        });
    });
    it('should state with two conversation after add one addition and message receiving', () => {
        const time2 = 123;
        const body = "Hello world";
        const time = 123123;
        const from = 'user1';
        let state = reducer(undefined, actions.addConversation("user2", time2));
        expect(
            reducer(state, xmpp.messageReceived({body, time, from}))
        ).toEqual({
            list:["user1","user2"],
            conversations: {
                user1: {composing: false, unread:1, username: 'user1', time, lastMsg: body, history: [{unread:true, body,time,from}]},
                user2: {composing: false, username: 'user2', time:time2, lastMsg: '', history: []}
            }

        });
    });
    it('should state with one conversation after add one addition and message receiving to the same username', () => {
        const time2 = 123;
        const body = "Hello world";
        const time = 123123;
        const from = 'user1';
        let state = reducer(undefined, actions.addConversation("user1", time2));
        state = reducer(state, xmpp.messageReceived({body, time, from}))
        expect(
            reducer(state, xmpp.messageReceived({body, time, from}))
        ).toEqual({
            list:["user1"],
            conversations: {
                user1: {composing: false, unread:2, username: 'user1', time, lastMsg: body,
                    history: [{unread:true,body,time,from},{unread:true,body,time,from}]}
            }

        });
    });
    it('dont set unread for current conversation, verify enter/exitConversation actions', () => {
        const time2 = 123;
        const body = "Hello world";
        const time = 123123;
        const from = 'user1';
        let state = reducer(undefined, actions.addConversation("user1", time2));
        state = reducer(state, xmpp.messageReceived({body, time, from}))
        expect(
            state = reducer(state, actions.enterConversation("user1"))
        ).toEqual({
            list:["user1"],
            current:"user1",
            conversations: {
                user1: {composing: false, unread:0, username: 'user1', time, lastMsg: body,
                    history: [{unread:false, body,time,from}]}
            }

        });
        expect(
            reducer(state, xmpp.messageReceived({body, time, from}))
        ).toEqual({
            current:"user1",
            list:["user1"],
            conversations: {
                user1: {composing: false, unread:0, username: 'user1', time, lastMsg: body,
                    history: [{unread:false,body,time,from},{unread:false,body,time,from}]}
            }

        });
        state = reducer(state, actions.exitConversation("user1"))
        expect(
            reducer(state, xmpp.messageReceived({body, time, from}))
        ).toEqual({
            current:undefined,
            list:["user1"],
            conversations: {
                user1: {composing: false, unread:1, username: 'user1', time, lastMsg: body,
                    history: [{unread:true,body,time,from},{unread:false,body,time,from},{unread:false,body,time,from}]}
            }

        });
    });
    it('should reset unread=0 when read all messages', () => {
        const time2 = 123;
        const body = "Hello world";
        const time = 123123;
        const from = 'user1';
        let state = reducer(undefined, actions.addConversation("user1", time2));
        state = reducer(state, xmpp.messageReceived({body, time, from}));
        state = reducer(state, xmpp.messageReceived({body, time, from}));

        expect(
            reducer(state, xmpp.readAllMessages("user1"))
        ).toEqual({
            list:["user1"],
            conversations: {
                user1: {composing: false, unread:0, username: 'user1', time, lastMsg: body,
                    history: [{unread:false,body,time,from},{unread:false,body,time,from}]}
            }

        });
    });
    it('should not reset unread=2 when read all messages for non-existing user', () => {
        const time2 = 123;
        const body = "Hello world";
        const time = 123123;
        const from = 'user1';
        let state = reducer(undefined, actions.addConversation("user1", time2));
        state = reducer(state, xmpp.messageReceived({body, time, from}));
        state = reducer(state, xmpp.messageReceived({body, time, from}));

        expect(
            reducer(state, xmpp.readAllMessages("user2"))
        ).toEqual({
            list:["user1"],
            conversations: {
                user1: {composing: false, unread:2, username: 'user1', time, lastMsg: body,
                    history: [{unread:true,body,time,from},{unread:true,body,time,from}]}
            }

        });
    });
    it('should state with two conversation after add one addition and message sending', () => {
        const time2 = 123;
        const body = "Hello world";
        const time = 123123;
        const to = 'user1';
        let state = reducer(undefined, actions.addConversation("user2", time2));
        expect(
            reducer(state, xmpp.messageSent({body, time, to}))
        ).toEqual({
            list:["user1","user2"],
            conversations: {
                user1: {composing: false, username: 'user1', time, lastMsg: body, history: [{body,time,to}]},
                user2: {composing: false, username: 'user2', time:time2, lastMsg: '', history: []}
            }

        });
    });
    it('should state with one conversation after add one addition and message sending to the same username', () => {
        const time2 = 123;
        const body = "Hello world";
        const time = 123123;
        const to = 'user1';
        let state = reducer(undefined, actions.addConversation("user1", time2));
        expect(
            reducer(state, xmpp.messageSent({body, time, to}))
        ).toEqual({
            list:["user1"],
            conversations: {
                user1: {composing: false, username: 'user1', time, lastMsg: body, history: [{body,time,to}]}
            }

        });
    });
    it('should create conversation automatically after message sending', () => {
        const time2 = 123;
        const body = "Hello world";
        const body2 = "Hello world2";
        const time = 123123;
        const to = 'user1';
//        let state = reducer(state, xmpp.messageSent({body, time, to}));
        expect(
            reducer(undefined, xmpp.messageSent({body, time, to}))
        ).toEqual({
            list:["user1"],
            conversations: {
                user1: {composing: false, username: 'user1', time, lastMsg: body, history: [{body,time,to}]}
            }

        });
    });
    it('should create conversation automatically after message receiving', () => {
        const time2 = 123;
        const body = "Hello world";
        const body2 = "Hello world2";
        const time = 123123;
        const from = 'user1';
        const from2 = 'user2';
        let state = reducer(state, xmpp.messageSent({body, time, to: from}));
        expect(
            reducer(state, xmpp.messageReceived({body:body2, time:time2, from: from2}))
        ).toEqual({
            list:["user2","user1"],
            conversations: {
                user1: {composing: false, username: 'user1', time, lastMsg: body, history: [{body,time,to:from}]},
                user2: {composing: false, unread:1, username: 'user2', time: time2, lastMsg: body2, history:
                    [{unread:true, body:body2,time:time2,from:from2}]}
            }

        });
    });
    it('add composing mark for composing message', () => {
        const time2 = 123;
        const body = "Hello world";
        const body2 = "Hello world2";
        const time = 123123;
        const from = 'user1';
        const from2 = 'user2';
        let state = reducer(undefined, xmpp.messageSent({body, time, to: from}));
        state =  reducer(state, xmpp.messageReceived({body:body2, time:time2, from: from2}));
        // mark user as current
        state = reducer(state, actions.enterConversation(from2));

        expect(
            state = reducer(state, xmpp.messageComposing(from2))
        ).toEqual({
            list:["user2","user1"],
            current: "user2",
            conversations: {
                user1: {composing: false, username: 'user1', time, lastMsg: body, history: [{body,time,to:from}]},
                user2: {composing:true, unread:0, username: 'user2', time: time2, lastMsg: body2, history:
                    [{unread:false, body:body2,time:time2,from:from2}]}
            }

        });
        // don't change anything for not current user
        expect(
            state = reducer(state, xmpp.messageComposing(from))
        ).toEqual({
            list:["user2","user1"],
            current: "user2",
            conversations: {
                user1: {composing: false, username: 'user1', time, lastMsg: body, history: [{body,time,to:from}]},
                user2: {composing:true, unread:0, username: 'user2', time: time2, lastMsg: body2, history:
                    [{unread:false, body:body2,time:time2,from:from2}]}
            }

        });
        // remove composing flag after pause
        expect(
            state = reducer(state, xmpp.messagePaused(from2))
        ).toEqual({
            list:["user2","user1"],
            current: "user2",
            conversations: {
                user1: {composing: false, username: 'user1', time, lastMsg: body, history: [{body,time,to:from}]},
                user2: {composing: false, unread:0, username: 'user2', time: time2, lastMsg: body2, history:
                    [{unread:false, body:body2,time:time2,from:from2}]}
            }

        });
    });
    it('should mark message as error if it is returned with type as error', () => {
        const time2 = 123;
        const body = "Hello world";
        const time = 123123;
        const to = 'user1';
        const id = '123';
        let state = reducer(state, xmpp.messageSent({body, time, to, id}));
        expect(
            reducer(state, xmpp.messageReceived({body, time: time2, from:to, id, type:'error'}))
        ).toEqual({
            list:["user1"],
            conversations: {
                user1: {composing: false, username: 'user1', time, lastMsg: body, history: [{body, time, to, id, type:'error'}]},
            }

        });
    });
});
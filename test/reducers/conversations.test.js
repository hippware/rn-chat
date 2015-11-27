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
            conversations:{user1: {username: 'user1', time, lastMsg:'', history:[]}}})
    });
    it('should state with one conversation after duplicate addition', () => {
        const time = 123;
        const state = reducer(undefined, actions.addConversation("user1", time));
        expect(
            reducer(state, actions.addConversation("user1", 123123))
        ).toEqual({
            list:["user1"],
            conversations:{user1: {username: 'user1', time, lastMsg:'', history:[]}}})
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
                user1: {username: 'user1', time, lastMsg: '', history: []},
                user2: {username: 'user2', time:time2, lastMsg: '', history: []}
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
                user1: {username: 'user1', time, lastMsg: '', history: []}
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
                user1: {username: 'user1', time, lastMsg: '', history: []}
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
                user1: {username: 'user1', time, lastMsg: body, history: [{body,time,from}]},
                user2: {username: 'user2', time:time2, lastMsg: '', history: []}
            }

        });
    });
    it('should state with one conversation after add one addition and message receiving to the same username', () => {
        const time2 = 123;
        const body = "Hello world";
        const time = 123123;
        const from = 'user1';
        let state = reducer(undefined, actions.addConversation("user1", time2));
        expect(
            reducer(state, xmpp.messageReceived({body, time, from}))
        ).toEqual({
            list:["user1"],
            conversations: {
                user1: {username: 'user1', time, lastMsg: body, history: [{body,time,from}]}
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
                user1: {username: 'user1', time, lastMsg: body, history: [{body,time,to}]},
                user2: {username: 'user2', time:time2, lastMsg: '', history: []}
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
                user1: {username: 'user1', time, lastMsg: body, history: [{body,time,to}]}
            }

        });
    });
});
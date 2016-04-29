import expect from 'expect'
import genreducer from '../../src/reducers/conversation';
import * as actions from '../../src/actions';
import { sideEffect } from 'redux-side-effects';
import API, {run} from '../../src/API';
function reducer(state, action){
    const iterable = genreducer(state, action);
    let done = false;
    let value;
    while (!done){
        const next = iterable.next();
        done = next.done;
        value = next.value;
    }
    return value;
}
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
            "unread":0,
            "conversations": {
                "user1": []
            },
            "list": [
                {
                    "composing": false,
                    "lastMsg": "",
                    "time": 123,
                    "unread": 0,
                    "username": "user1"
                }
            ]
        })
    });
    it('should state with one conversation after duplicate addition', () => {
        const time = 123;
        const state = reducer(undefined, actions.addConversation("user1", time));
        expect(
            reducer(state, actions.addConversation("user1", 123123))
        ).toEqual({
            "unread":0,
            "conversations": {
                "user1": []
            },
            "list": [
                {
                    "composing": false,
                    "lastMsg": "",
                    "time": 123,
                    "unread": 0,
                    "username": "user1"
                }
            ]
        })
    });
    it('should state with two conversations after two additions', () => {
        const time = 123;
        const time2 = 1232;
        const state = reducer(undefined, actions.addConversation("user1", time));
        expect(
            reducer(state, actions.addConversation("user2", time2))
        ).toEqual({
            "unread":0,
            "conversations": {
                "user1": [],
                "user2": []
            },
            "list": [
                {
                    "composing": false,
                    "lastMsg": "",
                    "time": 1232,
                    "unread": 0,
                    "username": "user2"
                },
                {
                    "composing": false,
                    "lastMsg": "",
                    "time": 123,
                    "unread": 0,
                    "username": "user1"
                }
            ]
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
            "unread":0,
            "conversations": {
                "user1": []
            },
            "list": [
                {
                    "composing": false,
                    "lastMsg": "",
                    "time": 123,
                    "unread": 0,
                    "username": "user1"
                }
            ]
        });
    });

    it('should state with one conversation after add addition and remove non-existend user', () => {
        const time = 123;
        let state = reducer(undefined, actions.addConversation("user1", time));
        expect(
            reducer(state, actions.removeConversation("user2"))
        ).toEqual({
            "unread":0,
            "conversations": {
                "user1": [],
            },
            "list": [
                {
                    "composing": false,
                    "lastMsg": "",
                    "time": 123,
                    "unread": 0,
                    "username": "user1"
                }
            ]
        });
    });
    it('should state with two conversation after add one addition and message receiving', () => {
        const time2 = 123;
        const body = "Hello world";
        const time = 123123;
        const from = 'user1';
        let state = reducer(undefined, actions.addConversation("user2", time2));
        expect(
            reducer(state, actions.messageReceived({body, time, from}))
        ).toEqual({
            "unread":1,
            "conversations": {
                "user1": [
                    {
                        "body": "Hello world",
                        "from": "user1",
                        "time": 123123,
                        "unread": true
                    }
                ],
                "user2": []
            },
            "list": [
                {
                    "composing": false,
                    "lastMsg": "Hello world",
                    "time": 123123,
                    "unread": 1,
                    "username": "user1"
                },
                {
                    "composing": false,
                    "lastMsg": "",
                    "time": 123,
                    "unread": 0,
                    "username": "user2"
                },
            ]
        });
    });
    it('should state with one conversation after add one addition and message receiving to the same username', () => {
        const time2 = 123;
        const body = "Hello world";
        const time = 123123;
        const from = 'user1';
        let state = reducer(undefined, actions.addConversation("user1", time2));
        state = reducer(state, actions.messageReceived({body, time, from}))
        expect(
            reducer(state, actions.messageReceived({body, time, from}))
        ).toEqual({
            "unread":2,
            "conversations": {
                "user1": [
                    {
                        "body": "Hello world",
                        "from": "user1",
                        "time": 123123,
                        "unread": true
                    },
                    {
                        "body": "Hello world",
                        "from": "user1",
                        "time": 123123,
                        "unread": true
                    }
                ]
            },
            "list": [
                {
                    "composing": false,
                    "lastMsg": "Hello world",
                    "time": 123123,
                    "unread": 2,
                    "username": "user1"
                }
            ]
        });
    });
    it('dont set unread for current conversation, verify enter/exitConversation actions', () => {
        const time2 = 123124;
        const body = "Hello world";
        const time = 123123;
        const from = 'user1';
        let state = reducer(undefined, actions.addConversation("user1", time2));
        state = reducer(state, actions.messageReceived({body, time, from}));
        expect(
            state = reducer(state, actions.enterConversation("user1"))
        ).toEqual({
            "conversations": {
                "user1": [
                    {
                        "body": "Hello world",
                        "from": "user1",
                        "time": 123123,
                        "unread": false
                    },
                ]
            },
            "current": "user1",
            "list": [
                {
                    "composing": false,
                    "lastMsg": "Hello world",
                    "time": 123123,
                    "unread": 0,
                    "username": "user1"
                }
            ],
            "unread": 0
        });
        expect(
            state = reducer(state, actions.messageReceived({body, time, from}))
        ).toEqual({
            "conversations": {
                "user1": [
                    {
                        "body": "Hello world",
                        "from": "user1",
                        "time": 123123,
                        "unread": false
                    },
                    {
                        "body": "Hello world",
                        "from": "user1",
                        "time": 123123,
                        "unread": false
                    }
                ]
            },
            "current": "user1",
            "list": [
                {
                    "composing": false,
                    "lastMsg": "Hello world",
                    "time": 123123,
                    "unread": 0,
                    "username": "user1"
                }
            ],
            "unread": 0
        });
        state = reducer(state, actions.exitConversation("user1"));
        expect(
            reducer(state, actions.messageReceived({body, time:time2, from}))
        ).toEqual({
            "conversations": {
                "user1": [
                    {
                        "body": "Hello world",
                        "from": "user1",
                        "time": 123124,
                        "unread": true
                    },
                    {
                        "body": "Hello world",
                        "from": "user1",
                        "time": 123123,
                        "unread": false
                    },
                    {
                        "body": "Hello world",
                        "from": "user1",
                        "time": 123123,
                        "unread": false
                    }
                ]
            },
            "current": undefined,
            "list": [
                {
                    "composing": false,
                    "lastMsg": "Hello world",
                    "time": 123124,
                    "unread": 1,
                    "username": "user1"
                }
            ],
            "unread": 1
        });
    });
    it('should reset unread=0 when read all messages', () => {
        const time2 = 123;
        const body = "Hello world";
        const time = 123123;
        const from = 'user1';
        let state = reducer(undefined, actions.addConversation("user1", time2));
        state = reducer(state, actions.messageReceived({body, time, from}));
        state = reducer(state, actions.messageReceived({body, time, from}));

        expect(
            reducer(state, actions.readAllMessages("user1"))
        ).toEqual({
            "conversations": {
                "user1": [
                    {
                        "body": "Hello world",
                        "from": "user1",
                        "time": 123123,
                        "unread": false
                    },
                    {
                        "body": "Hello world",
                        "from": "user1",
                        "time": 123123,
                        "unread": false
                    }
                ]
            },
            "list": [
                {
                    "composing": false,
                    "lastMsg": "Hello world",
                    "time": 123123,
                    "unread": 0,
                    "username": "user1"
                }
            ],
            current:"user1",
            "unread": 0
        });
    });
    it('should not reset unread=2 when read all messages for non-existing user', () => {
        const time2 = 123;
        const body = "Hello world";
        const time = 123123;
        const from = 'user1';
        let state = reducer(undefined, actions.addConversation("user1", time2));
        state = reducer(state, actions.messageReceived({body, time, from}));
        state = reducer(state, actions.messageReceived({body, time, from}));

        expect(
            reducer(state, actions.readAllMessages("user2"))
        ).toEqual({
            "conversations": {
                "user1": [
                    {
                        "body": "Hello world",
                        "from": "user1",
                        "time": 123123,
                        "unread": true
                    },
                    {
                        "body": "Hello world",
                        "from": "user1",
                        "time": 123123,
                        "unread": true
                    }
                ]
            },
            "list": [
                {
                    "composing": false,
                    "lastMsg": "Hello world",
                    "time": 123123,
                    "unread": 2,
                    "username": "user1"
                }
            ],
            "unread": 2
        });
    });
    it('should state with two conversation after add one addition and message sending', () => {
        const time2 = 123;
        const body = "Hello world";
        const time = 123123;
        const to = 'user1';
        let state = reducer(undefined, actions.addConversation("user2", time2));
        let iterable = genreducer(state, actions.sendMessage({body, time, to}));
        expect (iterable.next()).toEqual( {
            done: false,
            value: run(API.sendMessage, {body, time, to})
        });

        expect(iterable.next()).toEqual({
            done: true,
            value: {
                "conversations": {
                    "user1": [
                        {
                            "body": "Hello world",
                            "time": 123123,
                            "own": true,
                            "to": "user1",
                        }
                    ],
                    "user2": []
                },
                "list": [
                    {
                        "composing": false,
                        "lastMsg": "Hello world",
                        "time": 123123,
                        "own": true,
                        "unread": 0,
                        "username": "user1"
                    },
                    {
                        "composing": false,
                        "lastMsg": "",
                        "time": 123,
                        "unread": 0,
                        "username": "user2"
                    }
                ],
                "unread": 0
            }
        });
    });
    it('should state with one conversation after add one addition and message sending to the same username', () => {
        const time2 = 123;
        const body = "Hello world";
        const time = 123123;
        const to = 'user1';
        let state = reducer(undefined, actions.addConversation("user1", time2));
        const iterable = genreducer(state, actions.sendMessage({body, time, to}));
        expect(iterable.next().value).toEqual(run(API.sendMessage, {body, time, to}));
        expect(
            iterable.next().value
        ).toEqual({
            "conversations": {
                "user1": [
                    {
                        "body": "Hello world",
                        "time": 123123,
                        "own": true,
                        "to": "user1"
                    }
                ]
            },
            "list": [
                {
                    "composing": false,
                    "lastMsg": "Hello world",
                    "time": 123123,
                    "own": true,
                    "unread": 0,
                    "username": "user1"
                }
            ],
            "unread": 0
        });
    });
    it('should create conversation automatically after message sending', () => {
        const time2 = 123;
        const body = "Hello world";
        const body2 = "Hello world2";
        const time = 123123;
        const to = 'user1';
//        let state = reducer(state, actions.sendMessage({body, time, to}));
        const iterable = genreducer(undefined, actions.sendMessage({body, time, to}));
        iterable.next();
        expect(
            iterable.next().value
        ).toEqual({
            "conversations": {
                "user1": [
                    {
                        "body": "Hello world",
                        "time": 123123,
                        "own": true,
                        "to": "user1",
                    }
                ]
            },
            "list": [
                {
                    "composing": false,
                    "lastMsg": "Hello world",
                    "time": 123123,
                    "own": true,
                    "unread": 0,
                    "username": "user1",
                }
            ],
            "unread": 0
        });
    });
    it('should create conversation automatically after message receiving', () => {
        const time2 = 123;
        const body = "Hello world";
        const body2 = "Hello world2";
        const time = 123123;
        const from = 'user1';
        const from2 = 'user2';
        let state = reducer(state, actions.sendMessage({body, time, to: from}));
        expect(
            reducer(state, actions.messageReceived({body:body2, time:time2, from: from2}))
        ).toEqual({
            "conversations": {
                "user1": [
                    {
                        "body": "Hello world",
                        "own": true,
                        "time": 123123,
                        "to": "user1",
                    }
                ],
                "user2": [
                    {
                        "body": "Hello world2",
                        "from": "user2",
                        "time": 123,
                        "unread": true
                    }
                ]
            },
            "list": [
                {
                    "composing": false,
                    "lastMsg": "Hello world",
                    "own": true,
                    "time": 123123,
                    "unread": 0,
                    "username": "user1"
                },
                {
                    "composing": false,
                    "lastMsg": "Hello world2",
                    "time": 123,
                    "unread": 1,
                    "username": "user2"
                }
            ],
            "unread": 1
        });
    });
    it('add composing mark for composing message', () => {
        const time2 = 123;
        const body = "Hello world";
        const body2 = "Hello world2";
        const time = 123123;
        const from = 'user1';
        const from2 = 'user2';
        let state = reducer(undefined, actions.sendMessage({body, time, to: from}));
        state =  reducer(state, actions.messageReceived({body:body2, time:time2, from: from2}));
        // mark user as current
        state = reducer(state, actions.enterConversation(from2));

        expect(
            state = reducer(state, actions.messageComposingReceived(from2))
        ).toEqual({
            "conversations": {
                "user1": [
                    {
                        "body": "Hello world",
                        "time": 123123,
                        "own": true,
                        "to": "user1"
                    }
                ],
                "user2": [
                    {
                        "body": "Hello world2",
                        "from": "user2",
                        "time": 123,
                        "unread": false
                    }
                ]
            },
            "current": "user2",
            "list": [
                {
                    "composing": false,
                    "lastMsg": "Hello world",
                    "own": true,
                    "time": 123123,
                    "unread": 0,
                    "username": "user1"
                },
                {
                    "composing": true,
                    "lastMsg": "Hello world2",
                    "time": 123,
                    "unread": 0,
                    "username": "user2"
                }
            ],
            "unread": 0
        });
        // remove composing flag after pause
        expect(
            state = reducer(state, actions.messagePaused(from2))
        ).toEqual({
            "conversations": {
                "user1": [
                    {
                        "body": "Hello world",
                        "time": 123123,
                        "own": true,
                        "to": "user1"
                    }
                ],
                "user2": [
                    {
                        "body": "Hello world2",
                        "from": "user2",
                        "time": 123,
                        "unread": false
                    }
                ]
            },
            "current": "user2",
            "list": [
                {
                    "composing": false,
                    "lastMsg": "Hello world",
                    "time": 123123,
                    "unread": 0,
                    "own": true,
                    "username": "user1"
                },
                {
                    "composing": false,
                    "lastMsg": "Hello world2",
                    "time": 123,
                    "unread": 0,
                    "username": "user2"
                }
            ],
            "unread": 0
        });
    });
    it('should parse archive correctly into state', ()=>{
        const archive = [ { from: 'ac9b7fd0-014c-11e6-8b1d-0e7fe01e5a5f',
            body: 'hello from Catherine Zeta-Jones',
            to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
            type: 'chat',
            id: 's1460535455446',
            time: 1460535456000,
            own: false },
            { from: 'ac9b7fd0-014c-11e6-8b1d-0e7fe01e5a5f',
                body: 'Hello from Catherine Zeta-Jones',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460535499989',
                time: 1460535501000,
                own: false },
            { from: 'acd9590e-014c-11e6-86ea-0e7fe01e5a5f',
                body: 'Hello from Cobie Smulders',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460535501339',
                time: 1460535502000,
                own: false },
            { from: 'ad14abd0-014c-11e6-954e-0e7fe01e5a5f',
                body: 'Hello from Jason Segel',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460535502730',
                time: 1460535503000,
                own: false },
            { from: 'ad4c5e5e-014c-11e6-b6e1-0e7fe01e5a5f',
                body: 'Hello from Jim Parsons',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460535504111',
                time: 1460535505000,
                own: false },
            { from: 'ad8406d8-014c-11e6-94f7-0e7fe01e5a5f',
                body: 'Hello from Johnny Galecki',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460535505492',
                time: 1460535506000,
                own: false },
            { from: 'adbbaa66-014c-11e6-a7b2-0e7fe01e5a5f',
                body: 'Hello from Josh Radnor',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460535506954',
                time: 1460535507000,
                own: false },
            { from: 'adffb918-014c-11e6-b1c3-0e7fe01e5a5f',
                body: 'Hello from Kaley Cuoco',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460535508319',
                time: 1460535509000,
                own: false },
            { from: 'ae40a090-014c-11e6-959c-0e7fe01e5a5f',
                body: 'Hello from Matt Damon',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460535509652',
                time: 1460535510000,
                own: false },
            { from: 'ae78fb7a-014c-11e6-b509-0e7fe01e5a5f',
                body: 'Hello from Neil Patrick Harris',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460535511096',
                time: 1460535512000,
                own: false },
            { from: 'aeb7553c-014c-11e6-aeeb-0e7fe01e5a5f',
                body: 'Hello from Tom Cruise',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460535512498',
                time: 1460535513000,
                own: false },
            { from: 'ac9b7fd0-014c-11e6-8b1d-0e7fe01e5a5f',
                body: 'Hello from Catherine Zeta-Jones',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460535602895',
                time: 1460535604000,
                own: false },
            { from: 'acd9590e-014c-11e6-86ea-0e7fe01e5a5f',
                body: 'Hello from Cobie Smulders',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460535604231',
                time: 1460535605000,
                own: false },
            { from: 'ad14abd0-014c-11e6-954e-0e7fe01e5a5f',
                body: 'Hello from Jason Segel',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460535605752',
                time: 1460535606000,
                own: false },
            { from: 'ad4c5e5e-014c-11e6-b6e1-0e7fe01e5a5f',
                body: 'Hello from Jim Parsons',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460535607142',
                time: 1460535608000,
                own: false },
            { from: 'ad8406d8-014c-11e6-94f7-0e7fe01e5a5f',
                body: 'Hello from Johnny Galecki',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460535608714',
                time: 1460535609000,
                own: false },
            { from: 'adbbaa66-014c-11e6-a7b2-0e7fe01e5a5f',
                body: 'Hello from Josh Radnor',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460535610148',
                time: 1460535611000,
                own: false },
            { from: 'adffb918-014c-11e6-b1c3-0e7fe01e5a5f',
                body: 'Hello from Kaley Cuoco',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460535611438',
                time: 1460535612000,
                own: false },
            { from: 'ae40a090-014c-11e6-959c-0e7fe01e5a5f',
                body: 'Hello from Matt Damon',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460535612815',
                time: 1460535614000,
                own: false },
            { from: 'ae78fb7a-014c-11e6-b509-0e7fe01e5a5f',
                body: 'Hello from Neil Patrick Harris',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460535614497',
                time: 1460535615000,
                own: false },
            { from: 'aeb7553c-014c-11e6-aeeb-0e7fe01e5a5f',
                body: 'Hello from Tom Cruise',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460535615885',
                time: 1460535616000,
                own: false },
            { from: 'ac9b7fd0-014c-11e6-8b1d-0e7fe01e5a5f',
                body: 'Hello from Catherine Zeta-Jones',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460536800719',
                time: 1460536801000,
                own: false },
            { from: 'acd9590e-014c-11e6-86ea-0e7fe01e5a5f',
                body: 'Hello from Cobie Smulders',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460536802786',
                time: 1460536803000,
                own: false },
            { from: 'ad14abd0-014c-11e6-954e-0e7fe01e5a5f',
                body: 'Hello from Jason Segel',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460536805384',
                time: 1460536806000,
                own: false },
            { from: 'ad4c5e5e-014c-11e6-b6e1-0e7fe01e5a5f',
                body: 'Hello from Jim Parsons',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460536807075',
                time: 1460536808000,
                own: false },
            { from: 'ad8406d8-014c-11e6-94f7-0e7fe01e5a5f',
                body: 'Hello from Johnny Galecki',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460536808666',
                time: 1460536809000,
                own: false },
            { from: 'adbbaa66-014c-11e6-a7b2-0e7fe01e5a5f',
                body: 'Hello from Josh Radnor',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460536810157',
                time: 1460536811000,
                own: false },
            { from: 'adffb918-014c-11e6-b1c3-0e7fe01e5a5f',
                body: 'Hello from Kaley Cuoco',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460536811454',
                time: 1460536812000,
                own: false },
            { from: 'ae40a090-014c-11e6-959c-0e7fe01e5a5f',
                body: 'Hello from Matt Damon',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460536813263',
                time: 1460536814000,
                own: false },
            { from: 'ae78fb7a-014c-11e6-b509-0e7fe01e5a5f',
                body: 'Hello from Neil Patrick Harris',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460536814759',
                time: 1460536816000,
                own: false },
            { from: 'aeb7553c-014c-11e6-aeeb-0e7fe01e5a5f',
                body: 'Hello from Tom Cruise',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460536816273',
                time: 1460536817000,
                own: false },
            { from: 'ac9b7fd0-014c-11e6-8b1d-0e7fe01e5a5f',
                body: 'Hello from Catherine Zeta-Jones',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460537015500',
                time: 1460537016000,
                own: false },
            { from: 'acd9590e-014c-11e6-86ea-0e7fe01e5a5f',
                body: 'Hello from Cobie Smulders',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460537017074',
                time: 1460537018000,
                own: false },
            { from: 'ad14abd0-014c-11e6-954e-0e7fe01e5a5f',
                body: 'Hello from Jason Segel',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460537018933',
                time: 1460537019000,
                own: false },
            { from: 'ad4c5e5e-014c-11e6-b6e1-0e7fe01e5a5f',
                body: 'Hello from Jim Parsons',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460537020679',
                time: 1460537021000,
                own: false },
            { from: 'ad8406d8-014c-11e6-94f7-0e7fe01e5a5f',
                body: 'Hello from Johnny Galecki',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460537022275',
                time: 1460537023000,
                own: false },
            { from: 'adbbaa66-014c-11e6-a7b2-0e7fe01e5a5f',
                body: 'Hello from Josh Radnor',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460537023793',
                time: 1460537024000,
                own: false },
            { from: 'adffb918-014c-11e6-b1c3-0e7fe01e5a5f',
                body: 'Hello from Kaley Cuoco',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460537025189',
                time: 1460537026000,
                own: false },
            { from: 'ae40a090-014c-11e6-959c-0e7fe01e5a5f',
                body: 'Hello from Matt Damon',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460537026822',
                time: 1460537028000,
                own: false },
            { from: 'ae78fb7a-014c-11e6-b509-0e7fe01e5a5f',
                body: 'Hello from Neil Patrick Harris',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460537028546',
                time: 1460537029000,
                own: false },
            { from: 'aeb7553c-014c-11e6-aeeb-0e7fe01e5a5f',
                body: 'Hello from Tom Cruise',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460537030041',
                time: 1460537031000,
                own: false },
            { from: 'ac9b7fd0-014c-11e6-8b1d-0e7fe01e5a5f',
                body: 'Hello from Catherine Zeta-Jones',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460537107628',
                time: 1460537108000,
                own: false },
            { from: 'acd9590e-014c-11e6-86ea-0e7fe01e5a5f',
                body: 'Hello from Cobie Smulders',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460537109441',
                time: 1460537110000,
                own: false },
            { from: 'ad14abd0-014c-11e6-954e-0e7fe01e5a5f',
                body: 'Hello from Jason Segel',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460537110788',
                time: 1460537111000,
                own: false },
            { from: 'ad4c5e5e-014c-11e6-b6e1-0e7fe01e5a5f',
                body: 'Hello from Jim Parsons',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460537112441',
                time: 1460537113000,
                own: false },
            { from: 'ad8406d8-014c-11e6-94f7-0e7fe01e5a5f',
                body: 'Hello from Johnny Galecki',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460537113787',
                time: 1460537114000,
                own: false },
            { from: 'adbbaa66-014c-11e6-a7b2-0e7fe01e5a5f',
                body: 'Hello from Josh Radnor',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460537115102',
                time: 1460537116000,
                own: false },
            { from: 'adffb918-014c-11e6-b1c3-0e7fe01e5a5f',
                body: 'Hello from Kaley Cuoco',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460537116423',
                time: 1460537117000,
                own: false },
            { from: 'ae40a090-014c-11e6-959c-0e7fe01e5a5f',
                body: 'Hello from Matt Damon',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460537117926',
                time: 1460537119000,
                own: false },
            { from: 'ae78fb7a-014c-11e6-b509-0e7fe01e5a5f',
                body: 'Hello from Neil Patrick Harris',
                to: '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f',
                type: 'chat',
                id: 's1460537119255',
                time: 1460537120000,
                own: false } ];
        expect(reducer(undefined, {type: actions.REQUEST_ARCHIVE+actions.SUCCESS, data:archive}).list.length).toEqual(10);

    });
    //it('should mark message as error if it is returned with type as error', () => {
    //    const time2 = 123;
    //    const body = "Hello world";
    //    const time = 123123;
    //    const to = 'user1';
    //    const id = '123';
    //    let state = reducer(state, actions.sendMessage({body, time, to, id}));
    //    expect(
    //        reducer(state, actions.messageReceived({body, time: time2, from:to, id, type:'error'}))
    //    ).toEqual({
    //        list:["user1"],
    //        conversations: {
    //            user1: {composing: false, username: 'user1', time, lastMsg: body, history: [{body, time, to, id, type:'error'}]},
    //        }
    //
    //    });
    //});
});
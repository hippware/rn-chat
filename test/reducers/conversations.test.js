import expect from 'expect'
import reducer from '../../src/reducers/conversation';
import * as actions from '../../src/actions/conversations';
import * as xmpp from '../../src/actions/xmpp/message';

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
            reducer(state, xmpp.messageReceived({body, time, from}))
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
        state = reducer(state, xmpp.messageReceived({body, time, from}))
        expect(
            reducer(state, xmpp.messageReceived({body, time, from}))
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
        const time2 = 123;
        const body = "Hello world";
        const time = 123123;
        const from = 'user1';
        let state = reducer(undefined, actions.addConversation("user1", time2));
        state = reducer(state, xmpp.messageReceived({body, time, from}));
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
            reducer(state, xmpp.messageReceived({body, time, from}))
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
            reducer(state, xmpp.messageReceived({body, time, from}))
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
                    },
                    {
                        "body": "Hello world",
                        "from": "user1",
                        "time": 123123,
                        "unread": true
                    }
                ]
            },
            "current": undefined,
            "list": [
                {
                    "composing": false,
                    "lastMsg": "Hello world",
                    "time": 123123,
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
        state = reducer(state, xmpp.messageReceived({body, time, from}));
        state = reducer(state, xmpp.messageReceived({body, time, from}));

        expect(
            reducer(state, xmpp.readAllMessages("user1"))
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
            "unread": 0
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
        expect(
            reducer(state, xmpp.sendMessage({body, time, to}))
        ).toEqual({
            "conversations": {
                "user1": [
                    {
                        "body": "Hello world",
                        "time": 123123,
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
        });
    });
    it('should state with one conversation after add one addition and message sending to the same username', () => {
        const time2 = 123;
        const body = "Hello world";
        const time = 123123;
        const to = 'user1';
        let state = reducer(undefined, actions.addConversation("user1", time2));
        expect(
            reducer(state, xmpp.sendMessage({body, time, to}))
        ).toEqual({
            "conversations": {
                "user1": [
                    {
                        "body": "Hello world",
                        "time": 123123,
                        "to": "user1"
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
            "unread": 0
        });
    });
    it('should create conversation automatically after message sending', () => {
        const time2 = 123;
        const body = "Hello world";
        const body2 = "Hello world2";
        const time = 123123;
        const to = 'user1';
//        let state = reducer(state, xmpp.sendMessage({body, time, to}));
        expect(
            reducer(undefined, xmpp.sendMessage({body, time, to}))
        ).toEqual({
            "conversations": {
                "user1": [
                    {
                        "body": "Hello world",
                        "time": 123123,
                        "to": "user1",
                    }
                ]
            },
            "list": [
                {
                    "composing": false,
                    "lastMsg": "Hello world",
                    "time": 123123,
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
        let state = reducer(state, xmpp.sendMessage({body, time, to: from}));
        expect(
            reducer(state, xmpp.messageReceived({body:body2, time:time2, from: from2}))
        ).toEqual({
            "conversations": {
                "user1": [
                    {
                        "body": "Hello world",
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
        let state = reducer(undefined, xmpp.sendMessage({body, time, to: from}));
        state =  reducer(state, xmpp.messageReceived({body:body2, time:time2, from: from2}));
        // mark user as current
        state = reducer(state, actions.enterConversation(from2));

        expect(
            state = reducer(state, xmpp.messageComposing(from2))
        ).toEqual({
            "conversations": {
                "user1": [
                    {
                        "body": "Hello world",
                        "time": 123123,
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
            state = reducer(state, xmpp.messagePaused(from2))
        ).toEqual({
            "conversations": {
                "user1": [
                    {
                        "body": "Hello world",
                        "time": 123123,
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
    //it('should mark message as error if it is returned with type as error', () => {
    //    const time2 = 123;
    //    const body = "Hello world";
    //    const time = 123123;
    //    const to = 'user1';
    //    const id = '123';
    //    let state = reducer(state, xmpp.sendMessage({body, time, to, id}));
    //    expect(
    //        reducer(state, xmpp.messageReceived({body, time: time2, from:to, id, type:'error'}))
    //    ).toEqual({
    //        list:["user1"],
    //        conversations: {
    //            user1: {composing: false, username: 'user1', time, lastMsg: body, history: [{body, time, to, id, type:'error'}]},
    //        }
    //
    //    });
    //});
});
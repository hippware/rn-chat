{
    "initial": "Load_Data",
    "name": "success",
    "{http://www.w3.org/2000/xmlns/}": "http://www.w3.org/2005/07/scxml",
    "$type": "scxml",
    "states": [
        {
            "id": "Load_Data",
            "onEntry": [
                {
                    "$line": 3,
                    "$column": 11,
                    "$type": "script",
                    "content": "run(r.storage.load);setScene('launch')"
                }
            ],
            "transitions": [
                {
                    "event": "success",
                    "target": "Connect"
                },
                {
                    "event": "failure",
                    "target": "PromoScene"
                }
            ]
        },
        {
            "id": "Connect",
            "onEntry": [
                {
                    "$line": 10,
                    "$column": 11,
                    "$type": "script",
                    "content": "run(r.xmpp.login, _event.data)"
                }
            ],
            "transitions": [
                {
                    "event": "failure",
                    "target": "PromoScene"
                },
                {
                    "event": "success",
                    "target": "Load_Profile"
                }
            ]
        },
        {
            "id": "PromoScene",
            "onEntry": [
                {
                    "$line": 17,
                    "$column": 11,
                    "$type": "script",
                    "content": "setScene('promo')"
                }
            ],
            "transitions": [
                {
                    "event": "success",
                    "target": "Register"
                }
            ]
        },
        {
            "id": "Register",
            "onEntry": [
                {
                    "$line": 23,
                    "$column": 11,
                    "$type": "script",
                    "content": "run(r.xmpp.register, _event.data)"
                }
            ],
            "transitions": [
                {
                    "event": "success",
                    "target": "Connect"
                }
            ]
        },
        {
            "id": "Load_Profile",
            "onEntry": [
                {
                    "$line": 29,
                    "$column": 11,
                    "$type": "script",
                    "content": "run(r.xmpp.request, _event.data.user)"
                }
            ],
            "transitions": [
                {
                    "event": "failure",
                    "target": "PromoScene"
                },
                {
                    "cond": {
                        "$line": 32,
                        "$column": 75,
                        "expr": "!response.handle"
                    },
                    "event": "success",
                    "target": "SignUpScene"
                },
                {
                    "cond": {
                        "$line": 33,
                        "$column": 74,
                        "expr": "response.handle"
                    },
                    "event": "success",
                    "target": "LoggedScene"
                }
            ]
        },
        {
            "id": "SignUpScene",
            "onEntry": [
                {
                    "$line": 37,
                    "$column": 11,
                    "$type": "script",
                    "content": "setScene('signUp')"
                }
            ],
            "transitions": [
                {
                    "event": "success",
                    "target": "Register_Profile"
                }
            ]
        },
        {
            "id": "Register_Profile",
            "onEntry": [
                {
                    "$line": 43,
                    "$column": 11,
                    "$type": "script",
                    "content": "run(xmpp.update, _event.data)"
                }
            ],
            "transitions": [
                {
                    "event": "failure",
                    "target": "SignUpScene"
                },
                {
                    "event": "success",
                    "target": "Load_Profile"
                }
            ]
        },
        {
            "id": "LoggedScene",
            "initial": "new_node71",
            "onEntry": [
                {
                    "$line": 50,
                    "$column": 11,
                    "$type": "script",
                    "content": "setScene('logged')"
                }
            ],
            "states": [
                {
                    "id": "new_node68"
                },
                {
                    "id": "new_node71"
                }
            ]
        }
    ]
}

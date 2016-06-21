// Copyright (c) 2016, Pavlo Aksonov
// All rights reserved.
import {State, StateMachine, Transition} from 'statem';
import {action, computed, observable} from 'mobx';

    export class __RootState extends State {
        @computed get storage() { return this.sm.storage };
        @computed get xmppStore() { return this.sm.xmpp };
        @computed get friendStore() { return this.sm.friend };
        @computed get profileStore() { return this.sm.profile };
        @computed get messageStore() { return this.sm.message };
        @computed get model() { return this.sm.model };

    constructor(_, parent, sm){
    super({ id: "__Root"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;

    let states = [];
        states.push(new RootState(null, this, sm));
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.name = 'success'; this.$type = 'scxml'; 

    sm.addState(this);

    }
    }
    export class RootState extends State {
        get storage() { return this.parent.storage };
        set storage(value) { this.parent.storage = value };
        get xmppStore() { return this.parent.xmppStore };
        set xmppStore(value) { this.parent.xmppStore = value };
        get friendStore() { return this.parent.friendStore };
        set friendStore(value) { this.parent.friendStore = value };
        get profileStore() { return this.parent.profileStore };
        set profileStore(value) { this.parent.profileStore = value };
        get messageStore() { return this.parent.messageStore };
        set messageStore(value) { this.parent.messageStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };

    constructor(_, parent, sm){
    super({ id: "Root"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;

    let states = [];
        states.push(new LoadDataState(null, this, sm));
        states.push(new ConnectState(null, this, sm));
        states.push(new PromoSceneState(null, this, sm));
        states.push(new RegisterState(null, this, sm));
        states.push(new ConnectedState(null, this, sm));
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.initial = 'LoadData'; 

    sm.addState(this);

    }
    }
    export class LoadDataState extends State {
        get storage() { return this.parent.storage };
        set storage(value) { this.parent.storage = value };
        get xmppStore() { return this.parent.xmppStore };
        set xmppStore(value) { this.parent.xmppStore = value };
        get friendStore() { return this.parent.friendStore };
        set friendStore(value) { this.parent.friendStore = value };
        get profileStore() { return this.parent.profileStore };
        set profileStore(value) { this.parent.profileStore = value };
        get messageStore() { return this.parent.messageStore };
        set messageStore(value) { this.parent.messageStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };

    constructor(_, parent, sm){
    super({ id: "LoadData"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;

    let states = [];
    let transition = [];
        transition.push({
         event: "success", 
         cond: _event => {return _event.data &&_event.data.user; }, 
         target:"Connect", 
        
        });
        transition.push({
         event: "success", 
         cond: _event => {return !_event.data || !_event.data.user; }, 
         target:"PromoScene", 
        
        });
        transition.push({
         event: "failure", 
        
         target:"PromoScene", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onEntry = _event => { this.sm.promise({$line: '12',
$column: '30',
$type: 'promise',
content: () => {return storage.load()}, 
})
; }; 

    sm.addState(this);

    }
    }
    export class ConnectState extends State {
        get storage() { return this.parent.storage };
        set storage(value) { this.parent.storage = value };
        get xmppStore() { return this.parent.xmppStore };
        set xmppStore(value) { this.parent.xmppStore = value };
        get friendStore() { return this.parent.friendStore };
        set friendStore(value) { this.parent.friendStore = value };
        get profileStore() { return this.parent.profileStore };
        set profileStore(value) { this.parent.profileStore = value };
        get messageStore() { return this.parent.messageStore };
        set messageStore(value) { this.parent.messageStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };

    constructor(_, parent, sm){
    super({ id: "Connect"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;

    let states = [];
    let transition = [];
        transition.push({
         event: "failure", 
        
         target:"PromoScene", 
        
        });
        transition.push({
         event: "success", 
        
         target:"LoadProfile", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onEntry = _event => {this.sm.promise({$line: '19',
$column: '25',
$type: 'promise',
content: () => {return xmppStore.connect(_event.data.user, _event.data.password, _event.data.host)}, 
})
; this.model.server = _event.data.host; }; 

    sm.addState(this);

    }
    }
    export class PromoSceneState extends State {
        get storage() { return this.parent.storage };
        set storage(value) { this.parent.storage = value };
        get xmppStore() { return this.parent.xmppStore };
        set xmppStore(value) { this.parent.xmppStore = value };
        get friendStore() { return this.parent.friendStore };
        set friendStore(value) { this.parent.friendStore = value };
        get profileStore() { return this.parent.profileStore };
        set profileStore(value) { this.parent.profileStore = value };
        get messageStore() { return this.parent.messageStore };
        set messageStore(value) { this.parent.messageStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };

    constructor(_, parent, sm){
    super({ id: "PromoScene"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;

    let states = [];
    let transition = [];
        transition.push({
         event: "success", 
        
         target:"Register", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    sm.addState(this);

    }
    }
    export class RegisterState extends State {
        get storage() { return this.parent.storage };
        set storage(value) { this.parent.storage = value };
        get xmppStore() { return this.parent.xmppStore };
        set xmppStore(value) { this.parent.xmppStore = value };
        get friendStore() { return this.parent.friendStore };
        set friendStore(value) { this.parent.friendStore = value };
        get profileStore() { return this.parent.profileStore };
        set profileStore(value) { this.parent.profileStore = value };
        get messageStore() { return this.parent.messageStore };
        set messageStore(value) { this.parent.messageStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };

    constructor(_, parent, sm){
    super({ id: "Register"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;

    let states = [];
    let transition = [];
        transition.push({
         event: "success", 
        
         target:"Connect", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onEntry = _event => { this.sm.promise({$line: '30',
$column: '25',
$type: 'promise',
content: () => {return xmppStore.register(_event.data.resource, _event.data.provider_data)}, 
})
; }; 

    sm.addState(this);

    }
    }
    export class ConnectedState extends State {
        get storage() { return this.parent.storage };
        set storage(value) { this.parent.storage = value };
        get xmppStore() { return this.parent.xmppStore };
        set xmppStore(value) { this.parent.xmppStore = value };
        get friendStore() { return this.parent.friendStore };
        set friendStore(value) { this.parent.friendStore = value };
        get profileStore() { return this.parent.profileStore };
        set profileStore(value) { this.parent.profileStore = value };
        get messageStore() { return this.parent.messageStore };
        set messageStore(value) { this.parent.messageStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };

    constructor(_, parent, sm){
    super({ id: "Connected"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;

    let states = [];
        states.push(new LoadProfileState(null, this, sm));
        states.push(new SetProfileState(null, this, sm));
        states.push(new SignUpSceneState(null, this, sm));
        states.push(new RegisterProfileState(null, this, sm));
        states.push(new MainState(null, this, sm));
    let transition = [];
        transition.push({
         event: "disconnect", 
        
         target:"PromoScene", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onEntry = _event => { this.sm.on({$line: '36',
$column: '39',
$type: 'on',
event: 'disconnect',
content: () => {return xmppStore.disconnected}, 
})
; }; 

    sm.addState(this);

    }
        disconnect = (data) => {
        this.sm.handle("disconnect", data);
        };
    }
    export class LoadProfileState extends State {
        get storage() { return this.parent.storage };
        set storage(value) { this.parent.storage = value };
        get xmppStore() { return this.parent.xmppStore };
        set xmppStore(value) { this.parent.xmppStore = value };
        get friendStore() { return this.parent.friendStore };
        set friendStore(value) { this.parent.friendStore = value };
        get profileStore() { return this.parent.profileStore };
        set profileStore(value) { this.parent.profileStore = value };
        get messageStore() { return this.parent.messageStore };
        set messageStore(value) { this.parent.messageStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };

    constructor(_, parent, sm){
    super({ id: "LoadProfile"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;

    let states = [];
    let transition = [];
        transition.push({
         event: "success", 
        
         target:"SetProfile", 
        
        });
        transition.push({
         event: "failure", 
        
         target:"PromoScene", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onEntry = _event => {this.model.server = _event.data.host; this.sm.promise({$line: '42',
$column: '29',
$type: 'promise',
content: () => {return profileStore.loadProfile(_event.data.user)}, 
})
; }; 

    sm.addState(this);

    }
    }
    export class SetProfileState extends State {
        get storage() { return this.parent.storage };
        set storage(value) { this.parent.storage = value };
        get xmppStore() { return this.parent.xmppStore };
        set xmppStore(value) { this.parent.xmppStore = value };
        get friendStore() { return this.parent.friendStore };
        set friendStore(value) { this.parent.friendStore = value };
        get profileStore() { return this.parent.profileStore };
        set profileStore(value) { this.parent.profileStore = value };
        get messageStore() { return this.parent.messageStore };
        set messageStore(value) { this.parent.messageStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };

    constructor(_, parent, sm){
    super({ id: "SetProfile"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;

    let states = [];
    let transition = [];
        transition.push({
        
         cond: _event => {return !this.model.profile.handle; }, 
         target:"SignUpScene", 
        
        });
        transition.push({
        
         cond: _event => {return this.model.profile.handle; }, 
         target:"Main", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onEntry = _event => { this.model.profile = _event.data; }; 

    sm.addState(this);

    }
        default = (data) => {
        this.sm.handle("default", data);
        };
    }
    export class SignUpSceneState extends State {
        get storage() { return this.parent.storage };
        set storage(value) { this.parent.storage = value };
        get xmppStore() { return this.parent.xmppStore };
        set xmppStore(value) { this.parent.xmppStore = value };
        get friendStore() { return this.parent.friendStore };
        set friendStore(value) { this.parent.friendStore = value };
        get profileStore() { return this.parent.profileStore };
        set profileStore(value) { this.parent.profileStore = value };
        get messageStore() { return this.parent.messageStore };
        set messageStore(value) { this.parent.messageStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };

    constructor(_, parent, sm){
    super({ id: "SignUpScene"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;

    let states = [];
    let transition = [];
        transition.push({
         event: "success", 
        
         target:"RegisterProfile", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onEntry = _event => { undefined; }; 

    sm.addState(this);

    }
    }
    export class RegisterProfileState extends State {
        get storage() { return this.parent.storage };
        set storage(value) { this.parent.storage = value };
        get xmppStore() { return this.parent.xmppStore };
        set xmppStore(value) { this.parent.xmppStore = value };
        get friendStore() { return this.parent.friendStore };
        set friendStore(value) { this.parent.friendStore = value };
        get profileStore() { return this.parent.profileStore };
        set profileStore(value) { this.parent.profileStore = value };
        get messageStore() { return this.parent.messageStore };
        set messageStore(value) { this.parent.messageStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };

    constructor(_, parent, sm){
    super({ id: "RegisterProfile"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;

    let states = [];
    let transition = [];
        transition.push({
         event: "failure", 
        
         target:"SignUpScene", 
        
        });
        transition.push({
         event: "success", 
        
         target:"LoadProfile", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onEntry = _event => { this.sm.promise({$line: '61',
$column: '29',
$type: 'promise',
content: () => {return xmppStore.update(_event.data)}, 
})
; }; 

    sm.addState(this);

    }
    }
    export class MainState extends State {
        get storage() { return this.parent.storage };
        set storage(value) { this.parent.storage = value };
        get xmppStore() { return this.parent.xmppStore };
        set xmppStore(value) { this.parent.xmppStore = value };
        get friendStore() { return this.parent.friendStore };
        set friendStore(value) { this.parent.friendStore = value };
        get profileStore() { return this.parent.profileStore };
        set profileStore(value) { this.parent.profileStore = value };
        get messageStore() { return this.parent.messageStore };
        set messageStore(value) { this.parent.messageStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };

    constructor(_, parent, sm){
    super({ id: "Main"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;

    let states = [];
        states.push(new LoggedSceneState(null, this, sm));
        states.push(new MessagingState(null, this, sm));
        states.push(new RequestRosterState(null, this, sm));
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.$type = 'parallel'; 

    sm.addState(this);

    }
    }
    export class LoggedSceneState extends State {
        get storage() { return this.parent.storage };
        set storage(value) { this.parent.storage = value };
        get xmppStore() { return this.parent.xmppStore };
        set xmppStore(value) { this.parent.xmppStore = value };
        get friendStore() { return this.parent.friendStore };
        set friendStore(value) { this.parent.friendStore = value };
        get profileStore() { return this.parent.profileStore };
        set profileStore(value) { this.parent.profileStore = value };
        get messageStore() { return this.parent.messageStore };
        set messageStore(value) { this.parent.messageStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };

    constructor(_, parent, sm){
    super({ id: "LoggedScene"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    sm.addState(this);

    }
    }
    export class MessagingState extends State {
        get storage() { return this.parent.storage };
        set storage(value) { this.parent.storage = value };
        get xmppStore() { return this.parent.xmppStore };
        set xmppStore(value) { this.parent.xmppStore = value };
        get friendStore() { return this.parent.friendStore };
        set friendStore(value) { this.parent.friendStore = value };
        get profileStore() { return this.parent.profileStore };
        set profileStore(value) { this.parent.profileStore = value };
        get messageStore() { return this.parent.messageStore };
        set messageStore(value) { this.parent.messageStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };

    constructor(_, parent, sm){
    super({ id: "Messaging"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;

    let states = [];
        states.push(new RequestArchiveState(null, this, sm));
        states.push(new MessagingIdleState(null, this, sm));
        states.push(new MessageReceivedState(null, this, sm));
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    sm.addState(this);

    }
    }
    export class RequestArchiveState extends State {
        get storage() { return this.parent.storage };
        set storage(value) { this.parent.storage = value };
        get xmppStore() { return this.parent.xmppStore };
        set xmppStore(value) { this.parent.xmppStore = value };
        get friendStore() { return this.parent.friendStore };
        set friendStore(value) { this.parent.friendStore = value };
        get profileStore() { return this.parent.profileStore };
        set profileStore(value) { this.parent.profileStore = value };
        get messageStore() { return this.parent.messageStore };
        set messageStore(value) { this.parent.messageStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };

    constructor(_, parent, sm){
    super({ id: "RequestArchive"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;

    let states = [];
    let transition = [];
        transition.push({
        
        
         target:"MessagingIdle", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onEntry = _event => { this.sm.script({$line: '72',
$column: '36',
$type: 'script',
content: () => {return messageStore.requestArchive()}, 
})
; }; 

    sm.addState(this);

    }
        default = (data) => {
        this.sm.handle("default", data);
        };
    }
    export class MessagingIdleState extends State {
        get storage() { return this.parent.storage };
        set storage(value) { this.parent.storage = value };
        get xmppStore() { return this.parent.xmppStore };
        set xmppStore(value) { this.parent.xmppStore = value };
        get friendStore() { return this.parent.friendStore };
        set friendStore(value) { this.parent.friendStore = value };
        get profileStore() { return this.parent.profileStore };
        set profileStore(value) { this.parent.profileStore = value };
        get messageStore() { return this.parent.messageStore };
        set messageStore(value) { this.parent.messageStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };

    constructor(_, parent, sm){
    super({ id: "MessagingIdle"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;

    let states = [];
    let transition = [];
        transition.push({
         event: "receiveMessage", 
        
         target:"MessageReceived", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onEntry = _event => { this.sm.on({$line: '77',
$column: '60',
$type: 'on',
event: 'receiveMessage',
content: () => {return xmppStore.message}, 
})
; }; 

    sm.addState(this);

    }
        receiveMessage = (data) => {
        this.sm.handle("receiveMessage", data);
        };
    }
    export class MessageReceivedState extends State {
        get storage() { return this.parent.storage };
        set storage(value) { this.parent.storage = value };
        get xmppStore() { return this.parent.xmppStore };
        set xmppStore(value) { this.parent.xmppStore = value };
        get friendStore() { return this.parent.friendStore };
        set friendStore(value) { this.parent.friendStore = value };
        get profileStore() { return this.parent.profileStore };
        set profileStore(value) { this.parent.profileStore = value };
        get messageStore() { return this.parent.messageStore };
        set messageStore(value) { this.parent.messageStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };

    constructor(_, parent, sm){
    super({ id: "MessageReceived"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;

    let states = [];
    let transition = [];
        transition.push({
        
        
         target:"MessagingIdle", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onEntry = _event => { this.sm.script({$line: '82',
$column: '36',
$type: 'script',
content: () => {return messageStore.receiveMessage(_event.data)}, 
})
; }; 

    sm.addState(this);

    }
        default = (data) => {
        this.sm.handle("default", data);
        };
    }
    export class RequestRosterState extends State {
        get storage() { return this.parent.storage };
        set storage(value) { this.parent.storage = value };
        get xmppStore() { return this.parent.xmppStore };
        set xmppStore(value) { this.parent.xmppStore = value };
        get friendStore() { return this.parent.friendStore };
        set friendStore(value) { this.parent.friendStore = value };
        get profileStore() { return this.parent.profileStore };
        set profileStore(value) { this.parent.profileStore = value };
        get messageStore() { return this.parent.messageStore };
        set messageStore(value) { this.parent.messageStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };

    constructor(_, parent, sm){
    super({ id: "RequestRoster"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onEntry = _event => {this.sm.script({$line: '89',
$column: '32',
$type: 'script',
content: () => {return console.log("REQUEST ROSTER")}, 
})
; this.sm.promise({$line: '90',
$column: '33',
$type: 'promise',
content: () => {return friendStore.requestRoster()}, 
})
; }; 

    sm.addState(this);

    }
    }

export class Statem extends StateMachine {
    __Root: __RootState = this.getState("__Root");
    root: RootState = this.getState("Root");
    loadData: LoadDataState = this.getState("LoadData");
    connect: ConnectState = this.getState("Connect");
    promoScene: PromoSceneState = this.getState("PromoScene");
    register: RegisterState = this.getState("Register");
    connected: ConnectedState = this.getState("Connected");
    loadProfile: LoadProfileState = this.getState("LoadProfile");
    setProfile: SetProfileState = this.getState("SetProfile");
    signUpScene: SignUpSceneState = this.getState("SignUpScene");
    registerProfile: RegisterProfileState = this.getState("RegisterProfile");
    main: MainState = this.getState("Main");
    loggedScene: LoggedSceneState = this.getState("LoggedScene");
    messaging: MessagingState = this.getState("Messaging");
    requestArchive: RequestArchiveState = this.getState("RequestArchive");
    messagingIdle: MessagingIdleState = this.getState("MessagingIdle");
    messageReceived: MessageReceivedState = this.getState("MessageReceived");
    requestRoster: RequestRosterState = this.getState("RequestRoster");
}

export default function createStateMachine(props) {
  return new Statem(null, __RootState, props);
}
// Copyright (c) 2016, Pavlo Aksonov
// All rights reserved.
import {State, StateMachine, Transition} from 'statem';
import {action, computed, observable} from 'mobx';

    export class __RootState extends State {
        @observable storage;
        @observable xmppStore;
        @observable friendStore;
        @observable profileStore;
        @observable messageStore;
        @observable model;
        @observable location;

    constructor(_, parent, sm){
    super({ id: "__Root"}, parent, sm);
        let storage = require('../src/store/storage').default;
        this.storage = storage;
        let xmppStore = require('../src/store/xmpp/xmpp');
        this.xmppStore = xmppStore;
        let friendStore = require('../src/store/friend').default;
        this.friendStore = friendStore;
        let profileStore = require('../src/store/profile').default;
        this.profileStore = profileStore;
        let messageStore = require('../src/store/message').default;
        this.messageStore = messageStore;
        let model = require('../src/model/model').default;
        this.model = model;
        let location = require('../src/store/location').default;
        this.location = location;

    let states = [];
        states.push(new RootState(null, this, sm));
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.$type = 'scxml'; 

    if (this.states && this.states.length){
    for (let i=0;i<1 ;i++){
            this.stack.push({name: this.states[i].id});
            }

            this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:this.states[0].id}]});
    }

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
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "Root"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;
        const location = this.location;

    let states = [];
        states.push(new PromoSceneState(null, this, sm));
        states.push(new RegisterState(null, this, sm));
        states.push(new ConnectedState(null, this, sm));
        states.push(new ConnectState(null, this, sm));
        states.push(new LoadDataState(null, this, sm));
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.initial = 'LoadData'; this.onentry = _event => {this.sm.on({$line: '12',
$column: '26',
$type: 'on',
event: 'disconnect',
content: () => {return xmppStore.disconnected}, 
})
; this.sm.on({$line: '13',
$column: '25',
$type: 'on',
event: 'connected',
content: () => {return xmppStore.connected}, 
})
; }; 

    if (this.states && this.states.length){
    for (let i=0;i<1 ;i++){
            this.stack.push({name: this.states[i].id});
            }

            this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:this.states[0].id}]});
    }

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
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "PromoScene"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];
        transition.push({
         event: "success", 
        
        
        
         target:"Register", 
        
        });
        transition.push({
         event: "connected", 
        
        
        
         target:"Connected", 
        
        });
        transition.push({
         event: "login", 
        
        
        
         target:"Connect", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
    for (let i=0;i<1 ;i++){
            this.stack.push({name: this.states[i].id});
            }

            this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:this.states[0].id}]});
    }

    }
        connected = (data) => {
        this.handle("connected", data);
        };
        login = (data) => {
        this.handle("login", data);
        };
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
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "Register"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];
        transition.push({
         event: "failure", 
        
        
        
         target:"PromoScene", 
        
        });
        transition.push({
         event: "success", 
        
        
        
         target:"Connect", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.promise({$line: '22',
$column: '13',
$type: 'promise',
content: () => {return xmppStore.register(_event.data.resource, _event.data.provider_data)}, 
})
; }; 

    if (this.states && this.states.length){
    for (let i=0;i<1 ;i++){
            this.stack.push({name: this.states[i].id});
            }

            this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:this.states[0].id}]});
    }

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
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "Connected"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;
        const location = this.location;

    let states = [];
        states.push(new MainState(null, this, sm));
        states.push(new FriendsState(null, this, sm));
        states.push(new MessagingState(null, this, sm));
    let transition = [];
        transition.push({
         event: "disconnect", 
        
        
        
         target:"PromoScene", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.$type = 'parallel'; this.onentry = _event => {this.model.server = _event.data.server;this.model.password = _event.data.password;this.model.user = _event.data.user; this.model.connected = true; }; this.onexit = _event => { this.model.connected = false; }; 

    if (this.states && this.states.length){
    for (let i=0;i<1 ;i++){
            this.stack.push({name: this.states[i].id});
            }

            this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:this.states[0].id}]});
    }

    }
        disconnect = (data) => {
        this.handle("disconnect", data);
        };
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
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "Main"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;
        const location = this.location;

    let states = [];
        states.push(new LoggedSceneState(null, this, sm));
        states.push(new CheckProfileState(null, this, sm));
        states.push(new SignUpSceneState(null, this, sm));
        states.push(new RegisterProfileState(null, this, sm));
        states.push(new SaveDataState(null, this, sm));
        states.push(new LoadProfileState(null, this, sm));
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.initial = 'LoadProfile'; 

    if (this.states && this.states.length){
    for (let i=0;i<1 ;i++){
            this.stack.push({name: this.states[i].id});
            }

            this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:this.states[0].id}]});
    }

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
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "LoggedScene"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;
        const location = this.location;

    let states = [];
        states.push(new CubeBarState(null, this, sm));
        states.push(new NavBarState(null, this, sm));
        states.push(new DrawerState(null, this, sm));
        states.push(new LocationState(null, this, sm));
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.$type = 'parallel'; 

    if (this.states && this.states.length){
    for (let i=0;i<1 ;i++){
            this.stack.push({name: this.states[i].id});
            }

            this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:this.states[0].id}]});
    }

    }
    }
    export class CubeBarState extends State {
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
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "CubeBar"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;
        const location = this.location;

    let states = [];
        states.push(new ChatsSceneState(null, this, sm));
        states.push(new DrawerTabsState(null, this, sm));
    let transition = [];
        transition.push({
         event: "drawerTabs", 
         type: "internal", 
         mode: "jump", 
        
         target:"DrawerTabs", 
        
        });
        transition.push({
         event: "chatsScene", 
         type: "internal", 
         mode: "jump", 
        
         target:"ChatsScene", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.initial = 'DrawerTabs'; 

    if (this.states && this.states.length){
    for (let i=0;i<this.states.length ;i++){
            this.stack.push({name: this.states[i].id});
            }

            this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:this.states[0].id}]});
    }

    }
        drawerTabs = (data) => {
        this.handle("drawerTabs", data);
        };
        chatsScene = (data) => {
        this.handle("chatsScene", data);
        };
    }
    export class ChatsSceneState extends State {
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
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "ChatsScene"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
    for (let i=0;i<1 ;i++){
            this.stack.push({name: this.states[i].id});
            }

            this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:this.states[0].id}]});
    }

    }
    }
    export class DrawerTabsState extends State {
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
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "DrawerTabs"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;
        const location = this.location;

    let states = [];
        states.push(new HomeContainerState(null, this, sm));
        states.push(new FriendsSceneState(null, this, sm));
        states.push(new MyAccountSceneState(null, this, sm));
    let transition = [];
        transition.push({
         event: "friendsScene", 
         type: "internal", 
         mode: "jump", 
        
         target:"FriendsScene", 
        
        });
        transition.push({
         event: "homeContainer", 
         type: "internal", 
         mode: "jump", 
        
         target:"HomeContainer", 
        
        });
        transition.push({
         event: "myAccountScene", 
         type: "internal", 
         mode: "jump", 
        
         target:"MyAccountScene", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.initial = 'HomeContainer'; 

    if (this.states && this.states.length){
    for (let i=0;i<this.states.length ;i++){
            this.stack.push({name: this.states[i].id});
            }

            this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:this.states[0].id}]});
    }

    }
        friendsScene = (data) => {
        this.handle("friendsScene", data);
        };
        homeContainer = (data) => {
        this.handle("homeContainer", data);
        };
        myAccountScene = (data) => {
        this.handle("myAccountScene", data);
        };
    }
    export class HomeContainerState extends State {
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
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "HomeContainer"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;
        const location = this.location;

    let states = [];
        states.push(new HomeSceneState(null, this, sm));
        states.push(new FullMapSceneState(null, this, sm));
    let transition = [];
        transition.push({
         event: "homeScene", 
         type: "internal", 
         mode: "jump", 
        
         target:"HomeScene", 
        
        });
        transition.push({
         event: "fullMapScene", 
         type: "internal", 
         mode: "jump", 
        
         target:"FullMapScene", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
    for (let i=0;i<this.states.length ;i++){
            this.stack.push({name: this.states[i].id});
            }

            this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:this.states[0].id}]});
    }

    }
        homeScene = (data) => {
        this.handle("homeScene", data);
        };
        fullMapScene = (data) => {
        this.handle("fullMapScene", data);
        };
    }
    export class HomeSceneState extends State {
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
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "HomeScene"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
    for (let i=0;i<1 ;i++){
            this.stack.push({name: this.states[i].id});
            }

            this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:this.states[0].id}]});
    }

    }
    }
    export class FullMapSceneState extends State {
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
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "FullMapScene"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
    for (let i=0;i<1 ;i++){
            this.stack.push({name: this.states[i].id});
            }

            this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:this.states[0].id}]});
    }

    }
    }
    export class FriendsSceneState extends State {
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
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "FriendsScene"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
    for (let i=0;i<1 ;i++){
            this.stack.push({name: this.states[i].id});
            }

            this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:this.states[0].id}]});
    }

    }
    }
    export class MyAccountSceneState extends State {
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
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "MyAccountScene"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
    for (let i=0;i<1 ;i++){
            this.stack.push({name: this.states[i].id});
            }

            this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:this.states[0].id}]});
    }

    }
    }
    export class NavBarState extends State {
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
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "NavBar"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
    for (let i=0;i<1 ;i++){
            this.stack.push({name: this.states[i].id});
            }

            this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:this.states[0].id}]});
    }

    }
    }
    export class DrawerState extends State {
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
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "Drawer"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;
        const location = this.location;

    let states = [];
        states.push(new DrawerHiddenState(null, this, sm));
        states.push(new DrawerShownState(null, this, sm));
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.initial = 'DrawerHidden'; 

    if (this.states && this.states.length){
    for (let i=0;i<1 ;i++){
            this.stack.push({name: this.states[i].id});
            }

            this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:this.states[0].id}]});
    }

    }
    }
    export class DrawerHiddenState extends State {
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
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "DrawerHidden"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];
        transition.push({
         event: "drawerShow", 
        
        
        
         target:"DrawerShown", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
    for (let i=0;i<1 ;i++){
            this.stack.push({name: this.states[i].id});
            }

            this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:this.states[0].id}]});
    }

    }
        drawerShow = (data) => {
        this.handle("drawerShow", data);
        };
    }
    export class DrawerShownState extends State {
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
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "DrawerShown"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];
        transition.push({
         event: "drawerHide", 
        
        
        
         target:"DrawerHidden", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
    for (let i=0;i<1 ;i++){
            this.stack.push({name: this.states[i].id});
            }

            this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:this.states[0].id}]});
    }

    }
        drawerHide = (data) => {
        this.handle("drawerHide", data);
        };
    }
    export class LocationState extends State {
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
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "Location"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.script({$line: '69',
$column: '15',
$type: 'script',
content: () => {return location.start()}, 
})
; }; this.onexit = _event => { this.sm.script({$line: '72',
$column: '15',
$type: 'script',
content: () => {return location.finish()}, 
})
; }; 

    if (this.states && this.states.length){
    for (let i=0;i<1 ;i++){
            this.stack.push({name: this.states[i].id});
            }

            this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:this.states[0].id}]});
    }

    }
    }
    export class CheckProfileState extends State {
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
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "CheckProfile"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];
        transition.push({
         event: "failure", 
        
        
        
         target:"SignUpScene", 
        
        });
        transition.push({
         event: "success", 
        
        
        
         target:"SaveData", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => {this.model.profile = _event.data; this.sm.promise({$line: '79',
$column: '43',
$type: 'promise',
cond: () => {return model.profile.handle}, 
content: () => {return model.profile}, 
})
; }; 

    if (this.states && this.states.length){
    for (let i=0;i<1 ;i++){
            this.stack.push({name: this.states[i].id});
            }

            this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:this.states[0].id}]});
    }

    }
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
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "SignUpScene"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];
        transition.push({
         event: "success", 
        
        
        
         target:"RegisterProfile", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
    for (let i=0;i<1 ;i++){
            this.stack.push({name: this.states[i].id});
            }

            this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:this.states[0].id}]});
    }

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
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "RegisterProfile"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;
        const location = this.location;

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
    this.onentry = _event => { this.sm.promise({$line: '89',
$column: '15',
$type: 'promise',
content: () => {return profileStore.update(_event.data)}, 
})
; }; 

    if (this.states && this.states.length){
    for (let i=0;i<1 ;i++){
            this.stack.push({name: this.states[i].id});
            }

            this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:this.states[0].id}]});
    }

    }
    }
    export class SaveDataState extends State {
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
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "SaveData"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];
        transition.push({
         event: "success", 
        
        
        
         target:"LoggedScene", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.promise({$line: '96',
$column: '15',
$type: 'promise',
content: () => {return storage.save(model)}, 
})
; }; 

    if (this.states && this.states.length){
    for (let i=0;i<1 ;i++){
            this.stack.push({name: this.states[i].id});
            }

            this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:this.states[0].id}]});
    }

    }
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
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "LoadProfile"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];
        transition.push({
         event: "success", 
        
        
        
         target:"CheckProfile", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.promise({$line: '102',
$column: '15',
$type: 'promise',
content: () => {return profileStore.loadProfile(_event.data.user)}, 
})
; }; 

    if (this.states && this.states.length){
    for (let i=0;i<1 ;i++){
            this.stack.push({name: this.states[i].id});
            }

            this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:this.states[0].id}]});
    }

    }
    }
    export class FriendsState extends State {
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
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "Friends"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.script({$line: '109',
$column: '13',
$type: 'script',
content: () => {return friendStore.start()}, 
})
; }; this.onexit = _event => { this.sm.script({$line: '112',
$column: '13',
$type: 'script',
content: () => {return friendStore.finish()}, 
})
; }; 

    if (this.states && this.states.length){
    for (let i=0;i<1 ;i++){
            this.stack.push({name: this.states[i].id});
            }

            this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:this.states[0].id}]});
    }

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
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "Messaging"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.script({$line: '122',
$column: '13',
$type: 'script',
content: () => {return messageStore.start()}, 
})
; }; this.onexit = _event => { this.sm.script({$line: '125',
$column: '13',
$type: 'script',
content: () => {return messageStore.finish()}, 
})
; }; 

    if (this.states && this.states.length){
    for (let i=0;i<1 ;i++){
            this.stack.push({name: this.states[i].id});
            }

            this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:this.states[0].id}]});
    }

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
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "Connect"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];
        transition.push({
         event: "failure", 
        
        
        
         target:"PromoScene", 
        
        });
        transition.push({
         event: "success", 
        
        
        
         target:"Connected", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.promise({$line: '131',
$column: '13',
$type: 'promise',
content: () => {return xmppStore.connect(_event.data.user, _event.data.password, _event.data.server)}, 
})
; }; 

    if (this.states && this.states.length){
    for (let i=0;i<1 ;i++){
            this.stack.push({name: this.states[i].id});
            }

            this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:this.states[0].id}]});
    }

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
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "LoadData"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];
        transition.push({
         event: "success", 
        
        
        
         target:"Connect", 
        
        });
        transition.push({
         event: "failure", 
        
        
        
         target:"PromoScene", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.promise({$line: '138',
$column: '13',
$type: 'promise',
content: () => {return storage.load()}, 
})
; }; 

    if (this.states && this.states.length){
    for (let i=0;i<1 ;i++){
            this.stack.push({name: this.states[i].id});
            }

            this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:this.states[0].id}]});
    }

    }
    }

export class Statem extends StateMachine {
    get __Root(): __RootState {return this.getState("__Root")};
    get root(): RootState {return this.getState("Root")};
    get promoScene(): PromoSceneState {return this.getState("PromoScene")};
    get register(): RegisterState {return this.getState("Register")};
    get connected(): ConnectedState {return this.getState("Connected")};
    get main(): MainState {return this.getState("Main")};
    get loggedScene(): LoggedSceneState {return this.getState("LoggedScene")};
    get cubeBar(): CubeBarState {return this.getState("CubeBar")};
    get chatsScene(): ChatsSceneState {return this.getState("ChatsScene")};
    get drawerTabs(): DrawerTabsState {return this.getState("DrawerTabs")};
    get homeContainer(): HomeContainerState {return this.getState("HomeContainer")};
    get homeScene(): HomeSceneState {return this.getState("HomeScene")};
    get fullMapScene(): FullMapSceneState {return this.getState("FullMapScene")};
    get friendsScene(): FriendsSceneState {return this.getState("FriendsScene")};
    get myAccountScene(): MyAccountSceneState {return this.getState("MyAccountScene")};
    get navBar(): NavBarState {return this.getState("NavBar")};
    get drawer(): DrawerState {return this.getState("Drawer")};
    get drawerHidden(): DrawerHiddenState {return this.getState("DrawerHidden")};
    get drawerShown(): DrawerShownState {return this.getState("DrawerShown")};
    get location(): LocationState {return this.getState("Location")};
    get checkProfile(): CheckProfileState {return this.getState("CheckProfile")};
    get signUpScene(): SignUpSceneState {return this.getState("SignUpScene")};
    get registerProfile(): RegisterProfileState {return this.getState("RegisterProfile")};
    get saveData(): SaveDataState {return this.getState("SaveData")};
    get loadProfile(): LoadProfileState {return this.getState("LoadProfile")};
    get friends(): FriendsState {return this.getState("Friends")};
    get messaging(): MessagingState {return this.getState("Messaging")};
    get connect(): ConnectState {return this.getState("Connect")};
    get loadData(): LoadDataState {return this.getState("LoadData")};
}

export default new Statem(null, __RootState);

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
        @observable searchStore;
        @observable eventStore;
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
        let searchStore = require('../src/store/search').default;
        this.searchStore = searchStore;
        let eventStore = require('../src/store/event').default;
        this.eventStore = eventStore;
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
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
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
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
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
    this.initial = 'LoadData'; this.onentry = _event => {this.sm.on({$line: '14',
$column: '26',
$type: 'on',
event: 'disconnect',
content: () => {return xmppStore.disconnected}, 
})
; this.sm.on({$line: '15',
$column: '25',
$type: 'on',
event: 'connected',
content: () => {return xmppStore.connected}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
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
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];
        transition.push({
         event: "signIn", 
        
        
        
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
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


    }

    }
        signIn = (data) => {
        this.handle("signIn", data);
        };
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
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
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
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
    this.onentry = _event => { this.sm.promise({$line: '24',
$column: '13',
$type: 'promise',
content: () => {return xmppStore.register(_event.data.resource, _event.data.provider_data)}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


    }

    }
        failure = (data) => {
        this.handle("failure", data);
        };
        success = (data) => {
        this.handle("success", data);
        };
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
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
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
        states.push(new MainState(null, this, sm));
        states.push(new FriendsState(null, this, sm));
        states.push(new MessagingState(null, this, sm));
        states.push(new LocationState(null, this, sm));
        states.push(new EventsState(null, this, sm));
    let transition = [];
        transition.push({
         event: "disconnect", 
        
        
        
         target:"PromoScene", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.$type = 'parallel'; this.onexit = _event => { this.model.connected = false; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
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
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
        states.push(new LoggedSceneState(null, this, sm));
        states.push(new CheckProfileState(null, this, sm));
        states.push(new SignUpSceneState(null, this, sm));
        states.push(new RegisterProfileState(null, this, sm));
        states.push(new SaveDataState(null, this, sm));
        states.push(new LoadProfileState(null, this, sm));
        states.push(new SignUpIntroState(null, this, sm));
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.initial = 'LoadProfile'; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
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
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
        states.push(new DrawerState(null, this, sm));
        states.push(new LoggedState(null, this, sm));
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.$type = 'parallel'; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
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
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
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
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
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
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
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
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
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
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
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
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


    }

    }
        drawerHide = (data) => {
        this.handle("drawerHide", data);
        };
    }
    export class LoggedState extends State {
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "Logged"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
        states.push(new CubeBarState(null, this, sm));
        states.push(new CreateMessageContainerState(null, this, sm));
        states.push(new ProfileDetailsContainerState(null, this, sm));
    let transition = [];
        transition.push({
         event: "createMessageContainer", 
         type: "internal", 
         mode: "push", 
        
         target:"CreateMessageContainer", 
        
        });
        transition.push({
         event: "cubeBar", 
         type: "internal", 
         mode: "push", 
        
         target:"CubeBar", 
        
        });
        transition.push({
         event: "profileDetailsContainer", 
         type: "internal", 
         mode: "push", 
        
         target:"ProfileDetailsContainer", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.initial = 'CubeBar'; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});

                this.isContainer = true;
                this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:initial}]});
                this.initial = this.id+'History';

    }

    }
        createMessageContainer = (data) => {
        this.handle("createMessageContainer", data);
        };
        cubeBar = (data) => {
        this.handle("cubeBar", data);
        };
        profileDetailsContainer = (data) => {
        this.handle("profileDetailsContainer", data);
        };
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
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
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
        states.push(new ChatsContainerState(null, this, sm));
        states.push(new DrawerTabsState(null, this, sm));
    let transition = [];
        transition.push({
         event: "drawerTabs", 
         type: "internal", 
         mode: "jump", 
        
         target:"DrawerTabs", 
        
        });
        transition.push({
         event: "chatsContainer", 
         type: "internal", 
         mode: "jump", 
        
         target:"ChatsContainer", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.initial = 'DrawerTabs'; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});

        this.isSwitch = true;
        for (let i=0;i<this.states.length;i++){
                this.stack.push({name: this.states[i].id});
        }
                this.isContainer = true;
                this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:initial}]});
                this.initial = this.id+'History';

    }

    }
        drawerTabs = (data) => {
        this.handle("drawerTabs", data);
        };
        chatsContainer = (data) => {
        this.handle("chatsContainer", data);
        };
    }
    export class ChatsContainerState extends State {
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "ChatsContainer"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
        states.push(new ChatsState(null, this, sm));
        states.push(new ChatState(null, this, sm));
        states.push(new CreatePrivateChatState(null, this, sm));
    let transition = [];
        transition.push({
         event: "chats", 
         type: "internal", 
         mode: "push", 
        
         target:"Chats", 
        
        });
        transition.push({
         event: "chat", 
         type: "internal", 
         mode: "push", 
        
         target:"Chat", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.initial = 'Chats'; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});

                this.isContainer = true;
                this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:initial}]});
                this.initial = this.id+'History';

    }

    }
        chats = (data) => {
        this.handle("chats", data);
        };
        chat = (data) => {
        this.handle("chat", data);
        };
    }
    export class ChatsState extends State {
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "Chats"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];
        transition.push({
         event: "chat", 
        
        
        
         target:"Chat", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


    }

    }
        chat = (data) => {
        this.handle("chat", data);
        };
    }
    export class ChatState extends State {
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "Chat"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


    }

    }
    }
    export class CreatePrivateChatState extends State {
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "CreatePrivateChat"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];
        transition.push({
         event: "success", 
        
        
        
         target:"Chat", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.promise({$line: '60',
$column: '19',
$type: 'promise',
content: () => {return {item: messageStore.createChat(_event.data)}}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


    }

    }
        success = (data) => {
        this.handle("success", data);
        };
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
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
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
        states.push(new HomeContainerState(null, this, sm));
        states.push(new MyAccountSceneState(null, this, sm));
        states.push(new FriendsContainerState(null, this, sm));
    let transition = [];
        transition.push({
         event: "friendsContainer", 
         type: "internal", 
         mode: "jump", 
        
         target:"FriendsContainer", 
        
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
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});

        this.isSwitch = true;
        for (let i=0;i<this.states.length;i++){
                this.stack.push({name: this.states[i].id});
        }
                this.isContainer = true;
                this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:initial}]});
                this.initial = this.id+'History';

    }

    }
        friendsContainer = (data) => {
        this.handle("friendsContainer", data);
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
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
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
        states.push(new HomeState(null, this, sm));
        states.push(new FullMapState(null, this, sm));
        states.push(new HomeFriendState(null, this, sm));
        states.push(new HomeProfileStoreState(null, this, sm));
        states.push(new HomeEventStoreState(null, this, sm));
    let transition = [];
        transition.push({
         event: "home", 
         type: "internal", 
         mode: "jump", 
        
         target:"Home", 
        
        });
        transition.push({
         event: "fullMap", 
         type: "internal", 
         mode: "jump", 
        
         target:"FullMap", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});

        this.isSwitch = true;
        for (let i=0;i<this.states.length;i++){
                this.stack.push({name: this.states[i].id});
        }
                this.isContainer = true;
                this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:initial}]});
                this.initial = this.id+'History';

    }

    }
        home = (data) => {
        this.handle("home", data);
        };
        fullMap = (data) => {
        this.handle("fullMap", data);
        };
    }
    export class HomeState extends State {
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "Home"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];
        transition.push({
         event: "follow", 
        
        
        
         target:"HomeFriend", 
        
        });
        transition.push({
         event: "fullMap", 
        
        
        
         target:"FullMap", 
        
        });
        transition.push({
         event: "openPrivateChat", 
        
        
        
         target:"Chat", 
        
        });
        transition.push({
         event: "createPrivateChat", 
        
        
        
         target:"CreatePrivateChat", 
        
        });
        transition.push({
         event: "hidePosts", 
        
        
        
         target:"HomeProfileStore", 
        
        });
        transition.push({
         event: "hidePost", 
        
        
        
         target:"HomeEventStore", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


    }

    }
        follow = (data) => {
        this.handle("follow", data);
        };
        fullMap = (data) => {
        this.handle("fullMap", data);
        };
        openPrivateChat = (data) => {
        this.handle("openPrivateChat", data);
        };
        createPrivateChat = (data) => {
        this.handle("createPrivateChat", data);
        };
        hidePosts = (data) => {
        this.handle("hidePosts", data);
        };
        hidePost = (data) => {
        this.handle("hidePost", data);
        };
    }
    export class FullMapState extends State {
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "FullMap"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];
        transition.push({
         event: "home", 
        
        
        
         target:"Home", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


    }

    }
        home = (data) => {
        this.handle("home", data);
        };
    }
    export class HomeFriendState extends State {
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "HomeFriend"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];
        transition.push({
        
        
        
        
         target:"Home", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.script({$line: '85',
$column: '19',
$type: 'script',
content: () => {return friendStore[_event.name](_event.data)}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


    }

    }
        default = (data) => {
        this.handle("default", data);
        };
    }
    export class HomeProfileStoreState extends State {
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "HomeProfileStore"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];
        transition.push({
        
        
        
        
         target:"Home", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.script({$line: '91',
$column: '19',
$type: 'script',
content: () => {return profileStore[_event.name](_event.data)}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


    }

    }
        default = (data) => {
        this.handle("default", data);
        };
    }
    export class HomeEventStoreState extends State {
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "HomeEventStore"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];
        transition.push({
        
        
        
        
         target:"Home", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.script({$line: '97',
$column: '19',
$type: 'script',
content: () => {return eventStore[_event.name](_event.data)}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


    }

    }
        default = (data) => {
        this.handle("default", data);
        };
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
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
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


    }

    }
    }
    export class FriendsContainerState extends State {
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "FriendsContainer"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
        states.push(new FriendsMainState(null, this, sm));
        states.push(new FollowersState(null, this, sm));
        states.push(new BlockedState(null, this, sm));
    let transition = [];
        transition.push({
         event: "friendsMain", 
         type: "internal", 
         mode: "push", 
        
         target:"FriendsMain", 
        
        });
        transition.push({
         event: "followers", 
         type: "internal", 
         mode: "push", 
        
         target:"Followers", 
        
        });
        transition.push({
         event: "blocked", 
         type: "internal", 
         mode: "push", 
        
         target:"Blocked", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.initial = 'FriendsMain'; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});

                this.isContainer = true;
                this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:initial}]});
                this.initial = this.id+'History';

    }

    }
        friendsMain = (data) => {
        this.handle("friendsMain", data);
        };
        followers = (data) => {
        this.handle("followers", data);
        };
        blocked = (data) => {
        this.handle("blocked", data);
        };
    }
    export class FriendsMainState extends State {
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "FriendsMain"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


    }

    }
    }
    export class FollowersState extends State {
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "Followers"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


    }

    }
    }
    export class BlockedState extends State {
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "Blocked"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


    }

    }
    }
    export class CreateMessageContainerState extends State {
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "CreateMessageContainer"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
        states.push(new SelectFriendsState(null, this, sm));
        states.push(new SearchStoreState(null, this, sm));
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.initial = 'SelectFriends'; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


    }

    }
    }
    export class SelectFriendsState extends State {
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "SelectFriends"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];
        transition.push({
         event: "clear", 
        
        
        
         target:"SearchStore", 
        
        });
        transition.push({
         event: "createMessage", 
        
        
        
         target:"CreatePrivateChat", 
        ontransition:_event => { this.sm.script({$line: '117',
$column: '17',
$type: 'script',
content: () => {return searchStore.clear()}, 
})
; }, 
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


    }

    }
        createMessage = (data) => {
        this.handle("createMessage", data);
        };
    }
    export class SearchStoreState extends State {
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "SearchStore"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];
        transition.push({
        
        
        
        
         target:"SelectFriends", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.script({$line: '122',
$column: '17',
$type: 'script',
content: () => {return searchStore[_event.name](_event.data)}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


    }

    }
        default = (data) => {
        this.handle("default", data);
        };
    }
    export class ProfileDetailsContainerState extends State {
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "ProfileDetailsContainer"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
        states.push(new ProfileDetailsState(null, this, sm));
        states.push(new HidePostsState(null, this, sm));
        states.push(new ShowPostsState(null, this, sm));
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.initial = 'ProfileDetails'; this.onexit = _event => { this.sm.script({$line: '129',
$column: '16',
$type: 'script',
content: () => {return this.shouldPop = true}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


    }

    }
    }
    export class ProfileDetailsState extends State {
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "ProfileDetails"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];
        transition.push({
         event: "openPrivateChat", 
        
        
        
         target:"CreatePrivateChat", 
        
        });
        transition.push({
         event: "hidePosts", 
        
        
        
         target:"HidePosts", 
        
        });
        transition.push({
         event: "showPosts", 
        
        
        
         target:"ShowPosts", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


    }

    }
        openPrivateChat = (data) => {
        this.handle("openPrivateChat", data);
        };
        hidePosts = (data) => {
        this.handle("hidePosts", data);
        };
        showPosts = (data) => {
        this.handle("showPosts", data);
        };
    }
    export class HidePostsState extends State {
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "HidePosts"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];
        transition.push({
        
        
        
        
         target:"ProfileDetails", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.script({$line: '138',
$column: '17',
$type: 'script',
content: () => {return profileStore.hidePosts(_event.data)}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


    }

    }
        default = (data) => {
        this.handle("default", data);
        };
    }
    export class ShowPostsState extends State {
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "ShowPosts"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];
        transition.push({
        
        
        
        
         target:"ProfileDetails", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.script({$line: '144',
$column: '17',
$type: 'script',
content: () => {return profileStore.showPosts(_event.data)}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


    }

    }
        default = (data) => {
        this.handle("default", data);
        };
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
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
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];
        transition.push({
         event: "success", 
        
        
        
         target:"SaveData", 
        
        });
        transition.push({
         event: "failure", 
        
        
        
         target:"SignUpIntro", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => {this.sm.script({$line: '153',
$column: '14',
$type: 'script',
content: () => {return console.log('MODEL:', this.model.profile.load);this.model.profile.load(_event.data)}, 
})
; this.sm.promise({$line: '154',
$column: '48',
$type: 'promise',
cond: () => {return this.model.profile.handle}, 
content: () => {return this.model.profile}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


    }

    }
        success = (data) => {
        this.handle("success", data);
        };
        failure = (data) => {
        this.handle("failure", data);
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
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
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];
        transition.push({
         event: "register", 
        
        
        
         target:"RegisterProfile", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


    }

    }
        register = (data) => {
        this.handle("register", data);
        };
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
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
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
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
    this.onentry = _event => { this.sm.promise({$line: '164',
$column: '15',
$type: 'promise',
content: () => {return profileStore.update(_event.data)}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


    }

    }
        failure = (data) => {
        this.handle("failure", data);
        };
        success = (data) => {
        this.handle("success", data);
        };
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
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
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
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
    this.onentry = _event => { this.sm.promise({$line: '171',
$column: '15',
$type: 'promise',
content: () => {return storage.save(model)}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


    }

    }
        success = (data) => {
        this.handle("success", data);
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
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
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
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
    this.onentry = _event => { this.sm.promise({$line: '177',
$column: '15',
$type: 'promise',
content: () => {return profileStore.request(model.user, true)}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


    }

    }
        success = (data) => {
        this.handle("success", data);
        };
    }
    export class SignUpIntroState extends State {
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "SignUpIntro"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];
        transition.push({
         event: "success", 
        
        
        
         target:"SignUpScene", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.script({$line: '183',
$column: '14',
$type: 'script',
content: () => {return setTimeout(this.success, 3000)}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


    }

    }
        success = (data) => {
        this.handle("success", data);
        };
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
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
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.script({$line: '190',
$column: '13',
$type: 'script',
content: () => {return friendStore.start()}, 
})
; }; this.onexit = _event => { this.sm.script({$line: '193',
$column: '13',
$type: 'script',
content: () => {return friendStore.finish()}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
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
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.script({$line: '203',
$column: '13',
$type: 'script',
content: () => {return messageStore.start()}, 
})
; }; this.onexit = _event => { this.sm.script({$line: '206',
$column: '13',
$type: 'script',
content: () => {return messageStore.finish()}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


    }

    }
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
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
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.script({$line: '211',
$column: '13',
$type: 'script',
content: () => {return location.start()}, 
})
; }; this.onexit = _event => { this.sm.script({$line: '214',
$column: '13',
$type: 'script',
content: () => {return location.finish()}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


    }

    }
    }
    export class EventsState extends State {
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "Events"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.script({$line: '219',
$column: '13',
$type: 'script',
content: () => {return eventStore.start()}, 
})
; }; this.onexit = _event => { this.sm.script({$line: '222',
$column: '13',
$type: 'script',
content: () => {return eventStore.finish()}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
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
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
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
    this.onentry = _event => { this.sm.promise({$line: '228',
$column: '13',
$type: 'promise',
content: () => {return profileStore.connect(_event.data.user, _event.data.password, _event.data.server)}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


    }

    }
        failure = (data) => {
        this.handle("failure", data);
        };
        success = (data) => {
        this.handle("success", data);
        };
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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
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
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
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
    this.onentry = _event => { this.sm.promise({$line: '235',
$column: '13',
$type: 'promise',
content: () => {return storage.load()}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        //this.stack.push({name: initial});


    }

    }
        success = (data) => {
        this.handle("success", data);
        };
        failure = (data) => {
        this.handle("failure", data);
        };
    }

export class Statem extends StateMachine {
    get __Root(): __RootState {return this.getState("__Root")};
    get root(): RootState {return this.getState("Root")};
    get promoScene(): PromoSceneState {return this.getState("PromoScene")};
    get register(): RegisterState {return this.getState("Register")};
    get connected(): ConnectedState {return this.getState("Connected")};
    get main(): MainState {return this.getState("Main")};
    get loggedScene(): LoggedSceneState {return this.getState("LoggedScene")};
    get drawer(): DrawerState {return this.getState("Drawer")};
    get drawerHidden(): DrawerHiddenState {return this.getState("DrawerHidden")};
    get drawerShown(): DrawerShownState {return this.getState("DrawerShown")};
    get logged(): LoggedState {return this.getState("Logged")};
    get cubeBar(): CubeBarState {return this.getState("CubeBar")};
    get chatsContainer(): ChatsContainerState {return this.getState("ChatsContainer")};
    get chats(): ChatsState {return this.getState("Chats")};
    get chat(): ChatState {return this.getState("Chat")};
    get createPrivateChat(): CreatePrivateChatState {return this.getState("CreatePrivateChat")};
    get drawerTabs(): DrawerTabsState {return this.getState("DrawerTabs")};
    get homeContainer(): HomeContainerState {return this.getState("HomeContainer")};
    get home(): HomeState {return this.getState("Home")};
    get fullMap(): FullMapState {return this.getState("FullMap")};
    get homeFriend(): HomeFriendState {return this.getState("HomeFriend")};
    get homeProfileStore(): HomeProfileStoreState {return this.getState("HomeProfileStore")};
    get homeEventStore(): HomeEventStoreState {return this.getState("HomeEventStore")};
    get myAccountScene(): MyAccountSceneState {return this.getState("MyAccountScene")};
    get friendsContainer(): FriendsContainerState {return this.getState("FriendsContainer")};
    get friendsMain(): FriendsMainState {return this.getState("FriendsMain")};
    get followers(): FollowersState {return this.getState("Followers")};
    get blocked(): BlockedState {return this.getState("Blocked")};
    get createMessageContainer(): CreateMessageContainerState {return this.getState("CreateMessageContainer")};
    get selectFriends(): SelectFriendsState {return this.getState("SelectFriends")};
    get searchStore(): SearchStoreState {return this.getState("SearchStore")};
    get profileDetailsContainer(): ProfileDetailsContainerState {return this.getState("ProfileDetailsContainer")};
    get profileDetails(): ProfileDetailsState {return this.getState("ProfileDetails")};
    get hidePosts(): HidePostsState {return this.getState("HidePosts")};
    get showPosts(): ShowPostsState {return this.getState("ShowPosts")};
    get checkProfile(): CheckProfileState {return this.getState("CheckProfile")};
    get signUpScene(): SignUpSceneState {return this.getState("SignUpScene")};
    get registerProfile(): RegisterProfileState {return this.getState("RegisterProfile")};
    get saveData(): SaveDataState {return this.getState("SaveData")};
    get loadProfile(): LoadProfileState {return this.getState("LoadProfile")};
    get signUpIntro(): SignUpIntroState {return this.getState("SignUpIntro")};
    get friends(): FriendsState {return this.getState("Friends")};
    get messaging(): MessagingState {return this.getState("Messaging")};
    get location(): LocationState {return this.getState("Location")};
    get events(): EventsState {return this.getState("Events")};
    get connect(): ConnectState {return this.getState("Connect")};
    get loadData(): LoadDataState {return this.getState("LoadData")};
}

export default new Statem(null, __RootState);

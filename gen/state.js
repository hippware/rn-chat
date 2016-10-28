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
        @observable pushStore;
        @observable botStore;

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
        let pushStore = require('../src/store/push').default;
        this.pushStore = pushStore;
        let botStore = require('../src/store/bot').default;
        this.botStore = botStore;

    let states = [];
        states.push(new RootState(null, this, sm));
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.$type = 'scxml'; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

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
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
        states.push(new MainState(null, this, sm));
        states.push(new ConnectionState(null, this, sm));
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.$type = 'parallel'; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


    }

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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

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
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
        states.push(new LaunchState(null, this, sm));
        states.push(new PromoState(null, this, sm));
        states.push(new SignUpState(null, this, sm));
        states.push(new LoggedState(null, this, sm));
    let transition = [];
        transition.push({
         event: "launch", 
         type: "internal", 
         mode: "jump", 
        
         target:"Launch", 
        
        });
        transition.push({
         event: "promo", 
         type: "internal", 
         mode: "jump", 
        
         target:"Promo", 
        
        });
        transition.push({
         event: "signUp", 
         type: "internal", 
         mode: "jump", 
        
         target:"SignUp", 
        
        });
        transition.push({
         event: "logged", 
         type: "internal", 
         mode: "jump", 
        
         target:"Logged", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});

        this.isSwitch = true;
        for (let i=0;i<this.states.length;i++){
                this.push({id: this.states[i].id});
        }
                this.isContainer = true;
                this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:initial}]});
                this.initial = this.id+'History';

    }

    }
        launch = (data) => {
        this.handle("launch", data);
        };
        promo = (data) => {
        this.handle("promo", data);
        };
        signUp = (data) => {
        this.handle("signUp", data);
        };
        logged = (data) => {
        this.handle("logged", data);
        };
    }
    export class LaunchState extends State {
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

    constructor(_, parent, sm){
    super({ id: "Launch"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
        states.push(new CheckProfileState(null, this, sm));
        states.push(new LoadDataState(null, this, sm));
        states.push(new CheckSessionState(null, this, sm));
        states.push(new RetrieveProfileState(null, this, sm));
        states.push(new CheckHandleState(null, this, sm));
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.initial = 'LoadData'; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

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
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];
        transition.push({
         event: "failure", 
        
        
        
         target:"RetrieveProfile", 
        
        });
        transition.push({
         event: "success", 
        
        
        
         target:"CheckHandle", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.promise({$line: '23',
$column: '78',
$type: 'promise',
cond: () => {return this.model.profile && this.model.profile.loaded}, 
content: () => {return true}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

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
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];
        transition.push({
         event: "failure", 
        
        
        
         target:"PromoScene", 
        
        });
        transition.push({
         event: "success", 
        
        
        
         target:"CheckSession", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.promise({$line: '30',
$column: '15',
$type: 'promise',
content: () => {return storage.load()}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


    }

    }
        failure = (data) => {
        this.handle("failure", data);
        };
        success = (data) => {
        this.handle("success", data);
        };
    }
    export class CheckSessionState extends State {
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

    constructor(_, parent, sm){
    super({ id: "CheckSession"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];
        transition.push({
         event: "success", 
        
        
        
         target:"CheckProfile", 
        
        });
        transition.push({
         event: "failure", 
        
        
        
         target:"PromoScene", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.promise({$line: '37',
$column: '128',
$type: 'promise',
cond: () => {return this.model.profile && this.model.password && this.model.server && this.model.user}, 
content: () => {return true}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


    }

    }
        success = (data) => {
        this.handle("success", data);
        };
        failure = (data) => {
        this.handle("failure", data);
        };
    }
    export class RetrieveProfileState extends State {
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

    constructor(_, parent, sm){
    super({ id: "RetrieveProfile"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];
        transition.push({
         event: "success", 
        
        
        
         target:"CheckProfile", 
        
        });
        transition.push({
         event: "failure", 
        
        
        
         target:"PromoScene", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.promise({$line: '44',
$column: '15',
$type: 'promise',
content: () => {return profileStore.request(model.user, true)}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


    }

    }
        success = (data) => {
        this.handle("success", data);
        };
        failure = (data) => {
        this.handle("failure", data);
        };
    }
    export class CheckHandleState extends State {
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

    constructor(_, parent, sm){
    super({ id: "CheckHandle"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];
        transition.push({
         event: "success", 
        
        
        
         target:"Logged", 
        
        });
        transition.push({
         event: "failure", 
        
        
        
         target:"SignUp", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.promise({$line: '51',
$column: '48',
$type: 'promise',
cond: () => {return this.model.profile.handle}, 
content: () => {return true}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


    }

    }
        success = (data) => {
        this.handle("success", data);
        };
        failure = (data) => {
        this.handle("failure", data);
        };
    }
    export class PromoState extends State {
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

    constructor(_, parent, sm){
    super({ id: "Promo"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
        states.push(new PromoSceneState(null, this, sm));
        states.push(new ProfileRegisterState(null, this, sm));
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

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
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];
        transition.push({
         event: "signIn", 
        
        
        
         target:"ProfileRegister", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


    }

    }
        signIn = (data) => {
        this.handle("signIn", data);
        };
    }
    export class ProfileRegisterState extends State {
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

    constructor(_, parent, sm){
    super({ id: "ProfileRegister"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];
        transition.push({
         event: "failure", 
        
        
        
         target:"PromoScene", 
        
        });
        transition.push({
         event: "success", 
        
        
        
         target:"CheckSession", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.promise({$line: '63',
$column: '15',
$type: 'promise',
content: () => {return profileStore.register(_event.data.resource, _event.data.provider_data)}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


    }

    }
        failure = (data) => {
        this.handle("failure", data);
        };
        success = (data) => {
        this.handle("success", data);
        };
    }
    export class SignUpState extends State {
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

    constructor(_, parent, sm){
    super({ id: "SignUp"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
        states.push(new SignUpSceneState(null, this, sm));
        states.push(new ProfileUpdateState(null, this, sm));
        states.push(new SignUpIntroState(null, this, sm));
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


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
        get searchStore() { return this.parent.searchStore };
        set searchStore(value) { this.parent.searchStore = value };
        get eventStore() { return this.parent.eventStore };
        set eventStore(value) { this.parent.eventStore = value };
        get model() { return this.parent.model };
        set model(value) { this.parent.model = value };
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

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
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];
        transition.push({
         event: "register", 
        
        
        
         target:"ProfileUpdate", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


    }

    }
        register = (data) => {
        this.handle("register", data);
        };
    }
    export class ProfileUpdateState extends State {
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

    constructor(_, parent, sm){
    super({ id: "ProfileUpdate"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];
        transition.push({
         event: "failure", 
        
        
        
         target:"SignUpScene", 
        
        });
        transition.push({
         event: "success", 
        
        
        
         target:"CheckProfile", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.promise({$line: '75',
$column: '15',
$type: 'promise',
content: () => {return profileStore.update(_event.data)}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


    }

    }
        failure = (data) => {
        this.handle("failure", data);
        };
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

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
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];
        transition.push({
         event: "success", 
        
        
        
         target:"SignUpScene", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.script({$line: '82',
$column: '14',
$type: 'script',
content: () => {return setTimeout(this.success, 2000)}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


    }

    }
        success = (data) => {
        this.handle("success", data);
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

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
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
        states.push(new CubeBarState(null, this, sm));
        states.push(new CreateMessageContainerState(null, this, sm));
        states.push(new ProfileDetailsContainerState(null, this, sm));
        states.push(new CreateBotContainerState(null, this, sm));
        states.push(new BotDetailsState(null, this, sm));
        states.push(new BotOptionsState(null, this, sm));
        states.push(new BotNotificationsState(null, this, sm));
        states.push(new BotPhotoState(null, this, sm));
        states.push(new BotNoteState(null, this, sm));
        states.push(new BotAddressState(null, this, sm));
        states.push(new BotEditState(null, this, sm));
        states.push(new BotMapState(null, this, sm));
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
        transition.push({
         event: "createBotContainer", 
         type: "internal", 
         mode: "push", 
        
         target:"CreateBotContainer", 
        
        });
        transition.push({
         event: "botDetails", 
         type: "internal", 
         mode: "push", 
        
         target:"BotDetails", 
        
        });
        transition.push({
         event: "botOptions", 
         type: "internal", 
         mode: "push", 
        
         target:"BotOptions", 
        
        });
        transition.push({
         event: "botNotifications", 
         type: "internal", 
         mode: "push", 
        
         target:"BotNotifications", 
        
        });
        transition.push({
         event: "botAddress", 
         type: "internal", 
         mode: "push", 
        
         target:"BotAddress", 
        
        });
        transition.push({
         event: "botNote", 
         type: "internal", 
         mode: "push", 
        
         target:"BotNote", 
        
        });
        transition.push({
         event: "botPhoto", 
         type: "internal", 
         mode: "push", 
        
         target:"BotPhoto", 
        
        });
        transition.push({
         event: "botEdit", 
         type: "internal", 
         mode: "push", 
        
         target:"BotEdit", 
        
        });
        transition.push({
         event: "botMap", 
         type: "internal", 
         mode: "push", 
        
         target:"BotMap", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.initial = 'CubeBar'; this.onentry = _event => { this.sm.script({$line: '89',
$column: '13',
$type: 'script',
content: () => {return profileStore.connect(this.model.user, this.model.password, this.model.server)}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});

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
        createBotContainer = (data) => {
        this.handle("createBotContainer", data);
        };
        botDetails = (data) => {
        this.handle("botDetails", data);
        };
        botOptions = (data) => {
        this.handle("botOptions", data);
        };
        botNotifications = (data) => {
        this.handle("botNotifications", data);
        };
        botAddress = (data) => {
        this.handle("botAddress", data);
        };
        botNote = (data) => {
        this.handle("botNote", data);
        };
        botPhoto = (data) => {
        this.handle("botPhoto", data);
        };
        botEdit = (data) => {
        this.handle("botEdit", data);
        };
        botMap = (data) => {
        this.handle("botMap", data);
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

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
        const pushStore = this.pushStore;
        const botStore = this.botStore;

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
        this.push({id: initial});

        this.isSwitch = true;
        for (let i=0;i<this.states.length;i++){
                this.push({id: this.states[i].id});
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

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
        const pushStore = this.pushStore;
        const botStore = this.botStore;

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
        this.push({id: initial});

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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

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
        const pushStore = this.pushStore;
        const botStore = this.botStore;

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
        this.push({id: initial});


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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

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
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.script({$line: '114',
$column: '16',
$type: 'script',
content: () => {return messageStore.readAll(model.chats.get(_event.data && _event.data.item))}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

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
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];
        transition.push({
         event: "success", 
        
        
        
         target:"Chat", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.promise({$line: '119',
$column: '17',
$type: 'promise',
content: () => {return {item: messageStore.createChat(_event.data).id}}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

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
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
        states.push(new HomeContainerState(null, this, sm));
        states.push(new MyAccountSceneState(null, this, sm));
        states.push(new FriendsContainerState(null, this, sm));
        states.push(new BotsContainerState(null, this, sm));
        states.push(new BotDetailsTabState(null, this, sm));
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
        transition.push({
         event: "botsContainer", 
         type: "internal", 
         mode: "jump", 
        
         target:"BotsContainer", 
        
        });
        transition.push({
         event: "botDetailsTab", 
         type: "internal", 
         mode: "jump", 
        
         target:"BotDetailsTab", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.initial = 'HomeContainer'; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});

        this.isSwitch = true;
        for (let i=0;i<this.states.length;i++){
                this.push({id: this.states[i].id});
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
        botsContainer = (data) => {
        this.handle("botsContainer", data);
        };
        botDetailsTab = (data) => {
        this.handle("botDetailsTab", data);
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

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
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
        states.push(new HomeState(null, this, sm));
        states.push(new FullMapState(null, this, sm));
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
        this.push({id: initial});

        this.isSwitch = true;
        for (let i=0;i<this.states.length;i++){
                this.push({id: this.states[i].id});
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

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
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];
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

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


    }

    }
        fullMap = (data) => {
        this.handle("fullMap", data);
        };
        openPrivateChat = (data) => {
        this.handle("openPrivateChat", data);
        };
        createPrivateChat = (data) => {
        this.handle("createPrivateChat", data);
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

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
        const pushStore = this.pushStore;
        const botStore = this.botStore;

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
        this.push({id: initial});


    }

    }
        home = (data) => {
        this.handle("home", data);
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

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
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];
        transition.push({
         event: "logout", 
        
        
        
         target:"PromoScene", 
        ontransition:_event => { this.sm.script({$line: '144',
$column: '16',
$type: 'script',
content: () => {return profileStore.logout(_event.data)}, 
})
; }, 
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


    }

    }
        logout = (data) => {
        this.handle("logout", data);
        };
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

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
        const pushStore = this.pushStore;
        const botStore = this.botStore;

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
        this.push({id: initial});

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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

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
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

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
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

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
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


    }

    }
    }
    export class BotsContainerState extends State {
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

    constructor(_, parent, sm){
    super({ id: "BotsContainer"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
        states.push(new BotsSceneState(null, this, sm));
    let transition = [];
        transition.push({
         event: "botsScene", 
         type: "internal", 
         mode: "push", 
        
         target:"BotsScene", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});

                this.isContainer = true;
                this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:initial}]});
                this.initial = this.id+'History';

    }

    }
        botsScene = (data) => {
        this.handle("botsScene", data);
        };
    }
    export class BotsSceneState extends State {
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

    constructor(_, parent, sm){
    super({ id: "BotsScene"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];
        transition.push({
         event: "botDetails", 
        
        
        
         target:"BotDetails", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


    }

    }
        botDetails = (data) => {
        this.handle("botDetails", data);
        };
    }
    export class BotDetailsTabState extends State {
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

    constructor(_, parent, sm){
    super({ id: "BotDetailsTab"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];
        transition.push({
         event: "options", 
        
        
        
         target:"BotOptions", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


    }

    }
        options = (data) => {
        this.handle("options", data);
        };
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

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
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
        states.push(new SelectFriendsState(null, this, sm));
        states.push(new SearchStoreState(null, this, sm));
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.initial = 'SelectFriends'; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

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
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];
        transition.push({
         event: "clear", 
        
        
        
         target:"SearchStore", 
        
        });
        transition.push({
         event: "createMessage", 
        
        
        
         target:"CreatePrivateChat", 
        ontransition:_event => { this.sm.script({$line: '170',
$column: '15',
$type: 'script',
content: () => {return searchStore.clear()}, 
})
; }, 
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

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
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];
        transition.push({
        
        
        
        
         target:"SelectFriends", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.script({$line: '175',
$column: '15',
$type: 'script',
content: () => {return searchStore[_event.name](_event.data)}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

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
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
        states.push(new ProfileDetailsState(null, this, sm));
        states.push(new HidePostsState(null, this, sm));
        states.push(new ShowPostsState(null, this, sm));
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.initial = 'ProfileDetails'; this.onexit = _event => { this.sm.script({$line: '182',
$column: '14',
$type: 'script',
content: () => {return this.shouldPop = true}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

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
        const pushStore = this.pushStore;
        const botStore = this.botStore;

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
        this.push({id: initial});


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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

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
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];
        transition.push({
        
        
        
        
         target:"ProfileDetails", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.script({$line: '191',
$column: '15',
$type: 'script',
content: () => {return profileStore.hidePosts(_event.data)}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

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
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];
        transition.push({
        
        
        
        
         target:"ProfileDetails", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.script({$line: '197',
$column: '15',
$type: 'script',
content: () => {return profileStore.showPosts(_event.data)}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


    }

    }
        default = (data) => {
        this.handle("default", data);
        };
    }
    export class CreateBotContainerState extends State {
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

    constructor(_, parent, sm){
    super({ id: "CreateBotContainer"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
        states.push(new CreateBotState(null, this, sm));
        states.push(new BotInfoState(null, this, sm));
    let transition = [];
        transition.push({
         event: "createBot", 
         type: "internal", 
         mode: "push", 
        
         target:"CreateBot", 
        
        });
        transition.push({
         event: "botInfo", 
         type: "internal", 
         mode: "push", 
        
         target:"BotInfo", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.initial = 'CreateBot'; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});

                this.isContainer = true;
                this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:initial}]});
                this.initial = this.id+'History';

    }

    }
        createBot = (data) => {
        this.handle("createBot", data);
        };
        botInfo = (data) => {
        this.handle("botInfo", data);
        };
    }
    export class CreateBotState extends State {
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

    constructor(_, parent, sm){
    super({ id: "CreateBot"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];
        transition.push({
         event: "save", 
        
        
        
         target:"BotInfo", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


    }

    }
        save = (data) => {
        this.handle("save", data);
        };
    }
    export class BotInfoState extends State {
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

    constructor(_, parent, sm){
    super({ id: "BotInfo"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];
        transition.push({
         event: "setAddress", 
        
        
        
         target:"BotAddress", 
        
        });
        transition.push({
         event: "setNote", 
        
        
        
         target:"BotNote", 
        
        });
        transition.push({
         event: "setPhoto", 
        
        
        
         target:"BotPhoto", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


    }

    }
        setAddress = (data) => {
        this.handle("setAddress", data);
        };
        setNote = (data) => {
        this.handle("setNote", data);
        };
        setPhoto = (data) => {
        this.handle("setPhoto", data);
        };
    }
    export class BotDetailsState extends State {
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

    constructor(_, parent, sm){
    super({ id: "BotDetails"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];
        transition.push({
         event: "options", 
        
        
        
         target:"BotOptions", 
        
        });
        transition.push({
         event: "notifications", 
        
        
        
         target:"BotNotifications", 
        
        });
        transition.push({
         event: "map", 
        
        
        
         target:"BotMap", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


    }

    }
        options = (data) => {
        this.handle("options", data);
        };
        notifications = (data) => {
        this.handle("notifications", data);
        };
        map = (data) => {
        this.handle("map", data);
        };
    }
    export class BotOptionsState extends State {
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

    constructor(_, parent, sm){
    super({ id: "BotOptions"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];
        transition.push({
         event: "notifications", 
        
        
        
         target:"BotNotifications", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


    }

    }
        notifications = (data) => {
        this.handle("notifications", data);
        };
    }
    export class BotNotificationsState extends State {
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

    constructor(_, parent, sm){
    super({ id: "BotNotifications"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


    }

    }
    }
    export class BotPhotoState extends State {
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

    constructor(_, parent, sm){
    super({ id: "BotPhoto"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


    }

    }
    }
    export class BotNoteState extends State {
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

    constructor(_, parent, sm){
    super({ id: "BotNote"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


    }

    }
    }
    export class BotAddressState extends State {
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

    constructor(_, parent, sm){
    super({ id: "BotAddress"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


    }

    }
    }
    export class BotEditState extends State {
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

    constructor(_, parent, sm){
    super({ id: "BotEdit"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];
        transition.push({
         event: "setNote", 
        
        
        
         target:"BotNote", 
        
        });
        transition.push({
         event: "setPhoto", 
        
        
        
         target:"BotPhoto", 
        
        });
        transition.push({
         event: "setAddress", 
        
        
        
         target:"BotAddress", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


    }

    }
        setNote = (data) => {
        this.handle("setNote", data);
        };
        setPhoto = (data) => {
        this.handle("setPhoto", data);
        };
        setAddress = (data) => {
        this.handle("setAddress", data);
        };
    }
    export class BotMapState extends State {
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

    constructor(_, parent, sm){
    super({ id: "BotMap"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


    }

    }
    }
    export class ConnectionState extends State {
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

    constructor(_, parent, sm){
    super({ id: "Connection"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
        states.push(new DisconnectedState(null, this, sm));
        states.push(new ConnectedState(null, this, sm));
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.initial = 'Disconnected'; this.onentry = _event => {this.sm.on({$line: '236',
$column: '29',
$type: 'on',
event: 'disconnected',
content: () => {return xmppStore.disconnected}, 
})
; this.sm.on({$line: '237',
$column: '26',
$type: 'on',
event: 'connected',
content: () => {return xmppStore.connected}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


    }

    }
    }
    export class DisconnectedState extends State {
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

    constructor(_, parent, sm){
    super({ id: "Disconnected"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];
        transition.push({
         event: "connected", 
        
        
        
         target:"Connected", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


    }

    }
        connected = (data) => {
        this.handle("connected", data);
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

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
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
        states.push(new FriendsState(null, this, sm));
        states.push(new MessagingState(null, this, sm));
        states.push(new LocationState(null, this, sm));
        states.push(new EventsState(null, this, sm));
        states.push(new ProfileState(null, this, sm));
        states.push(new PushState(null, this, sm));
        states.push(new BotState(null, this, sm));
    let transition = [];
        transition.push({
         event: "disconnected", 
        
        
        
         target:"Disconnected", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.$type = 'parallel'; this.onentry = _event => { this.sm.script({$line: '244',
$column: '13',
$type: 'script',
content: () => {return this.model.load(_event.data)}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


    }

    }
        disconnected = (data) => {
        this.handle("disconnected", data);
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

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
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.script({$line: '249',
$column: '14',
$type: 'script',
content: () => {return friendStore.start()}, 
})
; }; this.onexit = _event => { this.sm.script({$line: '252',
$column: '14',
$type: 'script',
content: () => {return friendStore.finish()}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

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
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.script({$line: '262',
$column: '14',
$type: 'script',
content: () => {return messageStore.start()}, 
})
; }; this.onexit = _event => { this.sm.script({$line: '265',
$column: '14',
$type: 'script',
content: () => {return messageStore.finish()}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

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
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.script({$line: '270',
$column: '14',
$type: 'script',
content: () => {return location.start()}, 
})
; }; this.onexit = _event => { this.sm.script({$line: '273',
$column: '14',
$type: 'script',
content: () => {return location.finish()}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

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
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.script({$line: '278',
$column: '14',
$type: 'script',
content: () => {return eventStore.start()}, 
})
; }; this.onexit = _event => { this.sm.script({$line: '281',
$column: '14',
$type: 'script',
content: () => {return eventStore.finish()}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


    }

    }
    }
    export class ProfileState extends State {
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

    constructor(_, parent, sm){
    super({ id: "Profile"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.script({$line: '286',
$column: '14',
$type: 'script',
content: () => {return profileStore.request(this.model.user, true)}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


    }

    }
    }
    export class PushState extends State {
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

    constructor(_, parent, sm){
    super({ id: "Push"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.script({$line: '291',
$column: '14',
$type: 'script',
content: () => {return pushStore.start()}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


    }

    }
    }
    export class BotState extends State {
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
        get pushStore() { return this.parent.pushStore };
        set pushStore(value) { this.parent.pushStore = value };
        get botStore() { return this.parent.botStore };
        set botStore(value) { this.parent.botStore = value };

    constructor(_, parent, sm){
    super({ id: "Bot"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const searchStore = this.searchStore;
        const eventStore = this.eventStore;
        const model = this.model;
        const location = this.location;
        const pushStore = this.pushStore;
        const botStore = this.botStore;

    let states = [];
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.script({$line: '296',
$column: '14',
$type: 'script',
content: () => {return botStore.start()}, 
})
; }; this.onexit = _event => { this.sm.script({$line: '299',
$column: '14',
$type: 'script',
content: () => {return botStore.finish()}, 
})
; }; 

    if (this.states && this.states.length){
        const initial = this.initial || this.states[0].id;
        this.push({id: initial});


    }

    }
    }

export class Statem extends StateMachine {
    get __Root(): __RootState {return this.getState("__Root")};
    get root(): RootState {return this.getState("Root")};
    get main(): MainState {return this.getState("Main")};
    get launch(): LaunchState {return this.getState("Launch")};
    get checkProfile(): CheckProfileState {return this.getState("CheckProfile")};
    get loadData(): LoadDataState {return this.getState("LoadData")};
    get checkSession(): CheckSessionState {return this.getState("CheckSession")};
    get retrieveProfile(): RetrieveProfileState {return this.getState("RetrieveProfile")};
    get checkHandle(): CheckHandleState {return this.getState("CheckHandle")};
    get promo(): PromoState {return this.getState("Promo")};
    get promoScene(): PromoSceneState {return this.getState("PromoScene")};
    get profileRegister(): ProfileRegisterState {return this.getState("ProfileRegister")};
    get signUp(): SignUpState {return this.getState("SignUp")};
    get signUpScene(): SignUpSceneState {return this.getState("SignUpScene")};
    get profileUpdate(): ProfileUpdateState {return this.getState("ProfileUpdate")};
    get signUpIntro(): SignUpIntroState {return this.getState("SignUpIntro")};
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
    get myAccountScene(): MyAccountSceneState {return this.getState("MyAccountScene")};
    get friendsContainer(): FriendsContainerState {return this.getState("FriendsContainer")};
    get friendsMain(): FriendsMainState {return this.getState("FriendsMain")};
    get followers(): FollowersState {return this.getState("Followers")};
    get blocked(): BlockedState {return this.getState("Blocked")};
    get botsContainer(): BotsContainerState {return this.getState("BotsContainer")};
    get botsScene(): BotsSceneState {return this.getState("BotsScene")};
    get botDetailsTab(): BotDetailsTabState {return this.getState("BotDetailsTab")};
    get createMessageContainer(): CreateMessageContainerState {return this.getState("CreateMessageContainer")};
    get selectFriends(): SelectFriendsState {return this.getState("SelectFriends")};
    get searchStore(): SearchStoreState {return this.getState("SearchStore")};
    get profileDetailsContainer(): ProfileDetailsContainerState {return this.getState("ProfileDetailsContainer")};
    get profileDetails(): ProfileDetailsState {return this.getState("ProfileDetails")};
    get hidePosts(): HidePostsState {return this.getState("HidePosts")};
    get showPosts(): ShowPostsState {return this.getState("ShowPosts")};
    get createBotContainer(): CreateBotContainerState {return this.getState("CreateBotContainer")};
    get createBot(): CreateBotState {return this.getState("CreateBot")};
    get botInfo(): BotInfoState {return this.getState("BotInfo")};
    get botDetails(): BotDetailsState {return this.getState("BotDetails")};
    get botOptions(): BotOptionsState {return this.getState("BotOptions")};
    get botNotifications(): BotNotificationsState {return this.getState("BotNotifications")};
    get botPhoto(): BotPhotoState {return this.getState("BotPhoto")};
    get botNote(): BotNoteState {return this.getState("BotNote")};
    get botAddress(): BotAddressState {return this.getState("BotAddress")};
    get botEdit(): BotEditState {return this.getState("BotEdit")};
    get botMap(): BotMapState {return this.getState("BotMap")};
    get connection(): ConnectionState {return this.getState("Connection")};
    get disconnected(): DisconnectedState {return this.getState("Disconnected")};
    get connected(): ConnectedState {return this.getState("Connected")};
    get friends(): FriendsState {return this.getState("Friends")};
    get messaging(): MessagingState {return this.getState("Messaging")};
    get location(): LocationState {return this.getState("Location")};
    get events(): EventsState {return this.getState("Events")};
    get profile(): ProfileState {return this.getState("Profile")};
    get push(): PushState {return this.getState("Push")};
    get bot(): BotState {return this.getState("Bot")};
}

export default new Statem(null, __RootState);

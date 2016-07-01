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
        @computed get location() { return this.sm.location };

    constructor(_, parent, sm){
    super({ id: "__Root"}, parent, sm);
        const storage = this.storage;
        const xmppStore = this.xmppStore;
        const friendStore = this.friendStore;
        const profileStore = this.profileStore;
        const messageStore = this.messageStore;
        const model = this.model;
        const location = this.location;

    let states = [];
        states.push(new (sm.stateClasses.Root || RootState)(null, this, sm));
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
        states.push(new (sm.stateClasses.LoadData || LoadDataState)(null, this, sm));
        states.push(new (sm.stateClasses.PromoScene || PromoSceneState)(null, this, sm));
        states.push(new (sm.stateClasses.Register || RegisterState)(null, this, sm));
        states.push(new (sm.stateClasses.Connected || ConnectedState)(null, this, sm));
        states.push(new (sm.stateClasses.Connect || ConnectState)(null, this, sm));
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
    this.onentry = _event => { this.sm.promise({$line: '17',
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
        this.sm.handle("connected", data);
        };
        login = (data) => {
        this.sm.handle("login", data);
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
    this.onentry = _event => { this.sm.promise({$line: '30',
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
        states.push(new (sm.stateClasses.CheckProfile || CheckProfileState)(null, this, sm));
        states.push(new (sm.stateClasses.SignUpScene || SignUpSceneState)(null, this, sm));
        states.push(new (sm.stateClasses.RegisterProfile || RegisterProfileState)(null, this, sm));
        states.push(new (sm.stateClasses.Main || MainState)(null, this, sm));
        states.push(new (sm.stateClasses.LoadProfile || LoadProfileState)(null, this, sm));
        states.push(new (sm.stateClasses.SaveData || SaveDataState)(null, this, sm));
    let transition = [];
        transition.push({
         event: "disconnect", 
        
        
        
         target:"PromoScene", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.initial = 'SaveData'; this.onentry = _event => { this.model.server = _event.data.host; }; 

    if (this.states && this.states.length){
    for (let i=0;i<1 ;i++){
            this.stack.push({name: this.states[i].id});
            }

            this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:this.states[0].id}]});
    }

    }
        disconnect = (data) => {
        this.sm.handle("disconnect", data);
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
        
        
        
         target:"Main", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => {this.model.profile = _event.data; this.sm.promise({$line: '43',
$column: '42',
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
    this.onentry = _event => { this.sm.promise({$line: '53',
$column: '14',
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
        states.push(new (sm.stateClasses.LoggedScene || LoggedSceneState)(null, this, sm));
        states.push(new (sm.stateClasses.Messaging || MessagingState)(null, this, sm));
        states.push(new (sm.stateClasses.Friends || FriendsState)(null, this, sm));
        states.push(new (sm.stateClasses.Location || LocationState)(null, this, sm));
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
        states.push(new (sm.stateClasses.CubeBar || CubeBarState)(null, this, sm));
        states.push(new (sm.stateClasses.NavBar || NavBarState)(null, this, sm));
        states.push(new (sm.stateClasses.Drawer || DrawerState)(null, this, sm));
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
        states.push(new (sm.stateClasses.ChatsScene || ChatsSceneState)(null, this, sm));
        states.push(new (sm.stateClasses.DrawerTabs || DrawerTabsState)(null, this, sm));
    let transition = [];
        transition.push({
         event: "drawerTabs", 
        
        
        
         target:"DrawerTabs", 
        
        });
        transition.push({
         event: "chatsScene", 
        
        
        
         target:"ChatsScene", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.initial = 'DrawerTabs'; 

    if (this.states && this.states.length){
    for (let i=0;i<1 ;i++){
            this.stack.push({name: this.states[i].id});
            }

            this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:this.states[0].id}]});
    }

    }
        drawerTabs = (data) => {
        this.sm.handle("drawerTabs", data);
        };
        chatsScene = (data) => {
        this.sm.handle("chatsScene", data);
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
        states.push(new (sm.stateClasses.HomeScene || HomeSceneState)(null, this, sm));
        states.push(new (sm.stateClasses.FriendsScene || FriendsSceneState)(null, this, sm));
    let transition = [];
        transition.push({
         event: "friendsScene", 
        
        
        
         target:"FriendsScene", 
        
        });
        transition.push({
         event: "homeScene", 
        
        
        
         target:"HomeScene", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.initial = 'HomeScene'; 

    if (this.states && this.states.length){
    for (let i=0;i<1 ;i++){
            this.stack.push({name: this.states[i].id});
            }

            this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:this.states[0].id}]});
    }

    }
        friendsScene = (data) => {
        this.sm.handle("friendsScene", data);
        };
        homeScene = (data) => {
        this.sm.handle("homeScene", data);
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
        states.push(new (sm.stateClasses.DrawerHidden || DrawerHiddenState)(null, this, sm));
        states.push(new (sm.stateClasses.DrawerShown || DrawerShownState)(null, this, sm));
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
        this.sm.handle("drawerShow", data);
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
        this.sm.handle("drawerHide", data);
        };
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
    this.onentry = _event => { this.sm.script({$line: '88',
$column: '14',
$type: 'script',
content: () => {return messageStore.start()}, 
})
; }; this.onexit = _event => { this.sm.script({$line: '91',
$column: '14',
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
        states.push(new (sm.stateClasses.RequestRoster || RequestRosterState)(null, this, sm));
        states.push(new (sm.stateClasses.FriendsIdle || FriendsIdleState)(null, this, sm));
        states.push(new (sm.stateClasses.PresenceReceived || PresenceReceivedState)(null, this, sm));
    let transition = [];

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.initial = 'RequestRoster'; 

    if (this.states && this.states.length){
    for (let i=0;i<1 ;i++){
            this.stack.push({name: this.states[i].id});
            }

            this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:this.states[0].id}]});
    }

    }
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
        get location() { return this.parent.location };
        set location(value) { this.parent.location = value };

    constructor(_, parent, sm){
    super({ id: "RequestRoster"}, parent, sm);
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
        
        
        
        
         target:"FriendsIdle", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => {this.sm.script({$line: '97',
$column: '15',
$type: 'script',
content: () => {return console.log("REQUEST ROSTER")}, 
})
; this.sm.promise({$line: '98',
$column: '16',
$type: 'promise',
content: () => {return friendStore.requestRoster()}, 
})
; }; 

    if (this.states && this.states.length){
    for (let i=0;i<1 ;i++){
            this.stack.push({name: this.states[i].id});
            }

            this.states.splice(0, 0, {id: this.id+'History', type:'deep', $type: 'history', transitions:[{target:this.states[0].id}]});
    }

    }
        default = (data) => {
        this.sm.handle("default", data);
        };
    }
    export class FriendsIdleState extends State {
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
    super({ id: "FriendsIdle"}, parent, sm);
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
         event: "presenceReceived", 
        
        
        
         target:"PresenceReceived", 
        
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
        presenceReceived = (data) => {
        this.sm.handle("presenceReceived", data);
        };
    }
    export class PresenceReceivedState extends State {
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
    super({ id: "PresenceReceived"}, parent, sm);
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
        
        
        
        
         target:"FriendsIdle", 
        
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
        default = (data) => {
        this.sm.handle("default", data);
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
    this.onentry = _event => { this.sm.script({$line: '111',
$column: '14',
$type: 'script',
content: () => {return location.start()}, 
})
; }; this.onexit = _event => { this.sm.script({$line: '114',
$column: '14',
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
    this.onentry = _event => { this.sm.promise({$line: '120',
$column: '14',
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
        
        
        
         target:"LoadProfile", 
        
        });

    this.states = states;
    this.transitions = transition.map(el => new Transition(this, el));
    this.onentry = _event => { this.sm.promise({$line: '126',
$column: '14',
$type: 'promise',
content: () => {return storage.save(_event.data)}, 
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
    this.onentry = _event => { this.sm.promise({$line: '133',
$column: '13',
$type: 'promise',
content: () => {return xmppStore.connect(_event.data.user, _event.data.password, _event.data.host)}, 
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
    __Root: __RootState = this.getState("__Root");
    root: RootState = this.getState("Root");
    loadData: LoadDataState = this.getState("LoadData");
    promoScene: PromoSceneState = this.getState("PromoScene");
    register: RegisterState = this.getState("Register");
    connected: ConnectedState = this.getState("Connected");
    checkProfile: CheckProfileState = this.getState("CheckProfile");
    signUpScene: SignUpSceneState = this.getState("SignUpScene");
    registerProfile: RegisterProfileState = this.getState("RegisterProfile");
    main: MainState = this.getState("Main");
    loggedScene: LoggedSceneState = this.getState("LoggedScene");
    cubeBar: CubeBarState = this.getState("CubeBar");
    chatsScene: ChatsSceneState = this.getState("ChatsScene");
    drawerTabs: DrawerTabsState = this.getState("DrawerTabs");
    homeScene: HomeSceneState = this.getState("HomeScene");
    friendsScene: FriendsSceneState = this.getState("FriendsScene");
    navBar: NavBarState = this.getState("NavBar");
    drawer: DrawerState = this.getState("Drawer");
    drawerHidden: DrawerHiddenState = this.getState("DrawerHidden");
    drawerShown: DrawerShownState = this.getState("DrawerShown");
    messaging: MessagingState = this.getState("Messaging");
    friends: FriendsState = this.getState("Friends");
    requestRoster: RequestRosterState = this.getState("RequestRoster");
    friendsIdle: FriendsIdleState = this.getState("FriendsIdle");
    presenceReceived: PresenceReceivedState = this.getState("PresenceReceived");
    location: LocationState = this.getState("Location");
    loadProfile: LoadProfileState = this.getState("LoadProfile");
    saveData: SaveDataState = this.getState("SaveData");
    connect: ConnectState = this.getState("Connect");
}

export default function createStateMachine(props, stateClasses = {}) {
return new Statem(null, {State:__RootState, ...stateClasses}, props);
}
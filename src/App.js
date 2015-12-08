import React from 'react-native';
import Login from './components/Login';
import Main from './components/Main';
import ContactList from './components/ContactList';
import Conversations from './components/Conversations';
import Conversation from './components/Conversation';
import AddConversation from './components/AddConversation';
import AddContact from './components/AddContact';

import {Router, Actions, Route, Schema, Animations} from 'react-native-router-flux';
import { Provider } from '../node_modules/react-redux/native';
import { compose, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './reducers/root';
import { persistStore, autoRehydrate } from 'redux-persist'

const loggerMiddleware = createLogger();
const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
)(createStore);

const {View, AsyncStorage, Text, Navigator} = React;
const store = compose(autoRehydrate())(createStoreWithMiddleware)(reducer)

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    componentWillMount(){
        persistStore(store, {blacklist:['xmpp'], storage: AsyncStorage}, () => {
            this.setState({ rehydrated: true })
        })
    }

    render(){
        // show splash screen or something until state is not loaded
        if (!this.state.rehydrated){
            return <View style={{flex:1}}></View>
        }
        return <Provider store={store}>
                {()=> (
                        <Router>
                            <Schema name="default" sceneConfig={Animations.FlatFloatFromRight} />
                            <Route name="login" component={Login} title="Login"/>
                            <Route name="conversation" component={Conversation} title="Conversation"/>
                            <Route name="addConversation" component={AddConversation} title="Add conversation"/>
                            <Route name="addContact" component={AddContact} title="Add contact"/>
                            <Route name="main">
                                <Router>
                                    <Route name="contactList" component={ContactList} title="Contacts" rightTitle="Add" onRight={()=>Actions.addContact()}/>
                                    <Route name="conversations" component={Conversations} title="Conversations" rightTitle="Add" onRight={()=>Actions.addConversation()}/>
                                </Router>
                            </Route>
                        </Router>
                )}
                </Provider>;
    }
}


import React from 'react-native';

const {AppRegistry} = React;
import App from './src/App';

AppRegistry.registerComponent('Chat', () => App);
//
// in case isolated work, comment line above and uncomment lines below
// import React from 'react';
// import botFactory from './src/factory/botFactory';
// import Profile from './src/model/Profile';
// import Location from './src/model/Location';
// import BotDetails from './src/components/BotDetails';
// import {Text, AppRegistry, View} from 'react-native';
// import locationStore from './src/store/locationStore';
// import {Router, Scene, Stack} from 'react-native-router-flux';
//
// const owner = new Profile('123');
// owner.handle = 'aksonov';
// owner.image = { source: require('./images/iconBotAdded.png')};
// locationStore.location = new Location({latitude: 12, longitude: 12});
// const bot = botFactory.create({id: '123', owner, address: 'Los Angeles, US', followersSize: 123, description: '123123123fsd fsd fsdf sdf',
//   title: 'Wow my test bot rules!', location: {latitude: 45.547289, longitude: 13.7333244}, visibility: 100});
// bot.image = {source: require('./images/iconAddcover.png')};
// const App = () => <Router>
//   <Stack>
//     <Scene item='123' isNew component={BotDetails} scale={0.5} />
//   </Stack>
// </Router>;
//
// AppRegistry.registerComponent('App', () => App);
//

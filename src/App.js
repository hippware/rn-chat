import {AppRegistry} from 'react-native';

import {Actions, Router} from 'react-native-router-native';
import {reaction, spy} from 'mobx';
import location from './store/locationStore';

import analytics from './components/Analytics';
analytics.init();

// spy(event => console.log('&& MOBX EVENT:', event));

reaction(
    () => location.isDay,
    isDay => {
        Actions.refresh &&
            Actions.refresh({
                key: 'nav',
                style: isDay ? dayNavBar : nightNavBar,
            });
    }
);

import CreateMessage from './components/CreateMessage';
AppRegistry.registerComponent('sideMenu', () => CreateMessage);

import scenes from './router/main';
Router(scenes);

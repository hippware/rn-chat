// @QUESTION: can we safely move these to globals.js without breaking tests?
// Or, better yet, can we remove the globals altogether and just import them in fileStore.js when necessary? [eric]
global.fs = require('react-native-fs');
global.tempDir = fs.CachesDirectoryPath;
global.downloadHttpFile = async (fromUrl, toFile, headers) => {
    const promise = fs.downloadFile({fromUrl, toFile, headers}).promise;
    const {statusCode} = await promise;
    if (statusCode != 200) {
        throw 'Cannot upload file';
    }
};
global.fileExists = fs.exists;
global.readFile = fs.readFile;
global.writeFile = fs.writeFile;
global.mkdir = fs.mkdir;

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

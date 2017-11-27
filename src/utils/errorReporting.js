// @flow
/* global ErrorUtils */

import NativeEnv from 'react-native-native-env';
import profileStore from '../store/profileStore';
import model from '../model/model';
import {Client, Configuration} from 'bugsnag-react-native';

const config = new Configuration();
config.notifyReleaseStages = ['testflight', 'production'];
const bsClient = new Client(config);

if (!NativeEnv.get('DEBUG')) {
  // if there is an uncaught js error, logout and rethrow shortly thereafter
  // there is technically a race condition to see if the network request can complete in time to crash
  const originalGlobalErrorHandler = ErrorUtils.getGlobalHandler();
  ErrorUtils.setGlobalHandler(async (error) => {
    const {profile} = model;
    bsClient.setUser(model.user, profile && profile.displayName, profile && profile.email);
    bsClient.notify(error);
    // TODO: figure out a more elegant way of "restarting" from scratch
    await profileStore.logout();
    ErrorUtils.setGlobalHandler(originalGlobalErrorHandler);
    setTimeout(() => {
      throw error;
    }, 1000);
  });
}

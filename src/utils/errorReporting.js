// @flow
/* global ErrorUtils */

import NativeEnv from 'react-native-native-env';
import profileStore from '../store/profileStore';
import {Client} from 'bugsnag-react-native';

if (!NativeEnv.get('DEBUG')) {
  const bsClient = new Client(); // eslint-disable-line

  // if there is an uncaught js error, logout and rethrow shortly thereafter
  // there is technically a race condition to see if the network request can complete in time to crash
  const originalGlobalErrorHandler = ErrorUtils.getGlobalHandler();
  ErrorUtils.setGlobalHandler(async (error) => {
    bsClient.notify(error);
    // TODO: figure out a more elegant way of "restarting" from scratch
    await profileStore.logout();
    ErrorUtils.setGlobalHandler(originalGlobalErrorHandler);
    setTimeout(() => {
      throw error;
    }, 1000);
  });
}

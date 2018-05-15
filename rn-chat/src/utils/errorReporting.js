// @flow
/* global ErrorUtils */

import NativeEnv from 'react-native-native-env';
import {Client, Configuration} from 'bugsnag-react-native';

const config = new Configuration();
config.notifyReleaseStages = ['testflight', 'production'];
const bsClient = new Client(config);

export default function bugsnag(wocky: any) {
  if (!NativeEnv.get('DEBUG')) {
    // if there is an uncaught js error, logout and rethrow shortly thereafter
    // there is technically a race condition to see if the network request can complete in time to crash
    const originalGlobalErrorHandler = ErrorUtils.getGlobalHandler();
    ErrorUtils.setGlobalHandler(async (error) => {
      try {
        const {profile} = wocky;
        if (profile) {
          bsClient.setUser(profile.id, profile.displayName, profile && profile.email);
        }
      } catch (err) {
        // intentionally swallow these errors to prevent crashes before bugsnag sending
      }
      bsClient.notify(error);
      // TODO: figure out a more elegant way of "restarting" from scratch
      await wocky.logout();
      ErrorUtils.setGlobalHandler(originalGlobalErrorHandler);
      setTimeout(() => {
        throw error;
      }, 1000);
    });
  }
}

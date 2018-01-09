// @flow

import {types} from 'mobx-state-tree';

// AppStore: state related to the app itself (as opposed to state based on the logged in user)

const AppStore = types
  .model('AppStore', {
    resource: types.string,
    isTesting: false,
    isStaging: false,
    codePushChannel: types.maybe(types.string),
    // bundleVersion
  })
  .actions((self) => {
    return {};
  });

export default AppStore;

// @flow

import {types} from 'mobx-state-tree';

// AppStore: state related to the app itself (as opposed to state based on the logged in user)

const AppStore = types
  .model('AppStore', {
    resource: types.optional(types.string),
    isTesting: false,
    isStaging: false,
    codePushChannel: types.optional(types.string),
    // bundleVersion
  })
  .actions((self) => {
    return {};
  });

export default AppStore;

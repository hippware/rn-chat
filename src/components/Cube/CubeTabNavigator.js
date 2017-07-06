/* @flow */

import React from 'react';

import { createNavigator, createNavigationContainer, TabRouter} from 'react-navigation';
import TabView from './TabView';

const CubeNavigator = (
  routeConfigs, config
) => {
  const router = TabRouter(routeConfigs, config);
  const navigator = createNavigator(
    router,
    routeConfigs,
    config
  )((props: *) => (
    <TabView {...props} />
  ));

  return createNavigationContainer(navigator, config.containerConfig);

};

export default CubeNavigator;

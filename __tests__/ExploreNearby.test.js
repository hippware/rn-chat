// @flow
/* global test */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'mobx-react/native';
import LocationStore from '../src/store/LocationStore';
import injects from './utils/inject-mocks';
import './utils/mockMap';
import ExploreNearby from '../src/components/map/ExploreNearBy';

describe('Explore Nearby', () => {
  test('renders with no data', () => {
    const wocky = {};

    const nativeEnv = {
      get: () => null,
    };

    const geolocation = {
      watchPosition: () => {},
      getCurrentPosition: () => {},
    };

    const locationStore = LocationStore.create({}, {geolocation, nativeEnv, logger: {log: () => {}}});
    locationStore.setPosition({
      coords: {longitude: 2, latitude: 2, accuracy: 2},
    });

    const toRender = (
      <Provider {...injects} wocky={wocky} locationStore={locationStore}>
        <ExploreNearby />
      </Provider>
    );
    const tree = renderer.create(toRender).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

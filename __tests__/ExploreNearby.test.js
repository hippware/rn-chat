// @flow

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'mobx-react/native';
import injects from './utils/inject-mocks';
import './utils/mockMap';
import ExploreNearby from '../src/components/map/ExploreNearBy';
import mockLocationStore from './utils/mockLocationStore';

describe('Explore Nearby', () => {
  it('renders with no data', () => {
    const wocky = {};

    mockLocationStore.setPosition({longitude: 2, latitude: 2, accuracy: 2});

    const toRender = (
      <Provider {...injects} wocky={wocky} locationStore={mockLocationStore} store={{}}>
        <ExploreNearby />
      </Provider>
    );
    const tree = renderer.create(toRender).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

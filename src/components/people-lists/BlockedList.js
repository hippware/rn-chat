// @flow

import React from 'react';
import Screen from '../Screen';
import model from '../../model/model';
import {observer} from 'mobx-react/native';
import _ from 'lodash';
import PeopleList from './PeopleList';
import {BlockableProfileItem} from './customProfileItems';

@observer
export default class BlockedList extends React.Component {
  render() {
    return (
      <Screen>
        <PeopleList renderItem={({item}) => <BlockableProfileItem profile={item} />} sections={[{key: 'blocked', data: _.sortBy(model.friends.blocked, 'handle')}]} />
      </Screen>
    );
  }
}

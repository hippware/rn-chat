// @flow

import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Screen from '../Screen';
import model from '../../model/model';
import {observer} from 'mobx-react/native';
import ProfileItem from '../ProfileItem';
import _ from 'lodash';
import PeopleList from './PeopleList';
import SectionHeader from './SectionHeader';

class BlockedList extends React.Component {
  render() {
    return (
      <Screen>
        <PeopleList
          renderItem={({item}) =>
            (<TouchableOpacity onPress={() => Actions.profileDetails({item: item.user})}>
              <ProfileItem isDay profile={item} selected={item && item.isFollowed} showBlockButtons />
            </TouchableOpacity>)}
          sections={[{key: 'blocked', data: _.sortBy(model.friends.blocked, 'handle')}]}
        />
      </Screen>
    );
  }
}

export default observer(BlockedList);

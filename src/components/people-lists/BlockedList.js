// @flow

import React from 'react';
import {Alert, TouchableOpacity, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Screen from '../Screen';
import model from '../../model/model';
import {observer, Observer} from 'mobx-react/native';
import ProfileItem from '../ProfileItem';
import _ from 'lodash';
import PeopleList from './PeopleList';
import friendStore from '../../store/friendStore';
import {k} from '../Global';
import {colors} from '../../constants';
import {RText} from '../common';

@observer
export default class BlockedList extends React.Component {
  render() {
    return (
      <Screen>
        <PeopleList
          renderItem={({item}) =>
            (<TouchableOpacity onPress={() => Actions.profileDetails({item: item.user})}>
              <Observer>
                {() =>
                  (<ProfileItem isDay profile={item} selected={item && item.isFollowed} showBlockButtons>
                    <BlockedButton profile={item} />
                  </ProfileItem>)}
              </Observer>
            </TouchableOpacity>)}
          sections={[{key: 'blocked', data: _.sortBy(model.friends.blocked, 'handle')}]}
        />
      </Screen>
    );
  }
}

const BlockedButton = ({profile}) =>
  (<TouchableOpacity style={[styles.button, styles.following]} onPress={() => unblock(profile)}>
    <RText size={10} color={colors.WHITE}>
      UNBLOCK
    </RText>
  </TouchableOpacity>);

const unblock = (profile) => {
  Alert.alert(null, `Are you sure you want to unblock @${profile.handle}?`, [
    {text: 'Cancel', style: 'cancel'},
    {
      text: 'Unblock',
      style: 'destructive',
      onPress: () => {
        friendStore.unblock(profile);
      },
    },
  ]);
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10 * k,
    marginRight: 10 * k,
    width: 100 * k,
    alignItems: 'center',
    borderRadius: 2 * k,
  },
  block: {
    backgroundColor: colors.WHITE,
    borderColor: colors.DARK_GREY,
    borderWidth: 1,
  },
  following: {
    backgroundColor: colors.PINK,
  },
  followingBtnText: {color: colors.WHITE},
});

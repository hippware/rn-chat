// @flow

import React from 'react';
import {TouchableOpacity, View, Text, Alert} from 'react-native';
import assert from 'assert';
import Header from './Header';
import CardList from './CardList';
import Separator from './Separator';
import {k} from './Global';
import ProfileItem from './ProfileItem';
import {observer} from 'mobx-react/native';

type Props = {
  header: any,
  isDay: boolean,
  selection: any,
  onSelect: Function,
};

const ProfileList = (props: Props) => {
  const {selection, isDay, onSelect} = props;
  assert(selection, 'selection should be defined');
  const theList = selection.list.slice();
  return (
    <View style={{flex: 1}}>
      <CardList
        isDay={isDay}
        keyboardShouldPersistTaps='always'
        data={theList}
        ListHeaderComponent={theHeader}
        ListEmptyComponent={
          <View style={{flex: 1}}>
            <Text
              style={{
                paddingTop: 200 * k,
                fontSize: 15,
                textAlign: 'center',
                backgroundColor: 'transparent',
                color: 'rgb(185,185,185)',
                fontFamily: 'Roboto-Regular',
              }}
            >
              No search results
            </Text>
          </View>
        }
        ItemSeparatorComponent={() => <Separator width={1} />}
        renderItem={({item}) => <SelectableProfileItem row={item} selection={selection} isDay={isDay} onSelect={onSelect} />}
        keyExtractor={item => item.profile.user}
        removeClippedSubviews={false}
      />
    </View>
  );
};

export default observer(ProfileList);

const followToggle = (selection, row) => {
  if (row.selected) {
    Alert.alert(null, 'Are you sure you want to unfollow?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Unfollow',
        style: 'destructive',
        onPress: () => {
          selection.switch(row);
        },
      },
    ]);
  } else {
    selection.switch(row);
  }
};

const SelectableProfileItem = observer((props) => {
  const {row, isDay, selection, onSelect} = props;
  assert(selection, 'selection should be defined');

  return (
    <TouchableOpacity onPress={() => (onSelect ? onSelect(row.profile) : followToggle(selection, row))}>
      <ProfileItem isDay={isDay} profile={row.profile} selected={onSelect ? undefined : row.selected} />
    </TouchableOpacity>
  );
});

const theHeader = ({header, isDay}) =>
  (header
    ? <View>
      <View style={{flexDirection: 'row'}}>
        <Header isDay={isDay}>
          {header}
        </Header>
      </View>
      <Separator width={1} />
    </View>
    : null);

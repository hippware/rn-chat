// @flow

import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import assert from 'assert';
import Header from './Header';
import CardList from './CardList';
import Separator from './Separator';
import {k} from './Global';
import ProfileItem from './ProfileItem';
import {observer} from 'mobx-react/native';

const SelectableProfileItem = observer(props => {
  const {row, isDay, selection, onSelect} = props;
  assert(selection, 'selection should be defined');
  return (
    <TouchableOpacity onPress={() => (onSelect ? onSelect(row.profile) : selection.switch(row))}>
      <ProfileItem key={row.profile.user} isDay={isDay} profile={row.profile} selected={onSelect ? undefined : row.selected} />
    </TouchableOpacity>
  );
});

const theHeader = ({header, isDay}) => {
  if (header) {
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <Header isDay={isDay}>
            {header}
          </Header>
        </View>
        <Separator width={1} />
      </View>
    );
  } else {
    return null;
  }
};

type Props = {
  header: any,
  isDay: boolean,
  selection: any,
  onSelect: Function
};

const ProfileList = (props: Props) => {
  const {selection, isDay, onSelect} = props;
  assert(selection, 'selection should be defined');
  const data = selection.list.map(x => x);
  // const {allSelected} = selection;
  return (
    <View style={{flex: 1}}>
      {!selection.list.length &&
        <Text
            style={{
              fontSize: 15,
              textAlign: 'center',
              backgroundColor: 'transparent',
              paddingTop: 200 * k,
              color: 'rgb(185,185,185)',
              fontFamily: 'Roboto-Regular',
            }}
        >
          No search results
        </Text>}
      {!!selection.list.length &&
        <CardList
            isDay={isDay}
            keyboardShouldPersistTaps='always'
            data={data}
            ListHeaderComponent={theHeader}
            ItemSeparatorComponent={() => <Separator width={1} />}
            renderItem={({item}) => <SelectableProfileItem row={item} selection={selection} isDay={isDay} onSelect={onSelect} />}
            keyExtractor={item => item.profile.user}
            removeClippedSubviews={false}
        />}
    </View>
  );
};

export default observer(ProfileList);

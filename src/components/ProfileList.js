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

type Props = {
  header: any,
  isDay: boolean,
  selection: any,
  onSelect?: Function,
  renderItem?: Function,
};

const ProfileList = (props: Props) => {
  const {selection, isDay, renderItem} = props;
  assert(selection, 'selection should be defined');
  const theList = selection.list.slice();
  const empty = (
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
  );
  return theList.length
    ? <View style={{flex: 1}}>
      <CardList
        isDay={isDay}
        keyboardShouldPersistTaps='always'
        data={theList}
        ListHeaderComponent={theHeader}
        ItemSeparatorComponent={() => <Separator width={1} />}
        renderItem={renderItem || (({item}) => <SelectableProfileItem row={item} {...props} />)}
        keyExtractor={item => item.profile.user}
        removeClippedSubviews={false}
        {...props}
      />
    </View>
    : empty;
};

export default observer(ProfileList);

const SelectableProfileItem = observer((props) => {
  const {row, isDay, selection, onSelect} = props;
  assert(selection, 'selection should be defined');
  return (
    <TouchableOpacity onPress={() => (onSelect ? onSelect(row.profile) : selection.switch(row))}>
      <ProfileItem key={row.profile.user} isDay={isDay} profile={row.profile} selected={onSelect ? undefined : row.selected} />
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

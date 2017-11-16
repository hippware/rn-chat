// @flow

import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import assert from 'assert';
import Header from '../Header';
import CardList from '../CardList';
import Separator from '../Separator';
import {k} from '../Global';
import ProfileItem from './ProfileItem';
import {observer} from 'mobx-react/native';
import {RText} from '../common';
import SelectableProfileList from '../../model/SelectableProfileList';

type Props = {
  header: any,
  isDay: boolean,
  selection: SelectableProfileList,
  onSelect?: Function,
  renderItem?: Function,
};

const ProfileList = (props: Props) => {
  const {selection, isDay, renderItem} = props;
  return selection.filteredList.length ? (
    <View style={{flex: 1}}>
      <CardList
        isDay={isDay}
        keyboardShouldPersistTaps='always'
        data={selection.filteredList}
        ListHeaderComponent={theHeader}
        ItemSeparatorComponent={() => <Separator width={1} />}
        renderItem={renderItem || (({item}) => <SelectableProfileItem row={item} {...props} />)}
        keyExtractor={item => item.profile.user}
        {...props}
      />
    </View>
  ) : (
    <RText size={15} color='rgb(185,185,185)' style={{paddingTop: 200 * k, textAlign: 'center', backgroundColor: 'transparent'}}>
      No search results
    </RText>
  );
};

export default observer(ProfileList);

const SelectableProfileItem = observer((props) => {
  const {row, isDay, selection, onSelect} = props;
  assert(selection, 'selection should be defined');
  return (
    <TouchableOpacity onPress={() => (onSelect ? onSelect(row.profile) : selection.switchRowSelected(row))}>
      <ProfileItem key={row.profile.user} isDay={isDay} profile={row.profile} selected={onSelect ? undefined : row.selected} />
    </TouchableOpacity>
  );
});

const theHeader = ({header, isDay}) =>
  (header ? (
    <View>
      <View style={{flexDirection: 'row'}}>
        <Header isDay={isDay}>{header}</Header>
      </View>
      <Separator width={1} />
    </View>
  ) : null);

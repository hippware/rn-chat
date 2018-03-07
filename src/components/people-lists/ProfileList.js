// @flow

import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import assert from 'assert';
import CardList from '../CardList';
import {k} from '../Global';
import ProfileItem from './ProfileItem';
import {observer} from 'mobx-react/native';
import {RText, Separator} from '../common';

type Props = {
  selection: SelectableProfileList,
  onSelect?: Function,
  renderItem?: Function,
};

const ProfileList = observer((props: Props) => {
  const {selection, renderItem} = props;
  return selection.filteredList.length ? (
    <View style={{flex: 1}}>
      <CardList
        keyboardShouldPersistTaps='always'
        data={selection.filteredList}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={renderItem || (({item}) => <SelectableProfileItem row={item} {...props} />)}
        keyExtractor={item => item.profile.id}
        {...props}
      />
    </View>
  ) : (
    <RText size={15} color='rgb(185,185,185)' style={{paddingTop: 200 * k, textAlign: 'center', backgroundColor: 'transparent'}}>
      No search results
    </RText>
  );
});

export default ProfileList;

const SelectableProfileItem = observer((props) => {
  const {row, selection, onSelect} = props;
  assert(selection, 'selection should be defined');
  return (
    <TouchableOpacity onPress={() => (onSelect ? onSelect(row.profile) : selection.switchRowSelected(row))}>
      <ProfileItem key={row.profile.id} profile={row.profile} selected={onSelect ? undefined : row.selected} />
    </TouchableOpacity>
  );
});

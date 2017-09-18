// @flow

import React from 'react';
import {View, SectionList} from 'react-native';
import {k} from '../Global';
import {colors} from '../../constants';

const PeopleList = props =>
  (<SectionList
    style={{backgroundColor: 'white'}}
    keyExtractor={item => item.user}
    SectionSeparatorComponent={() => <View style={{height: k, backgroundColor: colors.WARM_GREY}} />}
    ItemSeparatorComponent={() => <View style={{height: k, marginLeft: 55 * k, backgroundColor: colors.WARM_GREY}} />}
    stickySectionHeadersEnabled
    {...props}
  />);

export default PeopleList;

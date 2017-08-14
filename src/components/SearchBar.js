// @flow

import React from 'react';
import {Image, StyleSheet, View, TextInput} from 'react-native';
import {k} from './Global';
import {colors} from '../constants';

type Props = {
  // onChangeText: Function,
  // value: string,
  style?: Object,
  // image: ?React.ImageSource,
  image?: any,
};

const SearchBar = (props: Props) =>
  (<View style={styles.searchBar}>
    <Image source={props.image || require('../../images/iconFriendsSearch.png')} style={{margin: 5 * k, height: 12 * k}} resizeMode='contain' />
    <TextInput style={[{flex: 1, fontFamily: 'Roboto-Light', fontSize: 14 * k, margin: 5 * k}, props.style]} returnKeyType='search' clearButtonMode={'while-editing'} {...props} />
  </View>);

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    marginHorizontal: 10 * k,
    marginBottom: 5 * k,
    backgroundColor: colors.LIGHT_GREY,
    borderRadius: 2 * k,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

import React from 'react';
import {TextInput, Image, View} from 'react-native';
import {k} from '../Global';
import ProfileList from './ProfileList';
import {observer} from 'mobx-react/native';
import {colors} from '../../constants';

const SelectFriends = observer(({selection}) => {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: 44 * k,
          backgroundColor: 'white',
          shadowOpacity: 0.12,
          shadowRadius: 5,
          shadowOffset: {height: 1, width: 0},
          paddingLeft: 20 * k,
        }}
      >
        <Image style={{marginRight: 10 * k}} source={require('../../../images/iconSearch.png')} resizeMode='contain' />
        <TextInput
          autoCorrect={false}
          autoCapitalize='none'
          onChangeText={text => selection.setFilter(text)}
          value={selection.filter}
          placeholder='Search name or username'
          placeholderColor={colors.DARK_GREY}
          style={{
            fontSize: 15 * k,
            fontFamily: 'Roboto-Regular',
            height: 44 * k,
            flex: 1,
          }}
          clearButtonMode='while-editing'
        />
      </View>
      <ProfileList selection={selection} />
    </View>
  );
});

export default SelectFriends;

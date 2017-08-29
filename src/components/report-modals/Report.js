// @flow

import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {observer} from 'mobx-react/native';
import {k} from '../Global';
import {colors} from '../../constants';

import {RText} from '../common';
import reportStore from '../../store/reportStore';

type Props = {
  subtitle: string,
  placeholder: string,
};

const Report = ({subtitle, placeholder}: Props) => {
  return (
    <View style={{flex: 1, backgroundColor: colors.WHITE}}>
      <View style={[styles.row, {borderTopWidth: k, borderBottomWidth: 4 * k}]}>
        <RText weight='Medium' size={16} color={colors.DARK_PURPLE}>
          {subtitle}
        </RText>
      </View>
      <View style={[styles.row, {borderBottomWidth: k}]} color={colors.DARK_PURPLE}>
        <RText weight='Medium' size={16}>
          Reason
        </RText>
      </View>
      <View style={[styles.row, {flex: 1}]}>
        <TextInput
          style={{flex: 1, fontSize: 15, fontFamily: 'Roboto-Regular'}}
          autoFocus
          multiline
          value={reportStore.text}
          onChangeText={text => (reportStore.text = text)}
          placeholder={placeholder}
          maxLength={1000}
        />
      </View>
    </View>
  );
};

export default observer(Report);

const styles = StyleSheet.create({
  row: {
    borderColor: colors.GREY,
    paddingHorizontal: 20 * k,
    paddingVertical: 14 * k,
  },
});

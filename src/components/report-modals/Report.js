// @flow

import React from 'react';
import {StyleSheet, View, TextInput, Keyboard} from 'react-native';
import {observer} from 'mobx-react/native';
import {k} from '../Global';
import {colors} from '../../constants';
import {RText} from '../common';
import reportStore from '../../store/reportStore';

type Props = {
  subtitle: string,
  placeholder: string,
};

@observer
export default class Report extends React.Component {
  mounted: boolean = false;
  keyboardHeight: number = 0;
  props: Props;

  componentWillMount() {
    Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
    Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
  }

  componentDidMount() {
    this.mounted = true;
  }

  keyboardWillShow = (e) => {
    if (this.mounted) this.keyboardHeight = e.endCoordinates.height;
  };

  keyboardWillHide = () => {
    if (this.mounted) this.keyboardHeight = 0;
  };

  render() {
    const {placeholder, subtitle} = this.props;
    return (
      <View style={{flex: 1, marginBottom: 5 * k, paddingBottom: this.keyboardHeight, backgroundColor: colors.WHITE}}>
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
        <View style={[styles.row, {flex: 1, paddingBottom: 5}]}>
          <TextInput
            style={{flex: 1, fontSize: 15, fontFamily: 'Roboto-Regular'}}
            autoFocus
            multiline
            value={reportStore.text}
            onChangeText={text => (reportStore.text = text)}
            placeholder={placeholder}
            maxLength={1000}
            editable={!reportStore.submitting}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    borderColor: colors.GREY,
    paddingHorizontal: 20 * k,
    paddingVertical: 14 * k,
  },
});

// @flow

import React from 'react';
import {TouchableOpacity, TextInput, Image, StyleSheet, View, Text} from 'react-native';
import Screen from '../Screen';
import {k} from '../Global';
import {Actions} from 'react-native-router-flux';
import ProfileList from './ProfileList';
import {observer, inject} from 'mobx-react/native';

const Right = inject('searchStore')(observer(({style, textButtonStyle, searchStore}) => (
  <TouchableOpacity
    onPress={() => {
      // TODO: would it be better to batch this in wocky-client instead?
      searchStore.globalResult.selected.forEach(p => p.follow());
      Actions.pop();
      setTimeout(() => Actions.pop());
    }}
    style={style}
  >
    <Text style={[textButtonStyle, searchStore.globalResult.selected.length > 0 ? styles.barRightButtonText : styles.barRightButtonTextInactive]}>Done</Text>
  </TouchableOpacity>
)));

@inject('searchStore')
@observer
export default class AddFriendByUsername extends React.Component<{}> {
  static rightButton = props => <Right {...props} />;

  static backButton = ({style, textButtonStyle}) => (
    <TouchableOpacity onPress={Actions.pop} style={style}>
      <Text style={textButtonStyle}>Cancel</Text>
    </TouchableOpacity>
  );

  render() {
    const {searchStore} = this.props;
    const selection = searchStore.globalResult;
    return (
      <Screen>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: 53 * k,
            backgroundColor: 'white',
          }}
        >
          <View style={{paddingLeft: 22.6 * k, paddingRight: 14.8 * k}}>
            <Image source={require('../../../images/iconSearchHome.png')} />
          </View>
          <TextInput
            autoFocus
            autoCorrect={false}
            autoCapitalize='none'
            onChangeText={searchStore.setGlobal}
            value={searchStore.global}
            placeholder='Enter username'
            placeholderColor='rgb(211,211,211)'
            style={{
              fontSize: 15 * k,
              fontFamily: 'Roboto-Light',
              height: 53 * k,
              flex: 1,
            }}
          />
          <TouchableOpacity onPress={() => searchStore.setGlobal('')}>
            <View style={{paddingRight: 22.6 * k, paddingLeft: 14.8 * k}}>
              <Image source={require('../../../images/iconClose.png')} />
            </View>
          </TouchableOpacity>
        </View>
        <ProfileList selection={selection} />
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  barRightButtonTextInactive: {
    color: 'rgba(254, 92, 108, 0.5)',
  },
  barRightButtonText: {
    color: 'rgb(254, 92, 108)',
  },
});

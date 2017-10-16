import React from 'react';
import {TouchableOpacity, TextInput, Image, View, Text, InteractionManager} from 'react-native';
import {k} from '../Global';
import ProfileList from './ProfileList';
import location from '../../store/locationStore';
import {observer} from 'mobx-react/native';
import {colors} from '../../constants';

@observer
export default class SelectFriends extends React.Component {
  static backButton = ({state, style, textButtonStyle}) => (
    <TouchableOpacity onPress={() => InteractionManager.runAfterInteractions(state.parent.pop)} style={style}>
      <Text style={textButtonStyle}>Cancel</Text>
    </TouchableOpacity>
  );

  render() {
    const selection = this.props.selection;
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
          }}
        >
          <View style={{paddingLeft: 19 * k, paddingRight: 10 * k}}>
            <Image source={require('../../../images/iconSearch.png')} />
          </View>
          <TextInput
            autoCorrect={false}
            autoCapitalize='none'
            onChangeText={text => (selection.filter = text)}
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
        <ProfileList selection={selection} isDay={location.isDay} />
      </View>
    );
    //    Send Message to {selection.selected.length} Friend{selection.selected.length > 1 ? 's' : ''}
  }
}

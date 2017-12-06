// @flow

import React from 'react';
import {View, Image, TextInput, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react/native';
// import {observable, autorun, when} from 'mobx';
import NativeEnv from 'react-native-native-env';

import locationStore, {METRIC, IMPERIAL} from '../../store/locationStore';
import {k} from '../Global';
import botStore from '../../store/botStore';
import geocodingStore from '../../store/geocodingStore';
import {colors} from '../../constants/index';
import * as log from '../../utils/log';
import CurrentLocation from './CurrentLocation';
import {RText} from '../common';
import Separator from '../Separator';

const SYSTEM = NativeEnv.get('NSLocaleUsesMetricSystem') ? METRIC : IMPERIAL;
locationStore.setMetricSystem(SYSTEM);

type Props = {};

@observer
class AddressBar extends React.Component<Props> {
  input: any;

  wrapBold = (text: string) => (
    <RText key={text} weight='Bold'>
      {text}
    </RText>
  );

  formatSuggestion = row =>
    geocodingStore
      .formatText(row.main_text, row.main_text_matched_substrings, this.wrapBold)
      .concat(['\n'])
      .concat(geocodingStore.formatText(row.secondary_text, row.secondary_text_matched_substrings, this.wrapBold));

  suggestion = ({item}) => (
    <TouchableOpacity key={`${item.place_id}vjew`} onPress={() => botStore.redirectToPlace(item.place_id)}>
      <View style={styles.suggestionRow}>
        <Image style={{width: 14}} source={require('../../../images/iconBotLocationPink.png')} />
        <RText color={colors.DARK_PURPLE} style={{flex: 1, paddingLeft: 8.4 * k}} numberOfLines={2}>
          {this.formatSuggestion(item)}
        </RText>
      </View>
    </TouchableOpacity>
  );

  searchToggleBtn = () =>
    (botStore.addressSearchEnabled ? (
      <TouchableOpacity onPress={() => this.input.blur()}>
        <Image source={require('../../../images/leftChevronGray.png')} />
      </TouchableOpacity>
    ) : (
      <Image source={require('../../../images/iconBotLocationPink.png')} />
    ));

  render() {
    const show = botStore.addressSearchEnabled && botStore.addressHelper.text.trim() !== '';
    return (
      <View style={show && {flex: 1}}>
        <View style={styles.searchContainer}>
          {this.searchToggleBtn()}
          <TextInput
            key={`searchBar${botStore.addressSearchEnabled}`}
            autoFocus={botStore.addressSearchEnabled}
            style={styles.textInput}
            clearButtonMode='while-editing'
            onFocus={() => {
              console.log('& focus');
              botStore.addressSearchEnabled = true;
            }}
            onBlur={() => {
              console.log('& blur');
              botStore.addressSearchEnabled = false;
            }}
            onEndEditing={() => {
              console.log('& end editing');
              botStore.addressSearchEnabled = false;
            }}
            onSubmitEditing={() => {
              console.log('& on submit editing');
              botStore.addressSearchEnabled = false;
            }}
            placeholder='Enter a place or address'
            onChangeText={t => (botStore.addressHelper.text = t)}
            value={botStore.addressHelper.text}
            returnKeyType='search'
            ref={r => (this.input = r)}
          />
        </View>
        <CurrentLocation enabled={botStore.addressSearchEnabled} onPress={botStore.redirectToCurrentLocation} />
        {show && (
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <FlatList
              data={botStore.addressHelper.suggestions.map(x => x)}
              scrollEnabled={false}
              enableEmptySections
              style={{paddingBottom: 10.7 * k}}
              // pointerEvents='box-none'
              renderItem={this.suggestion}
              keyExtractor={item => item.place_id}
              ItemSeparatorComponent={Separator}
            />
          </View>
        )}
      </View>
    );
  }
}

export default AddressBar;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    height: 44 * k,
    backgroundColor: 'white',
    paddingTop: 11 * k,
    paddingBottom: 13 * k,
    paddingLeft: 14 * k,
    paddingRight: 9 * k,
    borderTopWidth: 1,
    borderBottomWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.12)',
    shadowOffset: {height: 1, width: 0},
    shadowRadius: 5 * k,
    shadowOpacity: 0.12,
  },
  textInput: {
    flex: 1,
    paddingLeft: 8.4 * k,
    height: 20 * k,
    fontFamily: 'Roboto-Regular',
    color: colors.DARK_PURPLE,
    fontSize: 15 * k,
  },
  suggestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 14 * k,
    paddingTop: 13 * k,
    paddingBottom: 13 * k,
    backgroundColor: 'white',
  },
});

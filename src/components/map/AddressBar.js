// @flow

import React from 'react';
import {View, Image, TextInput, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react/native';
import NativeEnv from 'react-native-native-env';
import locationStore, {METRIC, IMPERIAL} from '../../store/locationStore';
import {k} from '../Global';
import geocodingStore from '../../store/geocodingStore';
import botStore from '../../store/botStore';
import {colors} from '../../constants/index';
import * as log from '../../utils/log';
import CurrentLocation from './CurrentLocation';
import {RText} from '../common';
import Separator from '../Separator';
import {observable, reaction} from 'mobx';
import type {IObservableArray} from 'mobx';
import Bot from '../../model/Bot';
import {Actions} from 'react-native-router-flux';

const SYSTEM = NativeEnv.get('NSLocaleUsesMetricSystem') ? METRIC : IMPERIAL;
locationStore.setMetricSystem(SYSTEM);

type Props = {
  bot: Bot,
};

@observer
class AddressBar extends React.Component<Props> {
  input: any;
  @observable bot: Bot;
  @observable text: string = '';
  @observable suggestions: IObservableArray<Object> = [];
  @observable searchEnabled: boolean = true;
  handler: ?Function;

  constructor(props) {
    super(props);
    this.bot = props.bot;
  }

  componentDidMount() {
    this.handler = reaction(
      () => ({address: this.bot.address, text: this.text, loc: this.bot.location}), this.setSuggestionsFromText,
      {delay: 500},
    );
  }

  componentWillUnmount() {
    this.handler();
  }

  setSuggestionsFromText = async ({address, text, loc}) => {
    if (!text) {
      this.suggestions.clear();
    } else {
      log.log('& GQUERY :', text, JSON.stringify(loc));
      const data = await geocodingStore.query(text, loc);
      this.suggestions.replace(data);
    }
    if (address) {
      this.searchEnabled = false;
      this.text = address;
    }
  };

  onSuggestionSelect = async (placeId) => {
    const data = await geocodingStore.details(placeId);
    this.onLocationSelect({...data, isCurrent: false});
  };

  onLocationSelect = async (data) => {
    this.searchEnabled = false;
    this.text = data.address;
    botStore.changeBotLocation(data);
    Actions.botCompose({isFirstScreen: false});
  };

  onChangeText = (text) => {
    if (!text) {
      this.bot.address = '';
      this.bot.addressData.clear();
    }
    this.text = text;
  };

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
    <TouchableOpacity key={`${item.place_id}vjew`} onPress={() => this.onSuggestionSelect(item.place_id)}>
      <View style={styles.suggestionRow}>
        <Image style={{width: 14}} source={require('../../../images/iconBotLocationPink.png')} />
        <RText color={colors.DARK_PURPLE} style={{flex: 1, paddingLeft: 8.4 * k}} numberOfLines={2}>
          {this.formatSuggestion(item)}
        </RText>
      </View>
    </TouchableOpacity>
  );

  searchToggleBtn = () =>
    (this.searchEnabled ? (
      <TouchableOpacity onPress={() => (this.searchEnabled = false)}>
        <Image source={require('../../../images/leftChevronGray.png')} />
      </TouchableOpacity>
    ) : (
      <Image source={require('../../../images/iconBotLocationPink.png')} />
    ));

  render() {
    const show = this.searchEnabled && this.text.trim() !== '';
    return (
      <View style={show && {flex: 1}}>
        <View style={styles.searchContainer}>
          {this.searchToggleBtn()}
          <TextInput
            key={`searchBar${this.searchEnabled}`}
            autoFocus={this.searchEnabled}
            style={styles.textInput}
            clearButtonMode='while-editing'
            placeholder='Enter a place or address'
            onChangeText={this.onChangeText}
            value={this.text}
            onFocus={() => (this.searchEnabled = true)}
            returnKeyType='search'
            ref={r => (this.input = r)}
          />
        </View>
        <CurrentLocation enabled={this.searchEnabled} onPress={this.onLocationSelect} />
        {show && (
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <FlatList
              keyboardShouldPersistTaps='always'
              data={this.suggestions.slice()}
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

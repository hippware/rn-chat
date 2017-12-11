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

const SYSTEM = NativeEnv.get('NSLocaleUsesMetricSystem') ? METRIC : IMPERIAL;
locationStore.setMetricSystem(SYSTEM);

type Props = {
  bot: Bot,
  edit: ?boolean,
};

@observer
class AddressBar extends React.Component<Props> {
  input: any;
  @observable bot: Bot;
  @observable text: string = '';
  @observable suggestions: IObservableArray<Object> = [];
  @observable searchEnabled: boolean = false;
  handler: ?Function;
  handler2: ?Function;

  constructor(props) {
    super(props);
    this.bot = props.bot;
  }

  componentDidMount() {
    this.handler = reaction(() => ({text: this.text, loc: this.bot.location}), this.setSuggestionsFromText, {delay: 500});
    this.handler2 = reaction(
      () => this.bot.address,
      (address) => {
        if (this.props.edit || !this.bot.isCurrent) {
          this.searchEnabled = false;
          this.text = address;
        }
      },
      {fireImmediately: true},
    );
    setTimeout(() => (this.searchEnabled = true), 500);
  }

  componentWillUnmount() {
    this.handler();
    this.handler2();
  }

  setSuggestionsFromText = async ({text, loc}) => {
    if (!text) {
      this.suggestions.clear();
    } else {
      log.log('& GQUERY :', text, JSON.stringify(loc));
      const data = await geocodingStore.query(text, loc);
      this.suggestions.replace(data);
    }
  };

  onSuggestionSelect = async (placeId) => {
    const data = await geocodingStore.details(placeId);
    this.onLocationSelect({...data, isCurrent: false});
  };

  onLocationSelect = async (data) => {
    this.searchEnabled = false;
    this.text = data.address;
    botStore.changeBotLocation({isCurrent: true, ...data});
    this.props.onSave();
  };

  onChangeText = (text) => {
    this.text = text;
  };

  suggestion = ({item}) => {
    const wrapBold = (text: string, key: string) => (
      <RText key={key} weight='Bold' size={16}>
        {text}
      </RText>
    );

    // have to add unique place id to the key to avoid warning (text could be the same)
    const formatSuggestion = row =>
      geocodingStore
        .formatText(row.main_text, row.main_text_matched_substrings, wrapBold, `${item.place_id}main`)
        .concat(['\n'])
        .concat(geocodingStore.formatText(row.secondary_text, row.secondary_text_matched_substrings, wrapBold, `${item.place_id}second`));

    return (
      <TouchableOpacity key={`${item.place_id}vjew`} onPress={() => this.onSuggestionSelect(item.place_id)} hitSlop={{top: 10, right: 10, bottom: 10, left: 10}}>
        <View style={styles.suggestionRow}>
          <Image style={{width: 14, marginRight: 20 * k, marginLeft: 8 * k}} source={require('../../../images/iconBotLocationPink.png')} />
          <RText color={colors.DARK_PURPLE} style={{flex: 1, paddingLeft: 8.4 * k}} size={16} numberOfLines={2}>
            {formatSuggestion(item)}
          </RText>
        </View>
      </TouchableOpacity>
    );
  };

  searchToggleBtn = () =>
    (this.searchEnabled && this.text.trim() !== '' ? (
      <TouchableOpacity
        onPress={() => {
          this.text = botStore.bot.address;
          this.searchEnabled = false;
        }}
      >
        <Image style={styles.searchToggleButton} source={require('../../../images/leftChevronGray.png')} />
      </TouchableOpacity>
    ) : (
      <Image style={styles.searchToggleButton} source={require('../../../images/iconBotLocationPink.png')} />
    ));

  blur = () => (this.searchEnabled = false);

  render() {
    const showList = this.searchEnabled && this.text.trim() !== '';
    const showCurrentLocation = this.searchEnabled && this.text.trim() === '';
    return (
      <View pointerEvents='box-none' style={{flex: 1}}>
        <CurrentLocation enabled={showCurrentLocation} onPress={this.onLocationSelect} />
        <View style={[showList && {flex: 1}]}>
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
          {this.searchEnabled && (
            <View style={{flex: 1, backgroundColor: colors.WHITE}}>
              <FlatList
                keyboardShouldPersistTaps='always'
                data={this.suggestions.slice()}
                scrollEnabled={false}
                enableEmptySections
                contentContainerStyle={{flex: 1, height: 500, paddingBottom: 10.7 * k}}
                renderItem={this.suggestion}
                keyExtractor={item => item.place_id}
                ItemSeparatorComponent={Separator}
              />
            </View>
          )}
        </View>
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
  searchToggleButton: {
    marginLeft: 8 * k,
    marginRight: 5 * k,
  },
});

// @flow

import React from 'react';
import {View, Image, TextInput, ListView, TouchableOpacity, Text, StyleSheet} from 'react-native';

import Map from './Map';
import locationStore, {METRIC, IMPERIAL} from '../../store/locationStore';
import {k} from '../Global';
import {observer} from 'mobx-react/native';
import {observable, autorun, when} from 'mobx';
import NativeEnv from 'react-native-native-env';
import Separator from '../Separator';
import botStore from '../../store/botStore';
import AddressHelper from '../../model/AddressHelper';
import Button from '../Button';
import geocoding from '../../store/geocodingStore';
import {colors} from '../../constants/index';
import * as log from '../../utils/log';

const SYSTEM = NativeEnv.get('NSLocaleUsesMetricSystem') ? METRIC : IMPERIAL;
locationStore.setMetricSystem(SYSTEM);
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

type Props = {
  onSave: Function,
};

type State = {
  radius: number,
  focused: boolean,
};

@observer
class BotAddress extends React.Component {
  props: Props;
  state: State;
  @observable mounted = false;
  handler: ?Function;
  zoom: number;
  nextZoom: number;
  lat1: number;
  long1: number;
  lat2: number;
  long2: number;
  input: any;
  map: any;

  constructor(props: Props) {
    super(props);
    this.zoom = 0;
    this.nextZoom = 0;
    this.state = {radius: 30, focused: false};
  }

  componentWillMount() {
    when(
      () => botStore.bot && botStore.bot.location,
      () => {
        botStore.addressHelper = new AddressHelper(botStore.bot.location);
      },
    );

    this.handler = autorun(() => {
      if (botStore.bot && botStore.bot.location && this.map) {
        const {latitude, longitude} = botStore.bot.location;
        this.map.setCenterCoordinate(latitude, longitude);
        this.reverseGeoCode({latitude, longitude});
      }
    });
  }
  componentWillUnmount() {
    this.handler && this.handler();
  }
  componentDidMount() {
    setTimeout(() => (this.mounted = true), 500); // temporary workaround for slow react-navigation transition with Mapbox view!
  }

  onBoundsDidChange = (bounds, zoom) => {
    if (this.lat1 === bounds[0] && this.long1 === bounds[1] && this.lat2 === bounds[2] && this.long2 === bounds[3] && this.zoom === zoom) {
      return;
    }
    if (zoom < 10) {
      return;
    }
    log.log('bounds:', bounds, zoom, {level: log.levels.VERBOSE});
    this.lat1 = bounds[0];
    this.long1 = bounds[1];
    this.lat2 = bounds[2];
    this.long2 = bounds[3];
    this.zoom = zoom;
  };

  redirectToPlace = async (placeId) => {
    const res = await geocoding.details(placeId);
    this.redirectToLocation(res);
    if (res.isPlace) {
      botStore.bot.title = res.name;
    }
  };

  redirectToLocation = (coords) => {
    // reset bot address to recalculate it
    const {bot} = botStore;
    bot.addressData.clear();
    bot.address = undefined;
    bot.location = coords;
    this.reverseGeoCode(coords);
    if (botStore.addressHelper) {
      botStore.addressHelper.location = coords;
    }
    bot.isCurrent = false;
    this.setState({focused: false});
    this.input.blur();
  };

  reverseGeoCode = (coords) => {
    geocoding.reverse(coords).then((d) => {
      if (d && d.length) {
        botStore.bot.addressData.load(d[0].meta);
        botStore.bot.address = d[0].place_name;
      }
    });
  };

  render() {
    if (!botStore.addressHelper) {
      return null;
    }
    const {location, text, suggestions} = botStore.addressHelper;
    return (
      <View style={{flex: 1}}>
        {this.mounted && (
          <Map
            ref={r => (this.map = r)}
            showOnlyBot
            bot={botStore.bot}
            fullMap
            followUser={false}
            showUser
            location={location}
            isDay={locationStore.isDay}
            onBoundsDidChange={this.onBoundsDidChange}
            onPress={({nativeEvent}) => this.redirectToLocation(nativeEvent.coordinate)}
          />
        )}
        <View style={styles.imageContainer}>
          <Image source={require('../../../images/iconBotLocation.png')} />
          <TextInput
            style={styles.textInput}
            ref={r => (this.input = r)}
            clearButtonMode='while-editing'
            onFocus={() => {
              this.setState({focused: true});
            }}
            onSubmitEditing={() => this.setState({focused: false})}
            placeholderTextColor={colors.DARK_PURPLE}
            onChangeText={t => (botStore.addressHelper.text = t)}
            value={text}
          />
        </View>
        <Suggestions suggestions={suggestions} focused={this.state.focused} redirectToPlace={this.redirectToPlace} />
        {this.props.onSave && (
          <Button
            buttonStyle={{
              position: 'absolute',
              bottom: 20 * k,
              left: 90 * k,
              right: 20 * k,
            }}
            onPress={() => this.props.onSave(botStore.bot)}
          >
            Next
          </Button>
        )}
      </View>
    );
  }
}

const Suggestions = ({suggestions, focused, redirectToPlace}) => (
  <View pointerEvents='box-none' style={styles.addressListContainer}>
    {focused && (
      <View
        style={{
          height: 45 * k + 10.7 * k + (suggestions.length ? 10.7 * k + suggestions.length * 43.4 * k : 0),
        }}
      >
        <ListView
          scrollEnabled={false}
          enableEmptySections
          style={{paddingBottom: 10.7 * k}}
          pointerEvents='box-none'
          dataSource={ds.cloneWithRows(suggestions.map(x => x))}
          renderRow={row => (
            <TouchableOpacity key={`${row.id}vjew`} onPress={() => redirectToPlace(row.place_id)}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingLeft: 14 * k,
                  paddingTop: 13 * k,
                  paddingBottom: 13 * k,
                  backgroundColor: 'rgba(255,255,255,0.9)',
                }}
              >
                <Image style={{width: 14}} source={require('../../../images/iconBotLocation.png')} />
                <Text
                  style={{
                    flex: 1,
                    paddingLeft: 8.4 * k,
                    fontFamily: 'Roboto-Regular',
                    color: colors.DARK_PURPLE,
                  }}
                  numberOfLines={1}
                >
                  {row.place_name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          renderSeparator={(s, r) => (
            <View key={`${r}sep`} style={{backgroundColor: 'rgba(255,255,255,0.9)'}}>
              <Separator width={1} />
            </View>
          )}
        />
      </View>
    )}
  </View>
);

export default observer(BotAddress);

const styles = StyleSheet.create({
  imageContainer: {
    position: 'absolute',
    right: 20 * k,
    left: 61 * k,
    top: 25 * k,
    height: 44 * k,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingTop: 11 * k,
    paddingBottom: 13 * k,
    paddingLeft: 14 * k,
    paddingRight: 9 * k,
    flexDirection: 'row',
    borderRadius: 2 * k,
  },
  textInput: {
    flex: 1,
    shadowOffset: {height: 1, width: 0},
    shadowRadius: 5 * k,
    shadowOpacity: 0.12,
    paddingLeft: 8.4 * k,
    height: 20 * k,
    fontFamily: 'Roboto-Regular',
    color: colors.DARK_PURPLE,
    fontSize: 15 * k,
  },
  addressListContainer: {
    position: 'absolute',
    top: 80 * k,
    bottom: 0,
    right: 0,
    left: 0,
    paddingTop: 10.7 * k,
    paddingRight: 15 * k,
    paddingLeft: 15 * k,
  },
});

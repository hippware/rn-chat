// @flow

import React from 'react';
import {View, Image, TextInput, ListView, TouchableOpacity, Text, StyleSheet} from 'react-native';

import Map from './Map';
import location, {METRIC, IMPERIAL} from '../store/locationStore';
import {width, k} from './Global';
import {observer} from 'mobx-react/native';
import {observable, autorun, when} from 'mobx';
import NativeEnv from 'react-native-native-env';
import Separator from './Separator';
// import {Actions} from 'react-native-router-flux';
import bot from '../store/botStore';
import Address from '../model/Address';
import Button from './Button';
import geocoding from '../store/geocodingStore';
import {colors} from '../constants';
import * as log from '../utils/log';

const SYSTEM = NativeEnv.get('NSLocaleUsesMetricSystem') ? METRIC : IMPERIAL;
location.setMetricSystem(SYSTEM);
const MIN = 3;
const MAX = 300;
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

type Props = {
  onSave: Function,
};

type State = {
  radius: number,
  focused: boolean,
};

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

  constructor(props: Props) {
    super(props);
    this.zoom = 0;
    this.nextZoom = 0;
    this.state = {radius: 30, focused: false};
  }

  componentWillMount() {
    when(
      () => bot.bot && bot.bot.location,
      () => {
        bot.address = new Address(bot.bot.location);
      },
    );

    this.handler = autorun(() => {
      if (bot.bot && bot.bot.location && this.refs.map) {
        this.refs.map.setCenterCoordinate(bot.bot.location.latitude, bot.bot.location.longitude, true);
      }
    });
  }
  componentWillUnmount() {
    this.handler();
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
  };

  redirectToLocation = (coords) => {
    setTimeout(() => {
      // reset bot address to recalculate it
      bot.bot.location = coords;
      bot.bot.address = undefined;
      if (bot.address) {
        bot.address.location = coords;
      }
      bot.bot.isCurrent = false;
      this.setState({focused: false});
      this.refs.input.blur();
    });
  };

  render() {
    if (!bot.address) {
      return null;
    }
    return (
      <View style={{flex: 1}}>
        {this.mounted &&
          <Map
            ref='map'
            showOnlyBot
            bot={bot.bot}
            fullMap
            followUser={false}
            showUser
            location={bot.address.location}
            isDay={location.isDay}
            onBoundsDidChange={this.onBoundsDidChange}
            onTap={coords => this.redirectToLocation(coords)}
          />}
        <View style={styles.imageContainer}>
          <Image source={require('../../images/iconBotLocation.png')} />
          <TextInput
            style={styles.textInput}
            ref='input'
            clearButtonMode='while-editing'
            onFocus={() => {
              this.setState({focused: true});
            }}
            onSubmitEditing={() => this.setState({focused: false})}
            placeholderTextColor={colors.DARK_PURPLE}
            onChangeText={text => (bot.address.text = text)}
            value={bot.address.text}
          />
        </View>
        <View pointerEvents='box-none' style={styles.addressListContainer}>
          {this.state.focused &&
            <View
              style={{
                height: 45 * k + 10.7 * k + (bot.address.suggestions.length ? 10.7 * k + bot.address.suggestions.length * 43.4 * k : 0),
              }}
            >
              <ListView
                scrollEnabled={false}
                enableEmptySections
                style={{paddingBottom: 10.7 * k}}
                pointerEvents='box-none'
                dataSource={ds.cloneWithRows(bot.address.suggestions.map(x => x))}
                renderRow={row =>
                  (<TouchableOpacity key={`${row.id}vjew`} onPress={() => this.redirectToPlace(row.place_id)}>
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingLeft: 14 * k,
                        paddingTop: 13 * k,
                        paddingBottom: 13 * k,
                        backgroundColor: 'rgba(255,255,255,0.9)',
                      }}
                    >
                      <Image style={{width: 14}} source={require('../../images/iconBotLocation.png')} />
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
                      {/* <Text style={{width:75*k, paddingLeft:12*k}}>{row.distance}</Text>*/}
                    </View>
                  </TouchableOpacity>)}
                renderSeparator={(s, r) =>
                  (<View key={`${r}sep`} style={{backgroundColor: 'rgba(255,255,255,0.9)'}}>
                    <Separator width={1} />
                  </View>)}
              />
            </View>}
        </View>
        {this.props.onSave &&
          <Button
            buttonStyle={{
              position: 'absolute',
              bottom: 20 * k,
              left: 90 * k,
              right: 20 * k,
            }}
            onPress={() => this.props.onSave(bot.bot)}
          >
            Next
          </Button>}
      </View>
    );
  }
}

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

// @flow

import React, {Component} from 'react';
import MapView from 'react-native-maps';
import {Alert, StyleSheet, Image, View, InteractionManager, Dimensions, TouchableOpacity} from 'react-native';
import {k, width, height} from '../Global';
import {observer} from 'mobx-react/native';
import {when, observable} from 'mobx';
import locationStore from '../../store/locationStore';
import autobind from 'autobind-decorator';
import model from '../../model/model';
import {Actions} from 'react-native-router-flux';
import TransparentGradient from '../TransparentGradient';
import botStore from '../../store/botStore';
import {MessageBar, MessageBarManager} from 'react-native-message-bar';
import Bot from '../../model/Bot';
import * as log from '../../utils/log';
import RText from '../common/RText';

const DELTA_FULL_MAP = 0.048;
const DELTA_BOT_PROFILE = 0.024;

class OwnMessageBar extends MessageBar {
  componentWillReceiveProps() {}
}

import {colors} from '../../constants/index';

type Props = {
  selectedBot: Bot,
  bot: Bot,
  followUser: boolean,
  showUser: boolean,
  showOnlyBot: boolean,
  fullMap: boolean,
  location: Object,
  children: any,
};
type State = {
  selectedBot: Bot,
  followUser: boolean,
};
type RegionProps = {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  latitudeDelta: number,
};

@autobind
@observer
export default class Map extends Component<Props, State> {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  _map: any;
  _alert: any;
  loaded: boolean = false;
  handler: Function;
  @observable region;

  constructor(props: Props) {
    super(props);
    this.latitude = 0;
    this.longitude = 0;
    this.state = {selectedBot: props.selectedBot, followUser: props.followUser};
  }

  componentDidMount() {
    when(() => locationStore.location, () => {
      const {latitude, longitude} = locationStore.location;
      InteractionManager.runAfterInteractions(() => {
        if (!this.props.showOnlyBot) {
          botStore.geosearch({latitude, longitude});
        }
      });
    });
    if (!this.props.showOnlyBot) {
      if (this._alert) MessageBarManager.registerMessageBar(this._alert);
      else log.warn("Can't register message-bar ref!");
    }
  }

  componentWillUnmount() {
    if (!this.props.showOnlyBot) {
      MessageBarManager.unregisterMessageBar();
    }
    if (this.handler) {
      this.handler();
    }
  }

  componentWillReceiveProps(props: Props) {
    if (props.fullMap === false && this.state.selectedBot) {
      this.setState({selectedBot: ''});
      MessageBarManager.hideAlert();
    }
    if (props.scale !== this.props.scale && this.props.location) {
      const delta = props.scale === 0 ? DELTA_FULL_MAP : DELTA_BOT_PROFILE;
      this._map.animateToRegion({
        latitude: this.props.location.latitude,
        longitude: this.props.location.longitude,
        latitudeDelta: delta,
        longitudeDelta: delta,
      });
    }
  }

  setCenterCoordinate(latitude: number, longitude: number, fit: boolean = false) {
    if (!this._map) {
      return;
    }
    if ((this.props.bot || this.props.marker) && fit) {
      this._map.fitToCoordinates([this.props.location || this.props.bot.location, {latitude, longitude}], {
        edgePadding: {top: 100, right: 100, bottom: 100, left: 100},
        animated: true,
      });
    } else {
      this._map.animateToCoordinate({latitude, longitude});
    }
  }

  onRegionDidChange = async ({latitude, longitude, latitudeDelta, longitudeDelta}: RegionProps) => {
    console.log('onRegionDidChange', this.loaded, latitude, longitude, latitudeDelta, longitudeDelta);
    const lat = Math.abs(latitude - this.latitude) > DELTA_FULL_MAP;
    const long = Math.abs(longitude - this.longitude) > DELTA_FULL_MAP;
    const latD = Math.abs(latitudeDelta - this.latitudeDelta) > DELTA_FULL_MAP;
    const longD = Math.abs(longitudeDelta - this.longitudeDelta) > DELTA_FULL_MAP;

    // workaround for weird GoogleMaps behaviour - https://github.com/airbnb/react-native-maps/issues/964
    // related https://github.com/airbnb/react-native-maps/issues/1338
    if (!this.loaded) {
      const coords = this.props.location || locationStore.location;
      if (coords) {
        this.latitude = coords.latitude;
        this.longitude = coords.longitude;
        this.latitudeDelta = DELTA_FULL_MAP;
        this.longitudeDelta = DELTA_FULL_MAP;
        this.loaded = true;
      }
      return;
    }
    if (!this.props.showOnlyBot && (lat || long || latD || longD)) {
      this.latitude = latitude;
      this.longitude = longitude;
      this.latitudeDelta = latitudeDelta;
      this.longitudeDelta = longitudeDelta;
      MessageBarManager.hideAlert();
      InteractionManager.runAfterInteractions(() => {
        botStore.geosearch({latitude, longitude});
      });
    }
  };

  followUser() {
    navigator.geolocation.getCurrentPosition((position) => {
      locationStore.location = position.coords;
      this.setCenterCoordinate(locationStore.location.latitude, locationStore.location.longitude, true);
    });
  }

  onCurrentLocation() {
    this.followUser();
    // this.setState({followUser: true});
  }

  onOpenAnnotation({nativeEvent}) {
    if (this.props.showOnlyBot || this.props.marker) {
      return;
    }
    const {coordinate} = nativeEvent;

    const latPerPixel = this.latitudeDelta / height;
    const lngPerPixel = this.longitudeDelta / width;
    console.log(this.latitudeDelta, latPerPixel, lngPerPixel);

    const markerWidth = 30;
    const markerHeight = 50;

    const list = model.geoBots.list.slice();
    const annotation = list.find((bot) => {
      if (!bot.location) {
        return false;
      }
      const {latitude, longitude} = bot.location;

      const minLng = longitude - lngPerPixel * (markerWidth / 2);
      const maxLng = longitude + lngPerPixel * (markerWidth / 2);
      const minLat = latitude;
      const maxLat = latitude + latPerPixel * markerHeight;
      console.log(coordinate.latitude, coordinate.longitude, bot.id, minLat, maxLat, minLng, maxLng);

      return coordinate.latitude >= minLat && coordinate.latitude <= maxLat && coordinate.longitude >= minLng && coordinate.longitude <= maxLng;
    });
    if (!annotation) {
      return;
    }
    if (annotation.id === this.state.selectedBot) {
      this.setState({selectedBot: ''});
      MessageBarManager.hideAlert();
      return;
    }
    this.setState({selectedBot: annotation.id});
    const bot: Bot = annotation;
    if (!bot) {
      Alert.alert('Cannot find bot with id:', annotation.id);
    }
    MessageBarManager.showAlert({
      title: bot.title,
      titleNumberOfLines: 1,
      messageNumberOfLines: 1,
      shouldHideOnTap: false,
      message: bot.address,
      avatar: bot.image ? bot.image.source : require('../../../images/avatarNoPic.png'),
      position: 'bottom',
      titleStyle: {color: colors.DARK_PURPLE, fontSize: 18, fontFamily: 'Roboto-Medium'},
      messageStyle: {color: colors.DARK_PURPLE, fontSize: 16, fontFamily: 'Roboto-Regular'},
      avatarStyle: {height: 40, width: 40, borderRadius: 20},
      stylesheetSuccess: {backgroundColor: 'white', strokeColor: 'transparent'},
      onTapped: () => {
        MessageBarManager.hideAlert();
        this.setState({selectedBot: ''});
        Actions.botDetails({item: bot.id});
      },
      shouldHideAfterDelay: false,
      alertType: 'success',
      // See Properties section for full customization
      // Or check `index.ios.js` or `index.android.js` for a complete example
    });
  }

  render() {
    const currentLoc = locationStore.location;
    const coords = this.props.location || currentLoc;
    if (!coords) {
      return <RText>Please enable location</RText>;
    }
    // NOTE: seems dirty that this logic is in render
    this.longitude = coords.longitude;
    this.latitude = coords.latitude;
    const list = model.geoBots.list.slice();
    if (this.props.bot && list.indexOf(this.props.bot) === -1) {
      list.push(this.props.bot);
    }
    const heading = coords && coords.heading;
    const delta = this.props.fullMap ? DELTA_FULL_MAP : DELTA_BOT_PROFILE;
    const latitude = coords && coords.latitude;
    const longitude = coords && coords.longitude;
    return (
      <View style={{position: 'absolute', top: 0, bottom: this.props.scale === 0.5 ? -width / 1.5 : 0, right: 0, left: 0}}>
        <MapView
          ref={(map) => {
            this._map = map;
          }}
          style={styles.container}
          onRegionChangeComplete={this.onRegionDidChange}
          onPress={this.onOpenAnnotation}
          initialRegion={{latitude, longitude, latitudeDelta: delta, longitudeDelta: delta}}
          {...this.props}
        >
          {!this.props.maker &&
            list
              .filter(bot => (!this.props.showOnlyBot || (this.props.bot && this.props.bot.id === bot.id)) && bot.location)
              .map(bot => (
                <MapView.Marker
                  key={bot.id || 'newBot'}
                  pointerEvents='none'
                  identifier={bot.id}
                  coordinate={{latitude: bot.location.latitude, longitude: bot.location.longitude}}
                  centerOffset={{x: 0, y: -23}}
                  image={this.state.selectedBot !== bot.id ? require('../../../images/botPin.png') : require('../../../images/botpinSelected.png')}
                />
              ))}
          {this.props.marker}
          {(this.state.followUser || this.props.showUser) &&
            currentLoc && (
              <MapView.Marker pointerEvents='none' coordinate={{latitude: currentLoc.latitude, longitude: currentLoc.longitude}}>
                <View style={{transform: heading ? [{rotate: `${360 + heading} deg`}] : []}}>
                  <Image source={require('../../../images/location-indicator.png')} />
                </View>
              </MapView.Marker>
            )}
        </MapView>
        {this.props.fullMap && (
          <TouchableOpacity
            onPress={this.onCurrentLocation}
            style={{
              position: 'absolute',
              bottom: 20 * k,
              left: 15 * k,
              height: 50 * k,
              width: 50 * k,
            }}
          >
            <Image source={require('../../../images/iconCurrentLocation.png')} />
          </TouchableOpacity>
        )}
        {this.props.children}
        <OwnMessageBar
          ref={(r) => {
            // console.log('ref', r);
            // NOTE: this ref alternates between null and value...weird
            this._alert = r;
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

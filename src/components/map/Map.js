// @flow

import React, {Component} from 'react';
import MapView from 'react-native-maps';
import {Alert, StyleSheet, Image, View, InteractionManager} from 'react-native';
import {k} from '../Global';
import {observer, inject} from 'mobx-react/native';
import {observable, computed, when} from 'mobx';
import {Actions} from 'react-native-router-flux';
import {MessageBar, MessageBarManager} from 'react-native-message-bar';
import * as log from '../../utils/log';
import RText from '../common/RText';
import BotMarker from './BotMarker';
import CurrentLocationIndicator from './CurrentLocationIndicator';

const DELTA_FULL_MAP = 0.04;
const DELTA_BOT_PROFILE = 0.2;

class OwnMessageBar extends MessageBar {
  componentWillReceiveProps() {}
}

import {colors} from '../../constants/index';

type Props = {
  selectedBot?: string,
  bot?: Bot,
  followUser?: boolean,
  showUser?: boolean,
  showOnlyBot?: boolean,
  fullMap: boolean,
  location?: Object,
  children?: any,
  marker?: any,
  onMapPress?: Function,
  scale?: number,
  autoZoom?: boolean,
};

type RegionProps = {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number,
};

@inject('locationStore', 'wocky')
@observer
export default class Map extends Component<Props> {
  static defaultProps = {
    autoZoom: true,
  };

  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  _map: any;
  _alert: any;
  loaded: boolean = false;
  handler: Function;
  @observable selectedBot: string;
  @observable followUser: boolean;
  @observable markerSelected: boolean = false;

  @computed
  get list(): Array<any> {
    const {wocky, bot} = this.props;
    const list = (wocky.geoBots && wocky.geoBots.values()) || [];

    if (bot && list.indexOf(bot) === -1) {
      list.push(bot);
    }
    return list
      .filter(bot => (!this.props.showOnlyBot || (this.props.bot && this.props.bot.id === bot.id)) && bot && bot.location)
      .map(bot => <BotMarker key={this.selectedBot === bot.id ? 'selected' : bot.id || 'newBot'} scale={0} bot={bot} onImagePress={this.onOpenAnnotation} />);
  }

  constructor(props: Props) {
    super(props);
    this.latitude = 0;
    this.longitude = 0;
    this.selectedBot = props.selectedBot || '';
    this.followUser = props.followUser;
  }

  componentDidMount() {
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

  componentWillReceiveProps(newProps: Props) {
    if (newProps.fullMap === false && this.selectedBot) {
      this.selectedBot = '';
      MessageBarManager.hideAlert();
    }
    if (this.props.location && newProps.location && this.props.location !== newProps.location) {
      this.goToCoords(newProps);
    }
    // center bot for scale > 0
    if (newProps.scale && newProps.scale !== this.props.scale && this.props.bot && this.props.bot.location) {
      this.goToCoords({location: this.props.bot.location});
    }
  }

  goToCoords = ({scale, location, autoZoom}) => {
    const config = {
      latitude: location.latitude,
      longitude: location.longitude,
    };
    if (autoZoom) {
      const delta = scale === 0 ? DELTA_FULL_MAP : DELTA_BOT_PROFILE;
      config.latitudeDelta = delta;
      config.longitudeDelta = delta;
    }
    this._map.animateToRegion(config);
  };

  setCenterCoordinate = (latitude: number, longitude: number, fit: boolean = false) => {
    if (!this._map) {
      return;
    }
    if (((this.props.bot && this.props.bot.location) || (this.props.location && this.props.marker)) && fit) {
      this._map.fitToCoordinates([this.props.location || this.props.bot.location, {latitude, longitude}], {
        edgePadding: {top: 100, right: 100, bottom: 100, left: 100},
        animated: true,
      });
    } else {
      this._map.animateToCoordinate({latitude, longitude});
    }
  };

  onRegionDidChange = async ({latitude, longitude, latitudeDelta, longitudeDelta}: RegionProps) => {
    log.log('onRegionDidChange', latitude, longitude, latitudeDelta, longitudeDelta);
    if (!this.props.showOnlyBot) {
      this.latitude = latitude;
      this.longitude = longitude;
      this.latitudeDelta = latitudeDelta;
      this.longitudeDelta = longitudeDelta;
      InteractionManager.runAfterInteractions(() => {
        this.selectedBot = '';
        MessageBarManager.hideAlert();
        // rough radius calculation - one latitude is 111km
        this.props.wocky.geosearch({latitude, longitude, latitudeDelta, longitudeDelta});
      });
    }
  };

  goToUser = async () => {
    const {locationStore} = this.props;
    const {location, loading} = locationStore;
    when(() => !loading && location, () => this.setCenterCoordinate(locationStore.location.latitude, locationStore.location.longitude, true));
  };

  onCurrentLocation = () => {
    this.goToUser();
    this.followUser = true;
  };

  onOpenAnnotation = ({nativeEvent}) => {
    if (this.props.showOnlyBot || this.props.marker) {
      return;
    }

    const list = this.props.wocky.geoBots.values();

    const annotation = list.find(bot => nativeEvent.id === bot.id);
    if (!annotation) {
      return;
    }
    if (annotation.id === this.selectedBot) {
      this.selectedBot = '';
      MessageBarManager.hideAlert();
      return;
    }
    this.selectedBot = annotation.id;
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
        this.selectedBot = '';
        Actions.botDetails({item: bot.id});
      },
      shouldHideAfterDelay: false,
      alertType: 'success',
      // See Properties section for full customization
      // Or check `index.ios.js` or `index.android.js` for a complete example
    });
  };

  onPress = () => {
    if (this.props.onMapPress) {
      setTimeout(() => !this.markerSelected && this.props.onMapPress());
    }
  };

  onMarkerSelect = () => {
    this.markerSelected = true;
    setTimeout(() => (this.markerSelected = false), 100);
  };

  render() {
    const {locationStore, location, showUser} = this.props;
    const currentLoc = locationStore.location;
    const coords = location || currentLoc;
    if (!coords) {
      return <RText>Please enable location</RText>;
    }
    // NOTE: seems dirty that this logic is in render
    this.longitude = coords.longitude;
    this.latitude = coords.latitude;
    const heading = coords && coords.heading;
    const delta = this.props.fullMap ? DELTA_FULL_MAP : DELTA_BOT_PROFILE;
    const latitude = coords && coords.latitude;
    const longitude = coords && coords.longitude;
    return (
      <View style={{position: 'absolute', top: 0, bottom: this.props.scale === 0.5 ? -210 * k : 0, right: 0, left: 0}}>
        <MapView
          ref={(map) => {
            this._map = map;
          }}
          onPress={this.onPress}
          onMarkerSelect={this.onMarkerSelect}
          style={styles.container}
          onRegionChangeComplete={this.onRegionDidChange}
          initialRegion={{latitude, longitude, latitudeDelta: delta, longitudeDelta: delta}}
          {...this.props}
        >
          {!this.props.marker && this.list}
          {this.props.marker}
          {(this.followUser || showUser) &&
            currentLoc && (
              <MapView.Marker pointerEvents='none' style={{zIndex: 1}} coordinate={{latitude: currentLoc.latitude, longitude: currentLoc.longitude}}>
                <View style={{transform: heading ? [{rotate: `${360 + heading} deg`}] : []}}>
                  <Image source={require('../../../images/location-indicator.png')} />
                </View>
              </MapView.Marker>
            )}
        </MapView>
        {this.props.fullMap && <CurrentLocationIndicator onPress={this.onCurrentLocation} />}
        {this.props.children}
        <OwnMessageBar
          ref={(r) => {
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

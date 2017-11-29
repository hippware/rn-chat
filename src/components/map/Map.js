// @flow

import React, {Component} from 'react';
import MapView from 'react-native-maps';
import {Alert, StyleSheet, Image, View, InteractionManager, TouchableOpacity} from 'react-native';
import {k, width, height} from '../Global';
import {observer} from 'mobx-react/native';
import {when, observable} from 'mobx';
import locationStore from '../../store/locationStore';
import autobind from 'autobind-decorator';
import model from '../../model/model';
import {Actions} from 'react-native-router-flux';
import botStore from '../../store/botStore';
import {MessageBar, MessageBarManager} from 'react-native-message-bar';
import Bot from '../../model/Bot';
import * as log from '../../utils/log';
import RText from '../common/RText';
import BotMarker from './BotMarker';

const DELTA_FULL_MAP = 0.04;
const DELTA_BOT_PROFILE = 0.2;

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
  marker: any,
  onMapPress: Function,
  scale: number,
};
type State = {
  selectedBot: Bot,
  followUser: boolean,
};
type RegionProps = {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number,
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
    if (newProps.fullMap === false && this.state.selectedBot) {
      this.setState({selectedBot: ''});
      MessageBarManager.hideAlert();
    }
    if (newProps.scale !== this.props.scale && this.props.location) {
      this.goToCoords(newProps);
    }
    if (newProps.location && !this.props.location) {
      this.goToCoords(newProps);
    }
  }

  goToCoords = ({scale, location}) => {
    const delta = scale === 0 ? DELTA_FULL_MAP : DELTA_BOT_PROFILE;
    this._map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: delta,
      longitudeDelta: delta,
    });
  };

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
    log.log('onRegionDidChange', latitude, longitude, latitudeDelta, longitudeDelta);
    if (!this.props.showOnlyBot) {
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
    const list = model.geoBots.list.slice();
    const annotation = list.find(bot => nativeEvent.id === bot.id);
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
          onPress={() => setTimeout(() => !this.markerSelected && this.props.onMapPress && this.props.onMapPress())}
          onMarkerSelect={() => {
            this.markerSelected = true;
            setTimeout(() => (this.markerSelected = false), 100);
          }}
          style={styles.container}
          onRegionChangeComplete={this.onRegionDidChange}
          initialRegion={{latitude, longitude, latitudeDelta: delta, longitudeDelta: delta}}
          {...this.props}
        >
          {!this.props.marker &&
            list
              .filter(bot => (!this.props.showOnlyBot || (this.props.bot && this.props.bot.id === bot.id)) && bot && bot.location)
              .map(bot => <BotMarker key={bot.id || 'newBot'} scale={0} bot={bot} onImagePress={this.onOpenAnnotation} />)}
          {this.props.marker}
          {(this.state.followUser || this.props.showUser) &&
            currentLoc && (
              <MapView.Marker pointerEvents='none' style={{zIndex: 1}} coordinate={{latitude: currentLoc.latitude, longitude: currentLoc.longitude}}>
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

// @flow

import React, {Component} from 'react';
import MapView from 'react-native-maps';
import {StyleSheet, Image, View, Dimensions, TouchableOpacity} from 'react-native';
import {k} from './Global';
import {observer} from 'mobx-react/native';
import {when, observable} from 'mobx';
import locationStore from '../store/locationStore';
import autobind from 'autobind-decorator';
import model from '../model/model';
import {Actions} from 'react-native-router-flux';
import TransparentGradient from './TransparentGradient';
import botStore from '../store/botStore';
import {MessageBar, MessageBarManager} from 'react-native-message-bar';
import Bot from '../model/Bot';
import * as log from '../utils/log';

class OwnMessageBar extends MessageBar {
  componentWillReceiveProps() {}
}
import {colors} from '../constants';

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
export default class Map extends Component {
  props: Props;
  state: State;

  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  _map: any;
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
    navigator.geolocation.getCurrentPosition((position) => {
      locationStore.location = position.coords;
    });
    if (!this.props.showOnlyBot) {
      MessageBarManager.registerMessageBar(this.refs.alert);
    }
    // if (this.state.followUser) {
    //   this.followUser();
    // }
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
  }

  setCenterCoordinate(latitude: number, longitude: number, fit: boolean = false) {
    if (this.props.bot && fit) {
      this._map.fitToCoordinates([this.props.bot.location, {latitude, longitude}],
        {edgePadding: {top: 100, right: 100, bottom: 100, left: 100}, animated: true});
    } else {
      this._map.animateToCoordinate({latitude, longitude});
    }
  }

  onRegionDidChange = async ({latitude, longitude, latitudeDelta, longitudeDelta}: RegionProps) => {
    const lat = Math.abs(latitude - this.latitude) > 0.003;
    const long = Math.abs(longitude - this.longitude) > 0.003;
    const latD = Math.abs(latitudeDelta - this.latitudeDelta) > 0.003;
    const longD = Math.abs(longitudeDelta - this.longitudeDelta) > 0.003;

    // workaround for weird behaviourr - https://github.com/airbnb/react-native-maps/issues/964
    // related https://github.com/airbnb/react-native-maps/issues/1338
    if (!this.loaded) {
      const coords = this.props.location || locationStore.location;
      latitude = coords.latitude;
      longitude = coords.longitude;
      latitudeDelta = 0.003;
      longitudeDelta = 0.003;
      this._map.animateToRegion({latitude, longitude, latitudeDelta, longitudeDelta});
      this.loaded = true;
      return;
    }
    if (!this.props.showOnlyBot && (lat || long || latD || longD)) {
      this.latitude = latitude;
      this.longitude = longitude;
      this.latitudeDelta = latitudeDelta;
      this.longitudeDelta = longitudeDelta;
      MessageBarManager.hideAlert();
      botStore.geosearch({latitude, longitude});
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
    //this.setState({followUser: true});
  }

  onOpenAnnotation({nativeEvent}) {
    if (this.props.showOnlyBot) {
      return;
    }
    const annotation = nativeEvent;
    if (annotation.id === this.state.selectedBot) {
      this.setState({selectedBot: ''});
      MessageBarManager.hideAlert();
      return;
    }
    this.setState({selectedBot: annotation.id});
    const bot: Bot = model.geoBots.list.find((b: Bot) => b.id === annotation.id);
    if (!bot) {
      alert('Cannot find bot with id:', annotation.id);
      return;
    }
    MessageBarManager.showAlert({
      title: bot.title,
      titleNumberOfLines: 1,
      messageNumberOfLines: 1,
      shouldHideOnTap: false,
      message: bot.address,
      avatar: bot.image ? bot.image.source : require('../../images/avatarNoPic.png'),
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
    this.longitude = coords.longitude;
    this.latitude = coords.latitude;
    const list = model.geoBots.list.slice();
    if (this.props.bot && list.indexOf(this.props.bot) === -1) {
      list.push(this.props.bot);
    }
    const heading = coords && coords.heading;
    return (
      <View style={{position: 'absolute', top: 0, bottom: 0, right: 0, left: 0}}>
        <MapView
          ref={(map) => {
            this._map = map;
          }}
          style={styles.container}
          onRegionChangeComplete={this.onRegionDidChange}
          onMarkerPress={this.onOpenAnnotation}
          initialRegion={{...coords, latitudeDelta: 0.003, longitudeDelta: 0.003}}
          {...this.props}
        >
          {(this.state.followUser || this.props.showUser) &&
            currentLoc && (
              <MapView.Marker coordinate={{latitude: currentLoc.latitude, longitude: currentLoc.longitude}}>
                <View style={{transform: heading ? [{rotate: `${360 + heading} deg`}] : []}}>
                  <Image source={require('../../images/location-indicator.png')} />
                </View>
              </MapView.Marker>
            )}
          {!this.props.maker && list
            .filter(bot => (!this.props.showOnlyBot || this.props.bot.id === bot.id) && bot.location)
            .map(bot => (
              <MapView.Marker
                key={bot.id || 'newBot'}
                identifier={bot.id}
                coordinate={{latitude: bot.location.latitude, longitude: bot.location.longitude}}
                image={this.state.selectedBot !== bot.id ? require('../../images/botpin_positioned.png') :
                  require('../../images/botpin_positioned_selected.png')}
              />
            ))
          }
          {this.props.marker && <MapView.Marker identifier='marker' anchor={{x: 0.5, y: 0.5}} coordinate={{latitude: this.props.location.latitude, longitude: this.props.location.longitude}}>
            {this.props.marker}
          </MapView.Marker>}
        </MapView>
        {!this.props.marker && <TouchableOpacity
          onPress={this.onCurrentLocation}
          style={{
            position: 'absolute',
            bottom: 20 * k,
            left: 15 * k,
            height: 50 * k,
            width: 50 * k,
          }}
        >
          <Image source={require('../../images/iconCurrentLocation.png')} />
        </TouchableOpacity>}
        {this.props.children}
        <OwnMessageBar ref='alert' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

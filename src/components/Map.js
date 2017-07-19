// @flow

import React, {Component} from 'react';
import Mapbox, {MapView, Annotation} from 'react-native-mapbox-gl';
import {StyleSheet, Image, View, Dimensions, TouchableOpacity} from 'react-native';
import {k} from './Global';
import {observer} from 'mobx-react/native';
import {autorun} from 'mobx';
import locationStore from '../store/locationStore';

const {height} = Dimensions.get('window');
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

Mapbox.setAccessToken('pk.eyJ1IjoiaGlwcHdhcmUiLCJhIjoiY2ozZGhyaDQzMDAweTJ3bXIyOGo2amgyeiJ9.JYhsKJjFYNWJzhNv7sj5EA');
Mapbox.setMetricsEnabled(false);

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
  zoomLevel: number,
  direction: any,
  pitch: any,
  animated: boolean,
};

@autobind
@observer
export default class Map extends Component {
  props: Props;
  state: State;

  latitude: number;
  longitude: number;
  zoomLevel: number;
  _map: any;
  handler: Function;

  constructor(props: Props) {
    super(props);
    this.latitude = 0;
    this.longitude = 0;
    this.zoomLevel = 0;
    this.state = {selectedBot: props.selectedBot, followUser: props.followUser};
  }

  componentDidMount() {
    if (!this.props.showOnlyBot) {
      MessageBarManager.registerMessageBar(this.refs.alert);
    }
    if (this.state.followUser) {
      this.followUser();
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
  }

  setCenterCoordinate(latitude: number, longitude: number, animated: boolean = true, callback: Function) {
    return this._map.setCenterCoordinate(latitude, longitude, animated, callback);
  }

  setVisibleCoordinateBounds(
    latitudeSW: number,
    longitudeSW: number,
    latitudeNE: number,
    longitudeNE: number,
    paddingTop: number = 0,
    paddingRight: number = 0,
    paddingBottom: number = 0,
    paddingLeft: number = 0,
    animated: boolean = true,
  ) {
    log.log('&&& SET VISIBLE COORDINATES', latitudeSW, longitudeSW, latitudeNE, longitudeNE, paddingTop, paddingRight, paddingBottom, paddingLeft, animated, {
      level: log.levels.INFO,
    });
    this._map.setVisibleCoordinateBounds(latitudeSW, longitudeSW, latitudeNE, longitudeNE, paddingTop, paddingRight, paddingBottom, paddingLeft, animated);
  }

  setZoomLevel(zoomLevel: number, animated: boolean = true, callback: Function) {
    this._map.setZoomLevel(zoomLevel, animated, callback);
  }

  onRegionDidChange = async ({latitude, longitude, zoomLevel, direction, pitch, animated}: RegionProps) => {
    if (!this.props.showOnlyBot && (Math.abs(this.latitude - latitude) > 0.000001 || Math.abs(this.longitude - longitude) > 0.000001 || this.zoomLevel !== zoomLevel)) {
      this.latitude = latitude;
      this.longitude = longitude;
      this.zoomLevel = zoomLevel;
      MessageBarManager.hideAlert();
      botStore.geosearch({latitude, longitude});
    }
  };

  followUser() {
    if (!this.handler) {
      this.handler = autorun(() => {
        const coords = locationStore.location;
        if (this._map && coords) {
          this._map.setCenterCoordinate(coords.latitude, coords.longitude);
        }
      });
    }
    const {location} = locationStore;
    if (location) {
      const {latitude, longitude} = location;
      this._map.setCenterCoordinate(latitude, longitude);
      this._map.getBounds((bounds) => {
        if (this.state.followUser && this.props.bot) {
          const {bot} = this.props;
          if (!(latitude >= bounds[0] && latitude <= bounds[2] && longitude >= bounds[1] && longitude <= bounds[3])) {
            const deltaLat = bot.location.latitude - latitude;
            const deltaLong = bot.location.longitude - longitude;

            const latMin = Math.min(latitude - deltaLat, latitude + deltaLat);
            const latMax = Math.max(latitude - deltaLat, latitude + deltaLat);
            const longMin = Math.min(longitude - deltaLong, longitude + deltaLong);
            const longMax = Math.max(longitude - deltaLong, longitude + deltaLong);
            log.log(
              '&&& OUT OF BOUNDS!',
              bounds,
              JSON.stringify(location),
              latitude >= bounds[0],
              latitude <= bounds[2],
              longitude >= bounds[1],
              longitude <= bounds[3],
              deltaLat,
              deltaLong,
              latMin,
              longMin,
              latMax,
              longMax,
              {level: log.levels.ERROR},
            );
            this.setVisibleCoordinateBounds(latMin, longMin, latMax, longMax, 50, 50, 50, 50, true);
          }
        }
      });
    }
  }

  onCurrentLocation() {
    this.followUser();
    this.setState({followUser: true});
  }

  onOpenAnnotation(annotation: Object) {
    if (this.props.showOnlyBot) {
      return;
    }
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
        // MessageBarManager.hideAlert();
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
    const coords = this.state.followUser ? currentLoc : this.props.location;
    const list = model.geoBots.list.filter(bot => bot.loaded);
    if (this.props.bot) {
      list.push(this.props.bot);
    }
    const annotations = list.filter(bot => !this.props.showOnlyBot || this.props.bot.id === bot.id).map((bot) => {
      return {
        coordinates: [bot.location.latitude, bot.location.longitude],
        type: 'point',
        annotationImage: {
          source: {
            uri: this.state.selectedBot === bot.id ? 'selectedPin' : 'botPinNew',
          },
          height: 96,
          width: 87,
        },
        id: bot.id || 'newBot',
      };
    });
    const heading = coords && coords.heading;
    return (
      <View style={{position: 'absolute', top: 0, bottom: 0, right: 0, left: 0}}>
        {coords &&
          <MapView
            ref={(map) => {
              this._map = map;
            }}
            style={styles.container}
            initialDirection={0}
            logoIsHidden
            scrollEnabled
            zoomEnabled
            styleURL={'mapbox://styles/hippware/cj3dia78l00072rp4qzu44110'}
            userTrackingMode={Mapbox.userTrackingMode.none}
            initialCenterCoordinate={coords}
            contentInset={this.props.fullMap ? [0, 0, 0, 0] : [-height / 1.5, 0, 0, 0]}
            compassIsHidden={false}
            attributionButtonIsHidden
            showsUserLocation={false}
            initialZoomLevel={17}
            onRegionDidChange={this.onRegionDidChange}
            annotations={annotations}
            onOpenAnnotation={this.onOpenAnnotation}
            {...this.props}
          >
            {(this.state.followUser || this.props.showUser) &&
              currentLoc &&
              <Annotation
                id='current'
                coordinate={{
                  latitude: currentLoc.latitude,
                  longitude: currentLoc.longitude,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <View
                    style={{
                      transform: heading ? [{rotate: `${360 + heading} deg`}] : [],
                    }}
                  >
                    <Image source={require('../../images/location-indicator.png')} />
                  </View>
                </View>
              </Annotation>}
            {this.props.children}
          </MapView>}
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
          <Image source={require('../../images/iconCurrentLocation.png')} />
        </TouchableOpacity>
        {!this.props.fullMap &&
          <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
            <TransparentGradient isDay={locationStore.isDay} style={{height: 191 * k}} />
          </View>}
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

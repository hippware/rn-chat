import React from 'react';
import Mapbox, { MapView, Annotation } from 'react-native-mapbox-gl';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    StatusBarIOS,
    View,
    Dimensions,
    TouchableOpacity,
    InteractionManager,
    } from 'react-native';
import {k} from './Global';
import assert from 'assert';
import {observer} from "mobx-react/native";
import {autorun, observable} from 'mobx';
import location from '../store/location';
const {height, width} = Dimensions.get('window');
Mapbox.setAccessToken('pk.eyJ1Ijoia2lyZTcxIiwiYSI6IjZlNGUyYmZhZGZmMDI3Mzc4MmJjMzA0MjI0MjJmYTdmIn0.xwgkCT1t-WCtY9g0pEH1qA');
const CURRENT = 'current';
import autobind from 'autobind-decorator';

function getAnnotation(coords){
    return {
        coordinate: {latitude: coords.latitude, longitude: coords.longitude},
        title: '',
        type: 'point',
        id: CURRENT,
        annotationImage:{
            source:{uri:'location-indicator'},
//            url:'rotatedImage!'+coords.heading+'!location-indicator',
            height:40*k,
            width:40*k
        }
    }
}

@autobind
@observer
export default class Map extends React.Component {
    @observable location;
    
    onRegionDidChange(location) {
      this._map.getBounds(bounds=>{
          this.props.onBoundsDidChange && this.props.onBoundsDidChange(bounds, location.zoomLevel);
      })
    }
    
    setCenterCoordinate(latitude, longitude, animated = true, callback) {
        return this._map.setCenterCoordinate(latitude, longitude, animated, callback);
    }
    setZoomLevel(zoomLevel, animated = true, callback) {
        this._map.setZoomLevel(zoomLevel, animated, callback);
    }
    
    componentDidMount(){
        if (this.props.followUser){
            this.handler = autorun(()=> {
                const coords = location.location;
                if (this._map && coords) {
                    this._map.setCenterCoordinate(coords.latitude, coords.longitude)
                }
            });
        }
    }
    
    componentWillUnmount(){
        if (this.handler){
            this.handler();
        }
        // <View style={{transform: heading ? [{rotate: `${360+heading} deg`}] : []}}>
        //     <Image source={require('../../images/location-indicator.png')}/>
        // </View>
    }
    
    render() {
        const isDay = location.isDay;
        const coords = this.props.followUser ? location.location : this.props.location;
        const heading = coords && coords.heading;
        console.log("MAP COORDS", JSON.stringify(coords));
        return (<View style={{position:'absolute',top:0,bottom:0,right:0,left:0}}>
            {coords && <MapView
                    ref={map => { this._map = map; }}
                    style={styles.container}
                    initialDirection={0}
                    logoIsHidden={true}
                    scrollEnabled={true}
                    zoomEnabled={true}
                    styleURL={isDay ? "mapbox://styles/kire71/cil41aiwc005l9fm1b2om6ecr" : "mapbox://styles/kire71/cijvygh6q00j794kqtx21ffab"}
                    //mapbox://styles/kire71/cijvygh6q00j794kqtx21ffab
                    userTrackingMode={ Mapbox.userTrackingMode.none }
                    initialCenterCoordinate={coords}
                    contentInset={this.props.fullMap ? [0,0,0,0]:[-height/1.5,0,0,0]}
                    compassIsHidden={false}
                    showsUserLocation={false}
                    initialZoomLevel={17}
              {...this.props}
                    onRegionChange={this.onRegionChange}
                    onRegionWillChange={this.onRegionWillChange}
                    onOpenAnnotation={this.onOpenAnnotation}
                    onRightAnnotationTapped={this.onRightAnnotationTapped}
                    onRegionDidChange={this.onRegionDidChange}
                    onUpdateUserLocation={this.onUpdateUserLocation}
                    onLongPress={this.onLongPress}
              >
                {this.props.followUser && <Annotation id="current" coordinate={{latitude: coords.latitude, longitude: coords.longitude}}>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}><Image source={require('../../images/location-indicator.png')}/></View>
                    </Annotation>}
              {this.props.children}
                  </MapView>}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

'use strict';

var React = require('react-native');
var Mapbox = require('react-native-mapbox-gl');
var mapRef = 'mapRef';
var {
    AppRegistry,
    StyleSheet,
    Text,
    StatusBarIOS,
    View,
    InteractionManager,
    } = React;
import {k} from '../globals';
import {setDate, setLocation} from '../actions/location';
import { connect } from 'react-redux';

const CURRENT = 'current';

function getAnnotation(coords){
    return {
        coordinates: [coords.latitude,coords.longitude],
        type: 'point',
        id: CURRENT,
        annotationImage:{
            url:'rotatedImage!'+coords.heading+'!location-indicator',
            height:30*k,
            width:30*k
        }
    }
}
const Map = React.createClass({
    mixins: [Mapbox.Mixin],
    componentDidMount: function() {
        // run each minute time update
        const updateTime = ()=>this.props.dispatch(setDate(new Date()));
        InteractionManager.runAfterInteractions(updateTime);
        this.timer = setInterval(()=>InteractionManager.runAfterInteractions(updateTime),1000*60);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.props.dispatch(setLocation(position.coords.latitude, position.coords.longitude));
                if (this.refs[mapRef]){
                    this.updateAnnotation(mapRef, getAnnotation(position.coords));
                }
            },
            (error) => console.log(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
        this.watchID = navigator.geolocation.watchPosition((position) => {
            InteractionManager.runAfterInteractions(()=>{
                this.props.dispatch(setLocation(position.coords.latitude, position.coords.longitude));
                this.setState({center:{latitude:position.coords.latitude, longitude:position.coords.longitude}});
                if (this.refs[mapRef]){
                    this.updateAnnotation(mapRef, getAnnotation(position.coords));
                }
            });
        },()=>{}, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
    },

    componentWillUnmount: function() {
        navigator.geolocation.clearWatch(this.watchID);
        clearInterval(this.timer);
    },

    getInitialState() {
        let state = {
            height:0,
            zoom: 10,
        };
        if (this.props.location.latitude && this.props.location.longitude){
            state.center = this.props.location;
        }
        return state;
    },
    onRegionChange(location) {
        //this.setState({ currentZoom: location.zoom });
    },
    onRegionWillChange(location) {
        //console.log(location);
    },
    onUpdateUserLocation(location) {
        //console.log(location);
    },
    onOpenAnnotation(annotation) {
        //console.log(annotation);
    },
    onRightAnnotationTapped(e) {
        //console.log(e);
    },
    onLongPress(location) {
        console.log('long pressed', location);
    },
    shouldComponentUpdate(props,state){
        if (!this.state.location || (props.location.latitude != this.state.center.latitude || props.location.longitude != this.state.center.longitude)){
            return true;
        }
        return false;
    },
    render: function() {
        return (
            <View onLayout={({nativeEvent})=>{if (nativeEvent.layout.y==0) this.setState({height:nativeEvent.layout.height})}}
                  style={{position:'absolute',top:this.props.full ? 0 : -2*this.state.height/3,bottom:0,right:0,left:0}}>
                {this.state.center && <Mapbox
                    style={styles.container}
                    direction={0}
                    rotateEnabled={false}
                    scrollEnabled={true}
                    zoomEnabled={false}
                    ref={mapRef}
                    accessToken={'pk.eyJ1Ijoia2lyZTcxIiwiYSI6IjZlNGUyYmZhZGZmMDI3Mzc4MmJjMzA0MjI0MjJmYTdmIn0.xwgkCT1t-WCtY9g0pEH1qA'}
                    styleURL={this.props.location.isDay ? "mapbox://styles/kire71/cil41aiwc005l9fm1b2om6ecr" : "mapbox://styles/kire71/cijvygh6q00j794kqtx21ffab"}
                    //mapbox://styles/kire71/cijvygh6q00j794kqtx21ffab
                    userTrackingMode={this.userTrackingMode.none}
                    centerCoordinate={this.state.center}
                    showsUserLocation={false}
                    zoomLevel={11}
                    onRegionChange={this.onRegionChange}
                    onRegionWillChange={this.onRegionWillChange}
                    onOpenAnnotation={this.onOpenAnnotation}
                    onRightAnnotationTapped={this.onRightAnnotationTapped}
                    onUpdateUserLocation={this.onUpdateUserLocation}
                    onLongPress={this.onLongPress} />}
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default connect(state=>state)(Map)
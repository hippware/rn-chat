'use strict';

var React = require('react-native');
var Mapbox = require('react-native-mapbox-gl');
var mapRef = 'mapRef';
var {
    AppRegistry,
    StyleSheet,
    Text,
    StatusBarIOS,
    View
    } = React;
import {k,isDay} from '../globals';
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
export default React.createClass({
    mixins: [Mapbox.Mixin],
    componentDidMount: function() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var initialPosition = JSON.stringify(position);
                this.setState({center:{latitude:position.coords.latitude, longitude:position.coords.longitude}});
                this.updateAnnotation(mapRef, getAnnotation(position.coords));
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
        this.watchID = navigator.geolocation.watchPosition((position) => {
            var lastPosition = JSON.stringify(position);
            //console.log("LAST POSITION:", lastPosition);
            this.setState({center:{latitude:position.coords.latitude, longitude:position.coords.longitude}});
            this.updateAnnotation(mapRef, getAnnotation(position.coords));
        },()=>{}, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
    },

    componentWillUnmount: function() {
        navigator.geolocation.clearWatch(this.watchID);
    },

    getInitialState() {
        return {
            height:0,
            zoom: 10,
        };
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
    componentWillUpdate(props){
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
                    styleURL={isDay() ? "mapbox://styles/kire71/cil41aiwc005l9fm1b2om6ecr" : "mapbox://styles/kire71/cijvygh6q00j794kqtx21ffab"}
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
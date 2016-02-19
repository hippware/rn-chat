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
import {isDay} from '../globals';

export default React.createClass({
    mixins: [Mapbox.Mixin],
    componentDidMount: function() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var initialPosition = JSON.stringify(position);
                console.log("POSITION:"+initialPosition);
                this.setState({center:position.coords});
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
        this.watchID = navigator.geolocation.watchPosition((position) => {
            var lastPosition = JSON.stringify(position);
            console.log("LAST POSITION:", lastPosition);
            this.setState({center:position.coords, annotations:[{
                coordinates: [position.coords.latitude,position.coords.longitude],
                type: 'point',
                id: 'foo',
                annotationImage:{
                    url:'rotatedImage!'+position.coords.heading+'!location-indicator',
                    height:20,
                    width:20
                }
            }]});
        },()=>{}, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
    },

    componentWillUnmount: function() {
        navigator.geolocation.clearWatch(this.watchID);
    },

    getInitialState() {
        return {
            center: {
                latitude: 40.72052634,
                longitude: -73.97686958312988
            },
            zoom: 10,
        };
    },
    onRegionChange(location) {
        this.setState({ currentZoom: location.zoom });
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
        //console.log('long pressed', location);
    },
    render: function() {
        return (
            <View style={styles.container}>
                <Mapbox
                    style={styles.container}
                    direction={0}
                    rotateEnabled={false}
                    scrollEnabled={true}
                    zoomEnabled={true}
                    ref={mapRef}
                    accessToken={'pk.eyJ1Ijoia2lyZTcxIiwiYSI6IjZlNGUyYmZhZGZmMDI3Mzc4MmJjMzA0MjI0MjJmYTdmIn0.xwgkCT1t-WCtY9g0pEH1qA'}
                    styleURL={isDay() ? "mapbox://styles/kire71/cijvyhj9s00j894kqnpc4xs8n" : "mapbox://styles/kire71/cijvygh6q00j794kqtx21ffab"}
                    //mapbox://styles/kire71/cijvygh6q00j794kqtx21ffab
                    userTrackingMode={this.userTrackingMode.none}
                    centerCoordinate={this.state.center}
                    zoomLevel={11}
                    onRegionChange={this.onRegionChange}
                    onRegionWillChange={this.onRegionWillChange}
                    annotations={this.state.annotations}
                    onOpenAnnotation={this.onOpenAnnotation}
                    onRightAnnotationTapped={this.onRightAnnotationTapped}
                    onUpdateUserLocation={this.onUpdateUserLocation}
                    onLongPress={this.onLongPress} />
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
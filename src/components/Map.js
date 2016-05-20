var React = require('react');
var Mapbox = require('react-native-mapbox-gl');
var mapRef = 'mapRef';
import {
    AppRegistry,
    StyleSheet,
    Text,
    StatusBarIOS,
    View,
    InteractionManager,
    } from 'react-native';
import {k} from '../globals';
import { connect } from 'react-redux';

const CURRENT = 'current';

function getAnnotation(coords){
    return {
        coordinates: [coords.latitude,coords.longitude],
        type: 'point',
        id: CURRENT,
        annotationImage:{
            url:'rotatedImage!'+coords.heading+'!location-indicator',
            height:40*k,
            width:40*k
        }
    }
}
const Map = React.createClass({
    mixins: [Mapbox.Mixin],
    componentDidMount: function() {
        // subscribe to location service
    },

    getInitialState() {
        let state = {
            height:0,
            zoom: 10,
        };
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
    render: function() {
        console.log("RERENDER MAP, location:", this.props.location);
        return (
            <View onLayout={({nativeEvent})=>{if (nativeEvent.layout.y==0) this.setState({height:nativeEvent.layout.height})}}
                  style={{position:'absolute',top:0,bottom:0,right:0,left:0}}>
                {this.props.location && this.props.location.latitude && <Mapbox
                    style={styles.container}
                    direction={0}
                    logoIsHidden={true}
                    rotateEnabled={false}
                    scrollEnabled={true}
                    zoomEnabled={false}
                    ref={mapRef}
                    annotations={[getAnnotation(this.props.location)]}
                    accessToken={'pk.eyJ1Ijoia2lyZTcxIiwiYSI6IjZlNGUyYmZhZGZmMDI3Mzc4MmJjMzA0MjI0MjJmYTdmIn0.xwgkCT1t-WCtY9g0pEH1qA'}
                    styleURL={this.props.location.isDay ? "mapbox://styles/kire71/cil41aiwc005l9fm1b2om6ecr" : "mapbox://styles/kire71/cijvygh6q00j794kqtx21ffab"}
                    //mapbox://styles/kire71/cijvygh6q00j794kqtx21ffab
                    userTrackingMode={this.userTrackingMode.none}
                    centerCoordinate={this.props.location}
                    contentInset={this.props.fullMap ? [0,0,0,0]:[-this.state.height/1.5,0,0,0]}
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

export default connect(state=>({location:state.location}))(Map)
//export default Map
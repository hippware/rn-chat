import React from 'react';
import Mapbox, { MapView } from 'react-native-mapbox-gl';
import {
    AppRegistry,
    StyleSheet,
    Text,
    StatusBarIOS,
    View,
    Dimensions,
    InteractionManager,
    } from 'react-native';
import {k} from './Global';
import assert from 'assert';
import {observer} from "mobx-react/native";
import {autorun} from 'mobx';
const {height, width} = Dimensions.get('window');
Mapbox.setAccessToken('pk.eyJ1Ijoia2lyZTcxIiwiYSI6IjZlNGUyYmZhZGZmMDI3Mzc4MmJjMzA0MjI0MjJmYTdmIn0.xwgkCT1t-WCtY9g0pEH1qA');
const CURRENT = 'current';

function getAnnotation(coords){
    return {
        coordinates: [coords.latitude,coords.longitude],
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

@observer
export default class Map extends React.Component {
    // componentWillMount(){
    //     this.location = this.props.location;
    //     this.handler = autorun(()=>{
    //         console.log("CURRENT LOCATION:", JSON.stringify(this.location));
    //         this.location && this._map.setCenterCoordinate(this.location);
    //     })
    // }
    
    render() {
        //console.log("MAP RENDER", JSON.stringify(this.props.location));
        const isDay = this.props.isDay;
        return (
            <View style={{position:'absolute',top:0,bottom:0,right:0,left:0}}>
                <MapView
                    ref={map => { this._map = map; }}
                    style={styles.container}
                    initialDirection={0}
                    logoIsHidden={true}
                    scrollEnabled={true}
                    zoomEnabled={true}
                    styleURL={isDay ? "mapbox://styles/kire71/cil41aiwc005l9fm1b2om6ecr" : "mapbox://styles/kire71/cijvygh6q00j794kqtx21ffab"}
                    //mapbox://styles/kire71/cijvygh6q00j794kqtx21ffab
                    userTrackingMode={Mapbox.userTrackingMode.followWithHeading}
                    initialCenterCoordinate={this.props.location}
                    compassIsHidden={false}
                    contentInset={this.props.fullMap ? [0,0,0,0]:[-height/1.5,0,0,0]}
                    showsUserLocation={false}
                    initialZoomLevel={17}
                    onRegionChange={this.onRegionChange}
                    onRegionWillChange={this.onRegionWillChange}
                    onOpenAnnotation={this.onOpenAnnotation}
                    onRightAnnotationTapped={this.onRightAnnotationTapped}
                    onUpdateUserLocation={this.onUpdateUserLocation}
                    onLongPress={this.onLongPress} />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

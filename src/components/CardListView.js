import React, {View, InteractionManager, StyleSheet, Component, ListView} from 'react-native';
import ActivityCard from './ActivityCard';
import PostOptionsMenu from './PostOptionsMenu';
import {k} from '../globals';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


export default class extends Component {
    constructor(props){
        super(props);
        this._handleProps = this._handleProps.bind(this);
        this.state = {displayArea: {}, buttonRect: {}, isVisible:false, ...this._handleProps(this.props)};

    }

    scrollTo(params){
        this.refs.list.scrollTo(params);
    }

    _handleProps(props){
        //props.list ||
        return props.list ? {dataSource: ds.cloneWithRows([     {         id:1,         avatar: require("../../images/iconAvatar.png"),         created: '10:12 AM',         from: 'Sarah',         channel: 'ThursdayPickupSoccer',         desc: '@Sarah added you to her channel Thursday Pickup Soccer'     },
            {         id:2,         avatar: require("../../images/iconAvatar2@2x.png"),         created: '10:32 AM',         from: 'Kogi',         priority: 1,         location: '290 N Hill Ave, Pasadena, CA 91106',         desc: 'Pasadena PCC Lunch Run: 11:30-2:30 PM. Come and get it people!'     },     {         id:3,         avatar: require("../../images/iconAvatar.png"),         created: '11:12 AM',         from: 'Janice',         image: {uri:'http://madebysofa.com/static/archive/img/blog/sofa_icon/final_zowieso.png'},
                image: {uri: 'https://cdn0.iconfinder.com/data/icons/furnitures-icons-rounded/110/Sofa-3-512.png'},         desc: 'What about this one? $399 at the thrift store on Melrose'     }, ]

    )} : {};
    }

    componentWillReceiveProps(props){
        this.setState({...this._handleProps(props)});
    }

    showPopover(row, {nativeEvent}, button) {
        let delta = 0;
        // scroll up if element is too low
        if (nativeEvent.pageY>this.height-200*k){
            this.refs.list.scrollTo({x:0, y:this.contentOffsetY+nativeEvent.pageY-(this.height-200*k), animated:false});
        }
        InteractionManager.runAfterInteractions(() =>
            button.measure((ox, oy, width, height, px, py) => {
                this.setState({
                    isVisible: true,
                    item:row,
                    displayArea: {x: 13*k, y: 0, width: this.width-29*k, height: this.height},
                    buttonRect: {x: px+width/2-6*k, y: py, width: width, height: height}
                });
            }));
    }

    closePopover() {
        this.setState({isVisible: false});
    }

    onLayout({nativeEvent}){
        this.width = nativeEvent.layout.width;
        this.height = nativeEvent.layout.height;
    }

    render(){
        return   <View style={styles.container} onLayout={this.onLayout.bind(this)}>
            {this.props.children}
            <ListView ref="list" style={styles.container} scrollEventThrottle={1} {...this.props}
                      dataSource={this.state.dataSource}
                      renderRow={row => <ActivityCard key={row.id} {...row} onPostOptions={this.showPopover.bind(this, row)}/>}>
            </ListView>
            <PostOptionsMenu
                width={this.state.displayArea.width - 15*k}
                isVisible={this.state.isVisible}
                fromRect={this.state.buttonRect}
                item={this.state.item}
                placement='bottom'
                displayArea={this.state.displayArea}
                onClose={this.closePopover.bind(this)}/>

        </View>


    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, backgroundColor: 'transparent'
    }
});

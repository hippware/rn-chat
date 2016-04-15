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

    _handleProps(props){
        return  {dataSource: ds.cloneWithRows(props.list)};
    }

    componentWillReceiveProps(props) {
        if (props.showActivityNavBar === false && props.initialScroll) {
            this.refs.list.scrollTo({x: 0, y: 0, animated: true});
        }

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

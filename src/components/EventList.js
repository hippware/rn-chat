import React, {Component} from "react";
import {Text, Image, Dimensions, TouchableOpacity, View, InteractionManager, StyleSheet, ListView} from "react-native";
import PostOptionsMenu from './PostOptionsMenu';
import {backgroundColorDay, backgroundColorNight} from '../globals';
import {k, width, height} from './Global';
import {Actions} from 'react-native-router-native';
import {observer} from "mobx-react/native";
import Avatar from './Avatar';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
import assert from 'assert';
import EventCard from './EventCard';
import model from '../model/model';
import EventWelcome from '../model/EventWelcome';
import EventContainer from '../model/EventContainer';
import location from '../store/location';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import TransparentGradient from './TransparentGradient';
import FilterTitle from './FilterTitle';
import statem from '../../gen/state';

import autobind from 'autobind-decorator';

@observer
@autobind
export default class EventList extends Component {
  constructor(props){
    super(props);
    this.contentOffsetY = 0;
    this.state = {displayArea: {}, buttonRect: {}, isVisible:false};
    
  }
  onScroll(event) {
    // switch nav bar is scroll position is below threshold
    this.contentOffsetY = event.nativeEvent.contentOffset.y;
    if (this.props.onScroll){
      this.props.onScroll(event);
    }
  }
  
  showPopover(row, {nativeEvent}, button) {
    let delta = 0;
    // scroll up if element is too low
    if (nativeEvent.pageY>this.height-200){
      this.refs.list.scrollTo({x:0, y:this.contentOffsetY+nativeEvent.pageY-(this.height-200), animated:false});
    }
    InteractionManager.runAfterInteractions(() =>
      button.measure((ox, oy, width, height, px, py) => {
        this.setState({
          isVisible: true,
          item:row,
          displayArea: {x: 13*k, y: 0, width: this.width-29*k, height: this.height},
          buttonRect: {x: px+width/2-16*k, y: py-10, width: width, height: height}
        });
      }));
  }

  closePopover() {
    this.setState({isVisible: false});
  }
  
  scrollTo(data){
    this.refs.list.scrollTo(data);
  }

  onLayout({nativeEvent}){
    this.width = nativeEvent.layout.width;
    this.height = nativeEvent.layout.height;
  }
  
  render(){
    const backgroundColor = location.isDay ? backgroundColorDay : backgroundColorNight;
    const list = model.events.list.map(x=>x);
    if (!list.length){
      const welcome = new EventWelcome();
      console.log("WELCOME:", welcome.presenterClass);
      list.push(new EventContainer(welcome.asMap()));
    }
    this.dataSource = (this.dataSource || ds).cloneWithRows(list);
    const { onScroll = () => {} } = this.props;
    
    return   <View style={{flex:1}}>
      <ListView onLayout={this.onLayout.bind(this)} ref="list" enableEmptySections={true}
        {...this.props}
                style={[styles.container, this.props.containerStyle]}
                scrollEventThrottle={1}
                onScroll={this.onScroll.bind(this)}
                dataSource={this.dataSource}
                renderRow={row=><EventCard item={row} onPostOptions={this.showPopover.bind(this, row)}/>}
                renderFooter={()=><View style={{height:360, backgroundColor}} />}
                renderScrollComponent={props => (
                  
          <ParallaxScrollView
            onScroll={onScroll}
            stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
            parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
            backgroundSpeed={10}
            backgroundColor="transparent"
            contentBackgroundColor={backgroundColor}
            renderForeground={()=>(
          <TouchableOpacity style={{flex:1}} onPress={statem.home.fullMap}/>
            )}

            renderStickyHeader={() => (
              <FilterTitle onPress={()=>{this.refs.list.scrollTo({x:0, y:0})}}/>
            )}
            />
            
        )}
                
      />
      <PostOptionsMenu
        width={this.state.displayArea.width - 15*k}
        isVisible={this.state.isVisible}
        fromRect={this.state.buttonRect}
        item={this.state.item}
        placement='bottom'
        displayArea={this.state.displayArea}
        onClose={this.closePopover.bind(this)}/>
      </View>;
  }
}
const PARALLAX_HEADER_HEIGHT = 191*k;
const STICKY_HEADER_HEIGHT = 70;
const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex:1,
  }
});

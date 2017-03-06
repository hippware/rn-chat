import React, {Component} from "react";
import {Text, ScrollView, Image, Dimensions, TouchableOpacity, View, InteractionManager, StyleSheet, ListView} from "react-native";
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
import location from '../store/locationStore';
import eventStore from '../store/eventStore';
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
  async onScroll(event) {
    // switch nav bar is scroll position is below threshold
    this.contentOffsetY = event.nativeEvent.contentOffset.y;
    if (!this.loading && this.contentOffsetY+height + 200 >= event.nativeEvent.contentSize.height){
      this.loading = true;
      await eventStore.loadMore();
      this.loading = false;
    }
    if (this.props.onScroll){
      this.props.onScroll(event);
    }
  }
  
  async onEndReached(){
    console.log("onEndReached");
    if (!this.loading){
      this.loading = true;
      await eventStore.loadMore();
      this.loading = false;
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
  
  async onScroll(event) {
    if (!this.loading && event.nativeEvent.contentOffset.y+ height + 200 >= event.nativeEvent.contentSize.height){
      this.loading = true;
      console.log("load more HS events");
      await eventStore.loadMore();
      this.loading = false;
    }
  }
  
  scrollTo(data){
    this.refs.list.scrollTo(data);
  }

  onLayout({nativeEvent}){
    this.width = nativeEvent.layout.width;
    this.height = nativeEvent.layout.height;
  }
  
  render(){
    this.loading = false;
    const backgroundColor = location.isDay ? backgroundColorDay : backgroundColorNight;
    const list = model.events.list.map(x=>x);
    if (!list.length){
      const welcome = new EventWelcome();
      console.log("WELCOME:", welcome.presenterClass);
      list.push(new EventContainer(welcome.asMap()));
    }
    this.dataSource = (this.dataSource || ds).cloneWithRows(list);
    // return <View style={{flex:1}}><ScrollView scrollEventThrottle={1} onScroll={this.onScroll.bind(this)}>
    //   {list.map((row,i)=><EventCard key={i} item={row} onPostOptions={this.showPopover.bind(this, row)}/>)}
    // </ScrollView>
    // </View>
    return   <View style={{flex:1}}>
      <ListView onLayout={this.onLayout.bind(this)} ref="list" enableEmptySections={true}
        {...this.props}
                style={[styles.container, this.props.containerStyle]}
                scrollEventThrottle={1}
                dataSource={this.dataSource}
                onScroll={this.onScroll}
                renderRow={(row,i)=><EventCard key={i+row.event.id} item={row} onPostOptions={this.showPopover.bind(this, row)}/>}
                renderScrollComponent={props => (
                  
          <ParallaxScrollView
            stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
            parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
            onScroll={props.onScroll}
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

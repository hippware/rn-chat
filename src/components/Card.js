import React from "react";
import {StyleSheet, TouchableOpacity, Animated, Image, View} from "react-native";
import {k, backgroundColorCardDay, backgroundColorCardNight } from '../globals';
import {observer} from "mobx-react/native";
import Cell from './Cell';
import autobind from 'autobind-decorator';

@observer
@autobind
export default class Card extends React.Component {
  constructor(props){
    super(props);
    this.state = {collapsed:this.props.collapsed, height:new Animated.Value(this.props.collapsedHeight)};
  }
  
  expand(){
    Animated.timing(          // Uses easing functions
      this.state.height,    // The value to drive
      {toValue:this.state.totalHeight}            // Configuration
    ).start();
    this.setState({collapsed: false});
  }
  
  render(){
    const {style, children, ...props } = this.props;
    const backgroundColor = this.props.isDay ? backgroundColorCardDay : backgroundColorCardNight;
    if (this.props.onPress) {
      return (
        <TouchableOpacity onPress={this.props.onPress}>
          <View  {...this.props} style={[styles.container,this.props.style]}>
            <View style={[styles.inner, {backgroundColor},this.props.innerStyle]}>
              {React.Children.map(this.props.children, child=>child && props? React.cloneElement(child, props) : child )}
            </View>
            {this.props.footer}
          </View>
        </TouchableOpacity>
      )
    } else {
      return <View  {...this.props} style={[styles.container,this.props.style]}>
        <Animated.View style={this.state.collapsed || this.state.height !== this.state.totalHeight ? {height:this.state.height, overflow:'hidden'} : {}}>
          <View style={[styles.inner, {backgroundColor}, this.props.innerStyle]} onLayout={props=>this.setState({totalHeight:props.nativeEvent.height})}>
            {React.Children.map(children, child=>child ? (props? React.cloneElement(child, props) : child) : false )}
          </View>
        </Animated.View>
        
          {this.state.collapsed && <View style={{paddingTop:4,}}><TouchableOpacity onPress={()=>this.expand()}>
            <View style={{alignItems:'center'}}><Image source={this.props.isDay ? require('../../images/group.png') : require('../../images/groupNight.png')}/></View>
        </TouchableOpacity></View>}
        {this.props.footer}
      </View>
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingRight: 15*k,
    paddingLeft: 15*k,
    paddingTop: 13*k,
    paddingBottom: 10*k,
  },
  inner: {
    borderColor: 'white',
    borderRadius: 2,
    shadowOffset: {height:1, width:0}, shadowRadius:2, shadowOpacity:0.12,

  }
});

Card.propTypes = {
  isDay: React.PropTypes.bool.isRequired
};

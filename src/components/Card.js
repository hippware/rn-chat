import React from "react";
import {StyleSheet, TouchableOpacity, Image, View} from "react-native";
import {k, backgroundColorCardDay, backgroundColorCardNight } from '../globals';

export default class Card extends React.Component {
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
        <View style={[styles.inner, {backgroundColor}, this.props.innerStyle]}>
          {React.Children.map(children, child=>child ? (props? React.cloneElement(child, props) : child) : false )}
        </View>
        {this.props.footer}
      </View>
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingRight: 10*k,
    paddingLeft: 15*k,
    paddingTop: 13*k,
    paddingBottom: 10*k,
  },
  inner: {
    borderWidth: 0,
    borderColor: 'white',
    borderRadius: 2,
    shadowOffset: {height:1, width:0}, shadowRadius:2, shadowOpacity:0.12,

  }
});

Card.propTypes = {
  isDay: React.PropTypes.bool.isRequired
};

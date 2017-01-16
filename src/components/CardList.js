import React from "react";
import {StyleSheet, ListView, TouchableOpacity, Image, View} from "react-native";
import {k, backgroundColorCardDay, backgroundColorCardNight } from '../globals';

export default class CardList extends React.Component {
  render(){
    const {style, children, ...props } = this.props;
    const backgroundColor = this.props.isDay ? backgroundColorCardDay : backgroundColorCardNight;
      return <ListView  {...this.props} style={[styles.container,this.props.style]}
                                        contentContainerStyle={[styles.inner, {backgroundColor}, this.props.innerStyle]}>
      </ListView>
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

CardList.propTypes = {
  isDay: React.PropTypes.bool.isRequired
};

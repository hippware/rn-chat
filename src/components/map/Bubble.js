import React from 'react';
import {View, Animated, Image, Text, TouchableWithoutFeedback} from 'react-native';
import Triangle from './Triangle';
import {k, width as w, height as h} from '../Global';

const backgroundColor = '#FE5C6C';

// scale here - 1 is full image, 0.5 is bot details UI (half-screen), 0 is full map mode
type Props = {
  text: string,
  image: Image.props.source,
  scale?: number,
  onImagePress: Function,
  onMapPress: Function,
};

export default class Bubble extends React.Component {
  props: Props;

  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(this.props.scale);
  }

  componentWillReceiveProps(props) {
    Animated.spring(
      this.animatedValue,
      {
        toValue: props.scale,
      },
    ).start();
  }

  render() {
    const fullMap = this.props.scale === 0;
    const fullImage = this.props.scale === 1;
    const width = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [70, 175, w],
    });

    const height = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [70, 203, w],
    });
    const borderRadius = this.props.scale === 1 ? 0 : fullMap ? 3 : 7.2;
    const marker = (
      <TouchableWithoutFeedback onPress={this.props.onImagePress}>
        <View style={{alignItems: 'center'}}>
          <Animated.View style={{backgroundColor, borderRadius, width, height}}>
            <Animated.Image
              style={{borderColor: backgroundColor, borderRadius, borderWidth: fullImage ? 0 : 1, width, height: width}}
              resizeMode='contain'
              source={this.props.image}
            />
            {!fullImage && !fullMap && <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text ellipsizeMode='middle' style={{color: 'white', fontSize: 13, padding: 2}}
                    numberOfLines={1}>{this.props.text}</Text>
            </View>}
          </Animated.View>
          {!fullImage && <Triangle
            width={fullMap ? 9 : 11}
            height={fullMap ? 9 : 11}
            color={backgroundColor}
            direction={'down'}
          />}
        </View>
      </TouchableWithoutFeedback>
    );
    if (this.props.scale === 0.5) {
      return (
        <TouchableWithoutFeedback onPress={this.props.onMapPress}>
          <View style={{alignItems: 'center', justifyContent: 'center', width: w, height: w}}>
            {marker}
          </View>
        </TouchableWithoutFeedback>);
    } else {
      return marker;
    }
  }
}
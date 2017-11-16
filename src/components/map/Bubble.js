import React from 'react';
import {View, Animated, Image, TouchableWithoutFeedback} from 'react-native';
import Triangle from './Triangle';
import {width as w} from '../Global';
import {RText} from '../common';
import {colors} from '../../constants';
import {observer} from 'mobx-react/native';

const backgroundColor = '#FE5C6C';

// scale here - 1 is full image, 0.5 is bot details UI (half-screen), 0 is full map mode
type Props = {
  text: string,
  image: Image.props.source,
  scale?: number,
  onImagePress: Function,
  onMapPress: Function,
};

@observer
export default class Bubble extends React.Component {
  props: Props;

  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(this.props.scale);
  }

  componentWillReceiveProps(props) {
    Animated.timing(this.animatedValue, {toValue: props.scale, duration: 250}).start();
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
          <Animated.View style={{backgroundColor, borderRadius, width, height, overflow: 'hidden', borderWidth: fullImage ? 0 : 1, borderColor: backgroundColor}}>
            <Animated.Image style={{width, height: width}} resizeMode='contain' source={this.props.image} />
            {!fullImage &&
              !fullMap && (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                  <RText color={colors.WHITE} size={13} style={{padding: 2}} numberOfLines={1} ellipsizeMode='middle'>
                    {this.props.text}
                  </RText>
                </View>
              )}
          </Animated.View>
          {!fullImage && <Triangle width={fullMap ? 9 : 11} height={fullMap ? 9 : 11} color={backgroundColor} direction='down' />}
        </View>
      </TouchableWithoutFeedback>
    );
    if (this.props.scale === 0.5) {
      return (
        <TouchableWithoutFeedback onPress={this.props.onMapPress}>
          <View style={{alignItems: 'center', justifyContent: 'center', width: w, height: w}}>{marker}</View>
        </TouchableWithoutFeedback>
      );
    } else {
      return marker;
    }
  }
}

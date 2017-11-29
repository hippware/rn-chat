// @flow

import React from 'react';
import {View, Animated, Image} from 'react-native';
import Triangle from './Triangle';
import {width as w} from '../Global';
import {RText} from '../common';
import {colors} from '../../constants';
import {observer} from 'mobx-react/native';

// scale here - 1 is full image, 0.5 is bot details UI (half-screen), 0 is full map mode
type Props = {
  text: string,
  image: Image.props.source,
  scale?: number,
  showLoader: boolean,
};

@observer
export default class Bubble extends React.Component<Props> {
  animatedValue: any;

  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(this.props.scale);
  }

  componentWillReceiveProps(props: Props) {
    Animated.timing(this.animatedValue, {toValue: props.scale, duration: 250}).start();
  }

  render() {
    const {scale, image, text, showLoader} = this.props;
    const fullMap = scale === 0;
    const fullImage = scale === 1;
    const width = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [58, 175, w],
    });

    const height = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [58, 203, w],
    });
    const borderRadius = scale === 1 ? 0 : fullMap ? 9.6 : 7.2;
    return (
      <View style={{alignItems: 'center'}}>
        <Animated.View style={{backgroundColor: colors.PINK, borderRadius, width, height, overflow: 'hidden', borderWidth: fullImage ? 0 : 1.2, borderColor: colors.PINK}}>
          {showLoader ? (
            <Animated.View style={{width, height: width, backgroundColor: colors.GREY}} />
          ) : (
            <Animated.Image style={{width, height: width}} resizeMode='contain' source={image} />
          )}
          {!fullImage &&
            !fullMap && (
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <RText color={colors.WHITE} size={13} style={{padding: 2}} numberOfLines={1} ellipsizeMode='middle'>
                  {text}
                </RText>
              </View>
            )}
        </Animated.View>
        {!fullImage && <Triangle width={fullMap ? 14 : 11} height={fullMap ? 8 : 11} color={colors.PINK} direction='down' />}
      </View>
    );
  }
}

// @flow

import React from 'react';
import {View, Image, Alert, TouchableOpacity, Text, StyleSheet} from 'react-native';
import autobind from 'autobind-decorator';
import {observer} from 'mobx-react/native';
import statem from '../../gen/state';
import {width, height} from './Global';
import Screen from './Screen';
import location from '../store/locationStore';
import Swiper from 'react-native-swiper';
import NavBar from './NavBar';
import NavBarRightButton from './NavBarRightButton';
import {Actions} from 'react-native-router-native';
import {colors} from '../constants';
import botStore from '../store/botStore';
import botFactory from '../factory/botFactory';

const TopBar = observer(props => {
  const bot = botFactory.create({id: props.item });
  const isOwn = !bot.owner || bot.owner.isOwn;
  if (!props.displayed) {
    return null;
  }
  return (
    <NavBar style={{position: 'absolute', top: 0, height: 70}}>
      <Text
          style={{
            top: 5,
            color: location.isDay ? colors.DARK_PURPLE : 'white',
            fontFamily: 'Roboto-Regular',
            fontSize: 18,
          }}
      >
        {props.children}
      </Text>
      {isOwn &&
        <NavBarRightButton onPress={() => statem.botPhotoList.addPhoto({bot})}>
          <Image source={require('../../images/attachPhotoPlus.png')} />
        </NavBarRightButton>}
    </NavBar>
  );
});

const renderPagination = (index, total, context) => {
  return (
    <View pointerEvents='box-none' style={{position: 'absolute', top: 0, right: 0, left: 0, bottom: 0}}>
      <TopBar>{index + 1}/{total}</TopBar>
      <BottomBar isOwn currentIndex={index} />
    </View>
  );
};

TopBar.defaultProps = {
  displayed: true,
};

@autobind
@observer
class BottomBar extends React.Component {
  async removeImage() {
    try {
      await botStore.removeImageWithIndex(this.props.currentIndex);
      if (botStore.bot.images.length === 0) {
        Actions.pop();
      }
    } catch (e) {
      alert(JSON.stringify(e));
    }
  }

  render() {
    if (!this.props.displayed) {
      return null;
    }
    const bot = botFactory.create({id: this.props.item });
    const isOwn = !bot.owner || bot.owner.isOwn;
    return (
      <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            height: 90,
            backgroundColor: location.isDay ? 'rgb(243,244,246)' : colors.DARK_PURPLE,
            alignItems: 'center',
            justifyContent: 'center',
          }}
      >
        {isOwn &&
          <TouchableOpacity
              onPress={() =>
              Alert.alert(null, 'Do you want to delete this image?', [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Delete', style: 'destructive', onPress: this.removeImage},
              ])}
              style={{
                position: 'absolute',
                top: 20,
                bottom: 20,
                left: 5,
                right: 5,
                borderRadius: 2,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
              }}
          >
            <Text style={{fontFamily: 'Roboto-Regular', color: 'red'}}>
              Delete Photo
            </Text>
          </TouchableOpacity>}
      </View>
    );
  }
}
BottomBar.defaultProps = {
  displayed: true,
};

@observer class BotImage extends React.Component {
  componentWillMount() {
    this.props.image.download();
  }

  render() {
    const image = this.props.image;
    return (
      <View style={styles.slide}>
        {image.loaded && <Image resizeMode='contain' style={styles.image} source={image.source} />}
      </View>
    );
  }
}

export default observer(props => {
  const bot = botFactory.create({id: props.item });
  if (!bot) {
    return <Screen />;
  }
  return (
    <Screen>
      <Swiper style={styles.wrapper} height={height} renderPagination={renderPagination} index={props.index} loop={false} loadMinimal>
        {bot._images.map(image => <BotImage key={image.item} image={image} />)}
      </Swiper>
    </Screen>
  );
});

const styles = StyleSheet.create({
  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },

  image: {
    width,
  },
});

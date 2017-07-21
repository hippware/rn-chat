// @flow

import React from 'react';
import {InteractionManager, View, Image, Alert, TouchableOpacity, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {observer} from 'mobx-react/native';
import {Actions} from 'react-native-router-flux';
import Swiper from 'react-native-swiper';
import {width, height} from './Global';
import Screen from './Screen';
import botStore from '../store/botStore';
import botFactory from '../factory/botFactory';
import Bot from '../model/Bot';
import {k} from '../globals';

type Props = {
  item: string,
  index: number,
};

class BotPhotoSwiper extends React.Component {
  props: Props;

  static title = ({item, index}) => {
    const bot = botFactory.create({id: item});
    // @TODO: figure out dynamic title based on Swiper index
    return bot._images.length ? `${index + 1}/${bot._images.length}` : null;
  };

  static rightButtonImage = ({item}) => {
    const bot = botFactory.create({id: item});
    const isOwn = !bot.owner || bot.owner.isOwn;
    return isOwn ? require('../../images/attachPhotoPlus.png') : null;
  };

  static onRight = ({item}) => {
    const bot = botFactory.create({id: item});
    const isOwn = !bot.owner || bot.owner.isOwn;
    return isOwn && Actions.botPhoto({item});
  };

  componentDidMount() {
    const bot = botFactory.create({id: this.props.item});
    bot._images.forEach(image => image.download());
  }

  renderPagination = (index) => {
    if (index !== this.props.index) {
      InteractionManager.runAfterInteractions(() => {
        Actions.refresh({item: this.props.item, index});
      });
    }
    return null;
  };

  removeImage = async (currentIndex) => {
    try {
      await botStore.removeImageWithIndex(currentIndex);
      Actions.refresh({index: currentIndex});
      if (botStore.bot.images.length === 0) {
        Actions.pop();
      }
    } catch (e) {
      alert(JSON.stringify(e));
    }
  };

  render() {
    const bot: Bot = botFactory.create({id: this.props.item});
    const isOwn = !bot.owner || bot.owner.isOwn;
    if (!bot) {
      return <Screen />;
    }
    return (
      <Screen style={styles.screen}>
        {bot._images.length
          ? <Swiper
            style={styles.wrapper}
            height={height - 90 * k}
            renderPagination={this.renderPagination}
            index={this.props.index}
            loop={false}
            loadMinimal
            loadMinimalSize={5}
            removeClippedSubviews={false}
          >
            {bot._images.map((image) => {
              const {loaded, item} = image;
              return (
                <View style={styles.slide} key={item}>
                  {!loaded ? <ActivityIndicator key={item} size='large' /> : <Image resizeMode='contain' style={styles.image} source={image.source} />}
                </View>
              );
            })}
          </Swiper>
          : <ActivityIndicator size='large' />}
        {isOwn &&
          <TouchableOpacity
            onPress={() =>
              Alert.alert(null, 'Do you want to delete this image?', [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Delete', style: 'destructive', onPress: () => this.removeImage(this.props.index)},
              ])}
            style={styles.deleteButton}
          >
            <Text style={{fontFamily: 'Roboto-Regular', color: 'red'}}>Delete Photo</Text>
          </TouchableOpacity>}
      </Screen>
    );
  }
}

export default observer(BotPhotoSwiper);

const styles = StyleSheet.create({
  screen: {
    paddingTop: 70 * k,
  },
  wrapper: {},
  slide: {
    flex: 1,
    paddingBottom: 90 * k,
    justifyContent: 'center',
    alignItems: 'center',
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
  deleteButton: {
    position: 'absolute',
    bottom: 20 * k,
    left: 5 * k,
    right: 5 * k,
    borderRadius: 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50 * k,
  },
});

// @flow

import React from 'react';
import {StyleSheet, Text, Image, View, TouchableOpacity, FlatList} from 'react-native';
import {observer} from 'mobx-react/native';
import {k} from './Global';

const imageWidth = 125 * k;

type Props = {
  images: Object[],
  isOwn: boolean,
  onView: Function,
  onAdd: Function,
};

const PhotoGrid = ({images, isOwn, onView, onAdd}: Props) => {
  const res = images.filter(x => !!x.source).map(x => x);
  if (isOwn) {
    res.splice(0, 0, {add: true});
  }
  return (
    <FlatList
      contentContainerStyle={styles.list}
      numColumns={3}
      enableEmptySections
      data={res}
      keyExtractor={item => item.id}
      renderItem={({item, index}) =>
        (<View style={styles.box}>
          {item.source &&
            <TouchableOpacity onPress={() => onView && onView(isOwn ? index - 1 : index)}>
              <Image source={item.source} style={styles.boxImage} />
            </TouchableOpacity>}
          {item.add &&
            <TouchableOpacity
              onPress={onAdd}
              style={{
                backgroundColor: 'rgb(254,92,108)',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image source={require('../../images/iconAddPhotos.png')} />
              <Text
                style={{
                  fontFamily: 'Roboto-Regular',
                  color: 'white',
                  fontSize: 14 * k,
                }}
              >
                Add Photos
              </Text>
            </TouchableOpacity>}
        </View>)}
    />
  );
};

export default observer(PhotoGrid);

const styles = StyleSheet.create({
  list: {
    flex: 1,
    flexDirection: 'row',
  },
  box: {
    width: imageWidth,
    height: imageWidth,
    alignItems: 'stretch',
  },
  boxImage: {
    flexGrow: 1,
    borderRadius: 0,
    width: imageWidth,
    height: imageWidth,
  },
});

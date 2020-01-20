import React from 'react'
import {Image, StyleSheet, View, ImageSourcePropType, TextInputProperties} from 'react-native'
import RTextInput from '../common/RTextInput'

interface IProps extends TextInputProperties {
  image?: ImageSourcePropType
}

const SearchBar = ({style, image, ...rest}: IProps) => (
  <View style={styles.searchBar}>
    <Image
      source={image || require('../../../images/iconSearchGray.png')}
      style={{margin: 5, height: 13}}
      resizeMode="contain"
    />
    <RTextInput
      style={[styles.text, style]}
      placeholderTextColor="rgb(140,140,140)"
      returnKeyType="search"
      clearButtonMode="while-editing"
      {...rest}
    />
  </View>
)

export default SearchBar

const styles = StyleSheet.create({
  searchBar: {
    marginHorizontal: 10,
    marginBottom: 5,
    backgroundColor: 'rgb(247, 247, 247)',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 5,
  },
  text: {fontFamily: 'Roboto-Light', fontSize: 14, margin: 5, flex: 1},
})

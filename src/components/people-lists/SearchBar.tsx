import React from 'react'
import {
  Image,
  StyleSheet,
  View,
  TextInput,
  ImageSourcePropType,
  TextInputProperties,
} from 'react-native'
import {k} from '../Global'
import {colors} from '../../constants'

interface IProps extends TextInputProperties {
  image?: ImageSourcePropType
}

const SearchBar = ({style, image, ...rest}: IProps) => (
  <View style={styles.searchBar}>
    <Image
      source={image || require('../../../images/iconSearchGray.png')}
      style={{margin: 5, height: 12}}
      resizeMode="contain"
    />
    <TextInput
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
    marginHorizontal: 10 * k,
    marginBottom: 5 * k,
    backgroundColor: colors.LIGHT_GREY,
    borderRadius: 2 * k,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {fontFamily: 'Roboto-Light', fontSize: 14, margin: 5 * k, flex: 1},
})

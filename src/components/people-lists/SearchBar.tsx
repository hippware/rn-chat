import React from 'react'
import {Image, StyleSheet, View, TextInput} from 'react-native'
import {k} from '../Global'
import {colors} from '../../constants'

// type Props = {
//   style?: any
// }

const SearchBar = (props: any) => {
  const {style, ...rest} = props
  return (
    <View style={styles.searchBar}>
      <Image
        source={props.image || require('../../../images/iconFriendsSearch.png')}
        style={{margin: 5 * k, height: 12 * k}}
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
}

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
  text: {fontFamily: 'Roboto-Light', fontSize: 14 * k, margin: 5 * k, flex: 1},
})

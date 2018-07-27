import React from 'react'
import {View, TextInput, StyleSheet, TouchableOpacity, Image} from 'react-native'
import {RText} from '../common'
import BottomPopup from '../BottomPopup'
import {colors} from '../../constants'
import {width, k} from '../Global'
import Carousel from 'react-native-snap-carousel'

const itemSize = 50
const noteIcon = require('../../../images/iconAddnote.png')

class BotCompose extends React.Component<{}> {
  render() {
    return (
      <BottomPopup noCloseTab back>
        <View
          style={{
            backgroundColor: 'transparent',
            marginTop: 182, // TODO: magic number...use exported constants
          }}
        >
          <IconSelector style={{marginBottom: 10}} />
          <TextInput style={styles.textStyle} placeholder="Name this place" />
          <View style={{flexDirection: 'row', paddingVertical: 20 * k, paddingHorizontal: 30 * k}}>
            <EditCTA text="Note" icon={noteIcon} />
            <EditCTA text="Photo" icon={noteIcon} />
          </View>
          {/* TODO
           * How do we lock the button to the bottom of the screen?
           * Ideally BottomPopup isn't a fixed height, but instead rises as high as necessary to display all items
           */}
          <TouchableOpacity
            style={{
              width: '100%',
              backgroundColor: colors.PINK, // TODO: gradient background
              paddingVertical: 10 * k,
              alignItems: 'center',
            }}
            // onPress={() => console.log('TODO: Pin Location press')}
          >
            <RText color="white" size={15}>
              Pin Location
            </RText>
          </TouchableOpacity>
          {/* <View style={{backgroundColor: 'transparent', height: 1500}} /> */}
        </View>
      </BottomPopup>
    )
  }
}

const EditCTA = ({text, icon}: any) => (
  <TouchableOpacity
    // onPress={() => console.log('TODO: onPress')}
    style={{marginRight: 50 * k, alignItems: 'center', justifyContent: 'center'}}
  >
    <Image source={icon} />
    <RText size={14} color={colors.PINK} style={{marginTop: 8 * k, left: 5 * k}}>
      {text}
    </RText>
  </TouchableOpacity>
)

class IconSelector extends React.Component<any> {
  render() {
    return (
      <View style={this.props.style}>
        <Carousel
          // ref={r => (this.list = r)}
          data={['1', '2', '3']}
          renderItem={this.renderItem}
          // firstItem={index}
          sliderWidth={width}
          itemWidth={itemSize}
          // onSnapToItem={index => list[index].select()} // enable if you don't need to unselect current bot for you/tutorial
          // onSnapToItem={setIndex}
          inactiveSlideOpacity={1}
        />
      </View>
    )
  }

  renderItem = ({item, index}) => (
    <View style={{height: itemSize, width: itemSize, borderColor: colors.PINK, borderWidth: 2}} />
  )

  keyExtractor = item => item
}

export default BotCompose

const styles = StyleSheet.create({
  textStyle: {
    height: 50 * k,
    width: '100%',
    // borderTopColor: colors.LIGHT_GREY,
    borderBottomColor: colors.LIGHT_GREY,
    // borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 10 * k,
    paddingLeft: 21 * k,
    fontFamily: 'Roboto-Regular',
    fontSize: 16 * k,
  },
})

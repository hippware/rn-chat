import React from 'react'
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import Bubble from '../map/Bubble'
import commonStyles from '../styles'

const dragTheMap = require('../../../images/dragTheMap.png')
const tapToChange = require('../../../images/tapToChange.png')
const defaultIcon = require('../../../images/mapIcons/question.png')

const UberMarker = ({iconStore: {icon, index, setIndex}}) => {
  return (
    <View
      pointerEvents="box-none"
      style={[
        commonStyles.absolute,
        {
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
    >
      <TouchableOpacity onPress={() => setIndex(1)}>
        <Bubble
          image={!icon && defaultIcon}
          fontIcon={icon}
          style={{
            backgroundColor: 'white',
          }}
          outerStyle={{
            shadowOffset: {height: 2, width: 0},
            shadowRadius: 3,
            shadowOpacity: 0.12,
          }}
          imageStyle={{width: 20, height: 20}}
          size={48}
        />
        <Image source={tapToChange} style={styles.changeCTA as any} />
      </TouchableOpacity>
      <Image source={dragTheMap} />
    </View>
  )
}

// NOTE: we need to add `inject` and `observer` here (instead of grouped together with the function declaration above)
// to have "UberMarker" shows up as expected in the RN Inspector view
export default inject('iconStore')(observer(UberMarker))

const styles = StyleSheet.create({
  changeCTA: {
    position: 'absolute',
    top: -40,
    left: 30,
  },
})

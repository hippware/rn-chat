import React from 'react'
import {View, Image, TouchableOpacity} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import Bubble from '../map/Bubble'
import commonStyles from '../styles'

const drag = require('../../../images/dragTheMap.png')
const defaultIcon = require('../../../images/mapIcons/question.png')

const UberMarker = inject('iconStore')(
  observer(({iconStore: {icon, index, setIndex}}) => {
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
        </TouchableOpacity>
        {/* <Image source={createPin} /> */}
        <Image source={drag} />
      </View>
    )
  })
)

export default UberMarker

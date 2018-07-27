import React from 'react'
import {View, Image} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import Bubble from '../map/Bubble'
import commonStyles from '../styles'

const drag = require('../../../images/dragTheMap.png')
const defaultIcon = require('../../../images/mapIcons/question.png')

const UberMarker = inject('homeStore')(
  observer(({homeStore: {editIcon}}) => {
    return (
      <View
        pointerEvents="none"
        style={[
          commonStyles.absolute,
          {
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <Bubble
          image={!editIcon && defaultIcon}
          fontIcon={editIcon}
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
        {/* <Image source={createPin} /> */}
        <Image source={drag} />
      </View>
    )
  })
)

export default UberMarker

import React from 'react'
import {View} from 'react-native'
import {RText} from '../common'

type Props = {
  imageComponent: any
  handleComponent: any
  displayName?: string
  style?: any
  children?: any
}

const PersonRow = ({imageComponent, handleComponent, displayName, style, children}: Props) => (
  <View
    style={[
      {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
      },
      style,
    ]}
  >
    <View style={{marginRight: 13}}>{imageComponent}</View>
    <View style={{flex: 1}}>
      {handleComponent}
      {!!displayName && (
        <RText color="#757575" size={16} numberOfLines={1} ellipsizeMode="tail">
          {displayName}
        </RText>
      )}
    </View>
    {children}
  </View>
)

export default PersonRow

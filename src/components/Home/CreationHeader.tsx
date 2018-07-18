import React from 'react'
import {View} from 'react-native'
import {observer} from 'mobx-react/native'
import {CloseButton} from '../common'

interface IProps {}

@observer
export default class CreationHeader extends React.Component<IProps> {
  render() {
    return (
      <View style={{height: 100, backgroundColor: 'white', flexDirection: 'row', padding: 10}}>
        <CloseButton />
      </View>
    )
  }
}

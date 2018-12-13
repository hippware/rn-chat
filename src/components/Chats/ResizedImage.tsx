import React from 'react'
import {View, Image} from 'react-native'
import {observer} from 'mobx-react/native'

type State = {
  dwidth: number
}

@observer
export default class extends React.Component<any, State> {
  state = {dwidth: 0}

  render() {
    return (
      <View onLayout={({nativeEvent: {layout: {width}}}) => this.setState({dwidth: width})}>
        <Image
          style={{
            width: this.state.dwidth,
            height: this.props.image.height * this.state.dwidth / this.props.image.width,
          }}
          resizeMode="contain"
          source={this.props.image}
        />
      </View>
    )
    // return (
    //     <View onLayout={({nativeEvent: {layout: {x, y, width, height}}})=>this.setState({dwidth:width})}>
    //         {this.state.width && <Image style={{width:this.state.dwidth, height:this.state.height*this.state.dwidth/this.state.width}}
    //                                     resizeMode={Image.resizeMode.contain}
    //                                     source={this.props.image}/>}
    //     </View>
    // );
  }
}
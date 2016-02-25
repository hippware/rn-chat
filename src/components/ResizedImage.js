import React, {View, Image} from 'react-native';

export default class extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    componentDidMount() {
        if (this.props.image) {
            Image.getSize(this.props.image.uri, (width, height) => {
                this.setState({width, height});
            });
        }
    }
    render(){
        return (
            <View onLayout={({nativeEvent: {layout: {x, y, width, height}}})=>this.setState({dwidth:width})}>
                {this.state.width && <Image style={{width:this.state.dwidth, height:this.state.height*this.state.dwidth/this.state.width}}
                                            resizeMode={Image.resizeMode.contain}
                                            source={this.props.image}/>}
            </View>
        );
    }
}
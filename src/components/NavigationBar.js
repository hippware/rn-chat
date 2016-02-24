import React, {View, TouchableOpacity, StyleSheet, Text, Dimensions} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const NAVBAR_HEIGHT_PORTRAIT = 70;
const NAVBAR_HEIGHT_LANDSCAPE = 35;
const STATUS_BAR_HEIGHT = 20;

export default class extends React.Component {
    constructor(props){
        super(props);
        this.state = {height: NAVBAR_HEIGHT_PORTRAIT, delta:STATUS_BAR_HEIGHT};
        this.bindFunctions = this.bindFunctions.bind(this);
        this.bindFunctions(props);
    }

    bindFunctions(props){
        this.renderLeftButton = props.renderLeftButton || this._renderLeftButton.bind(this);
        this.renderRightButton = props.renderRightButton || this._renderLeftButton.bind(this);
        this.renderTitle = props.renderTitle || this._renderTitle.bind(this);
    }

    componentWillUpdate(props){
        this.bindFunctions(props);
    }

    onLayout({nativeEvent}){
        const isPortrait = nativeEvent.layout.width === WIDTH;
        if (isPortrait){
            if (this.state.height != NAVBAR_HEIGHT_PORTRAIT){
                this.setState({height: NAVBAR_HEIGHT_PORTRAIT, delta:STATUS_BAR_HEIGHT});
            }
        } else {
            if (this.state.height != NAVBAR_HEIGHT_LANDSCAPE){
                this.setState({height: NAVBAR_HEIGHT_LANDSCAPE, delta:0});
            }
        }
    }

    _renderLeftButton(){
        if (this.props.onLeftButton && this.props.leftButtonTitle){
            return <TouchableOpacity onPress={this.props.onLeftButton}><Text style={this.props.textStyle}>{this.props.leftButtonTitle}</Text></TouchableOpacity>
        } else {
            return null;
        }
    }

    _renderRightButton(){
        if (this.props.onRightButton && this.props.rightButtonTitle){
            return <TouchableOpacity onPress={this.props.onRightButton}><Text style={this.props.textStyle}>{this.props.rightButtonTitle}</Text></TouchableOpacity>
        } else {
            return null;
        }
    }

    _renderTitle(){
        if (this.props.onTitle && this.props.title){
            return <TouchableOpacity onPress={this.props.onTitle}><Text style={this.props.textStyle}>{this.props.title}</Text></TouchableOpacity>
        } else {
            return <Text>{this.props.title}</Text>;
        }
    }

    render(){
        return (
            <View onLayout={this.onLayout.bind(this)} style={[styles.container, {height:this.state.height}, this.props.style]} >
                {this.props.header}
                <View style={[styles.container, {height:this.state.height}, this.props.style]} >
                    <View style={{height:this.state.delta,flex:1}}></View>
                    <View style={{height:this.state.height-this.state.delta, flexDirection:'row'}}>
                        {this.renderLeftButton(this.props)}
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            {this.renderTitle(this.props)}
                        </View>
                        {this.renderRightButton(this.props)}
                    </View>
                    {this.props.footer}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position:'absolute',top:0,right:0,left:0,backgroundColor:'rgb(247,247,247)'
    }
});
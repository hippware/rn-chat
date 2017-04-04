var React = require('react')
var ReactNative = require('react-native')
var {
    View,
    Text,
    TouchableHighlight,
    Image,
    PixelRatio
} = ReactNative

var WidgetMixin = require('../mixins/WidgetMixin.js')
var GiftedSpinner = require('react-native-gifted-spinner')

module.exports = React.createClass({
    mixins: [WidgetMixin],

    getDefaultProps() {
        return {
            type: 'LoadingWidget',
            onPress: () => {},
        }
    },

    render() {
        return (
            <View style={this.getStyle('rowContainer')}>
                <TouchableHighlight
                    onPress={this.props.onPress}
                    underlayColor={this.getStyle('underlayColor').pop()}
                    {...this.props} // mainly for underlayColor
                >
                    <View style={this.getStyle('row')}>
                        <GiftedSpinner />
                    </View>
                </TouchableHighlight>
            </View>
        )
    },

    defaultStyles: {
        rowImage: {
            height: 20,
            width: 20,
            marginLeft: 10,
        },
        rowContainer: {
            backgroundColor: '#FFF',
            borderBottomWidth: 1 / PixelRatio.get(),
            borderColor: '#c8c7cc',
        },
        row: {
            flexDirection: 'row',
            height: 44,
            alignItems: 'center',
        },
        underlayColor: '#c7c7cc',
    },
})

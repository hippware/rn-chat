var React = require('react')
var ReactNative = require('react-native')
var {
    View,
    Text,
    SwitchIOS,
    SwitchAndroid,
    Platform,
    PixelRatio
} = ReactNative

var WidgetMixin = require('../mixins/WidgetMixin.js')

var GiftedSwitch = React.createClass({
    _getSwitch() {
        if (Platform.OS === 'android') {
            return (
                <SwitchAndroid
                    {...this.props}
                />
            )
        } else {
            return (
                <SwitchIOS
                    {...this.props}
                />
            )
        }
    },
    render() {
        return (
            <View>
                {this._getSwitch()}
            </View>
        )
    },
})

module.exports = React.createClass({
    mixins: [WidgetMixin],

    getDefaultProps() {
        return {
            type: 'SwitchWidget',
        }
    },

    render() {
        return (
            <View style={this.getStyle('rowContainer')}>
                <View style={this.getStyle('row')}>
                    {this._renderImage()}

                    <Text numberOfLines={1} style={this.getStyle('switchTitle')}>{this.props.title}</Text>
                    <View style={this.getStyle('switchAlignRight')}>
                        <GiftedSwitch
                            style={this.getStyle('switch')}
                            {...this.props}

                            onValueChange={this._onChange}
                            value={this.state.value}
                        />
                    </View>
                </View>
                {this._renderValidationError()}
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
        switchTitle: {
            fontSize: 15,
            color: '#000',
            flex: 1,
            paddingLeft: 10,
        },
        switchAlignRight: {
            alignItems: 'flex-end',
            justifyContent: 'center',
            marginRight: 10,
        },
        switch: {},
    },
})

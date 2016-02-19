import React, {PixelRatio, Image, View,Text, TouchableOpacity, TextInput} from 'react-native';
import {GiftedForm, GiftedFormManager} from 'react-native-gifted-form';
import WidgetMixin from 'react-native-gifted-form/mixins/WidgetMixin';

import {k} from '../globals';

const NORMAL_HEIGHT = 51;
const HIGHLIGHTED_HEIGHT = 71;

export default class extends React.Component {
    render(){
        return <TextInputWidget
            onDeleteSign={true}
            autoCorrect={false} autoCapitalize="none"
            maxLength={30} placeholderTextColor="rgba(255,255,255,0.75)"
            widgetStyles={{textInputInline:{marginTop:0,height: NORMAL_HEIGHT*k, color: 'rgba(255,255,255,1)',fontFamily:'Roboto-Regular',fontSize:18*k },
                                rowContainer:{backgroundColor:'transparent', borderBottomWidth:2*k, borderColor:'rgba(155,155,155,0.15)'},
                                row:{left:4*k,height:NORMAL_HEIGHT*k,backgroundColor:'transparent'},
                                validationErrorRow: {paddingLeft: 10,paddingRight: 5,paddingBottom:0,paddingTop:10},
                                validationError: {fontSize: 13*k,color: 'rgb(254,92,108)'}
                        }}
            {...this.props}
        />

    }
}

const TextInputWidget = React.createClass({

    getDefaultProps() {
        return {
            inline: true,
            // @todo type avec suffix Widget pour all
            type: 'TextInputWidget',
            underlined: false,
            onTextInputFocus: (value) => value,
            name: '',
            title: '',
            formName: '',
            image: null,
            widgetStyles: {},
            formStyles: {},
            validationImage: true,
            openModal: null,
            navigator: null,
            onFocus: () => {},
            onBlur: () => {},
        }
    },

    getInitialState() {
        return {
            focused: false,
            validationErrorMessage: null,
        }
    },

    propTypes: {
        name: React.PropTypes.string,
        title: React.PropTypes.string,
        formName: React.PropTypes.string,
        // image: ,
        widgetStyles: React.PropTypes.object,
        formStyles: React.PropTypes.object,
        validationImage: React.PropTypes.bool,
        openModal: React.PropTypes.func,
        // navigator: ,
        onFocus: React.PropTypes.func,
        onBlur: React.PropTypes.func,
    },

    componentDidMount() {
        // get value from store
        var formState = GiftedFormManager.stores[this.props.formName];
        if (typeof formState !== 'undefined') {
            if (typeof formState.values[this.props.name] !== 'undefined') {
                this.setState({
                    value: formState.values[this.props.name],
                });
                this._validate(formState.values[this.props.name]);
            }
        }
    },

    // get the styles by priority
    // defaultStyles < formStyles < widgetStyles
    getStyle(styleNames = []) {
        if (typeof styleNames === 'string') {
            styleNames = [styleNames];
        }

        if (typeof this.defaultStyles === 'undefined') {
            this.defaultStyles = {};
        }

        var styles = [];

        for (let i = 0; i < styleNames.length; i++) {
            if (typeof this.defaultStyles[styleNames[i]] !== 'undefined') {
                styles.push(this.defaultStyles[styleNames[i]]);
            }
        }

        for (let i = 0; i < styleNames.length; i++) {
            if (typeof this.props.formStyles[this.props.type] !== 'undefined') {
                if (typeof this.props.formStyles[this.props.type][styleNames[i]] !== 'undefined') {
                    styles.push(this.props.formStyles[this.props.type][styleNames[i]]);
                }
            }
        }

        for (let i = 0; i < styleNames.length; i++) {
            if (typeof this.props.widgetStyles[styleNames[i]] !== 'undefined') {
                styles.push(this.props.widgetStyles[styleNames[i]]);
            }
        }

        return styles;
    },

    _validate(value) {
        if (typeof value === 'undefined') {
            value = this.state.value;
        }

        // @todo option for live validation ?
        var validators = GiftedFormManager.getValidators(this.props.formName, this.props.name);
        if (Array.isArray(validators.validate)) {
            if (validators.validate.length > 0) {
                var validation = GiftedFormManager.validateAndParseOne(this.props.name, value, {validate: validators.validate, title: validators.title});
                if (validation.isValid === false) {
                    this.setState({
                        validationErrorMessage: validation.message
                    });
                } else {
                    this.setState({
                        validationErrorMessage: null
                    });
                }
                this.props.onValidation && this.props.onValidation();
                // @todo set isvalid of modal children here
            }
        }
    },

    _setValue(value) {
        this.setState({
            value: value
        });
        GiftedFormManager.updateValue(this.props.formName, this.props.name, value);
    },

    _onDeleteSign(){
        this._setValue('');
    },

    _onChange(value) {
        this._setValue(value);
        this._validate(value);

        // @todo modal widgets validation - the modalwidget row should inform about validation status
    },

    // @todo options enable live checking
    _renderValidationError() {
        if (!(typeof this.state.value === 'undefined' || this.state.value === '') && this.state.validationErrorMessage !== null && this.state.validationErrorMessage !== '') {
            var ValidationErrorWidget = require('react-native-gifted-form/widgets/ValidationErrorWidget');
            return (
                <ValidationErrorWidget
                    message={this.state.validationErrorMessage}
                    widgetStyles={this.props.widgetStyles}
                />
            );
        }
        return null;
    },

    _renderImage() {
        var validators = null;
        if (this.props.displayValue) {
            // in case of modal widget
            validators = GiftedFormManager.getValidators(this.props.formName, this.props.displayValue);
        } else {
            validators = GiftedFormManager.getValidators(this.props.formName, this.props.name);
        }

        let toValidate = false;
        if (Array.isArray(validators.validate)) {
            if (validators.validate.length > 0) {
                toValidate = true;
            }
        }

        // @todo image delete_sign / checkmark should be editable via option
        // @todo options enable live validation
        if (!(typeof this.state.value === 'undefined' || this.state.value === '') && this.state.validationErrorMessage !== null && this.props.type !== 'OptionWidget' && this.props.validationImage === true && toValidate === true) {
            if (this.props.onDeleteSign){
                return (
                    <TouchableOpacity onPress={this._onDeleteSign}><Image
                        style={this.getStyle('rowValidationImage')}
                        resizeMode={Image.resizeMode.contain}
                        source={require('react-native-gifted-form/icons/delete_sign.png')}
                    /></TouchableOpacity>
                );

            } else
                return (
                    <Image
                        style={this.getStyle('rowValidationImage')}
                        resizeMode={Image.resizeMode.contain}
                        source={require('react-native-gifted-form/icons/delete_sign.png')}
                    />
                );
        } else if (!(typeof this.state.value === 'undefined' || this.state.value === '') && this.state.validationErrorMessage === null && this.props.type !== 'OptionWidget' && this.props.validationImage === true && toValidate === true) {
            return (
                <Image
                    style={this.getStyle('rowValidationImage')}
                    resizeMode={Image.resizeMode.contain}
                    source={require('react-native-gifted-form/icons/checkmark.png')}
                />
            );
        }
        return null;
    },
    _renderIcon() {
        if (this.props.image !== null) {
            if (typeof this.props.image == 'object') {
                return(this.props.image);
            } else {
                return (
                    <Image
                        style={this.getStyle('rowImage')}
                        resizeMode={Image.resizeMode.contain}
                        source={this.props.image}
                    />
                );
            }
        }
        return null;
    },
    _renderTitle() {
        if (this.props.title !== '') {
            return (
                <Text
                    numberOfLines={1}
                    style={this.getStyle(['textInputTitleInline'])}
                >
                    {this.props.title}
                </Text>
            );
        }
        return (
            <View style={this.getStyle(['spacer'])}/>
        );
    },

    _renderRow() {

        if (this.props.inline === false) {
            return (
                <View style={this.getStyle(['rowContainer'])}>
                    {this._renderValidationError()}
                    <View style={this.getStyle(['titleContainer'])}>
                        {this._renderImage()}
                        <Text numberOfLines={1} style={this.getStyle(['textInputTitle'])}>{this.props.title}</Text>
                    </View>

                    <TextInput
                        style={this.getStyle(['textInput'])}

                        {...this.props}

                        onFocus={this.onFocus}
                        onBlur={this.onBlur}


                        onChangeText={this._onChange}
                        value={this.state.value}
                    />
                    {this._renderUnderline()}
                </View>
            );
        }
        return (
            <View style={this.getStyle(['rowContainer'])}>
                {this._renderValidationError()}
                <View style={this.getStyle(['row'])}>
                    {this._renderIcon()}
                    {this._renderTitle()}
                    <TextInput
                        style={this.getStyle(['textInputInline'])}

                        {...this.props}

                        onFocus={this.onFocus}
                        onBlur={this.onBlur}

                        onChangeText={this._onChange}
                        value={this.state.value}
                    />
                    {this._renderImage()}
                </View>
                {this._renderUnderline()}
            </View>
        );

    },

    onFocus() {
        this.setState({
            focused: true,
        });
        this.props.onFocus();
        let oldText = this.state.value;
        let newText = this.props.onTextInputFocus(this.state.value);
        if (newText !== oldText) {
            this._onChange(newText);
        }

    },

    onBlur() {
        this.setState({
            focused: false,
        });
        this.props.onBlur();
    },



    _renderUnderline() {
        if (this.props.underlined === true) {
            if (this.state.focused === false) {
                return (
                    <View
                        style={this.getStyle(['underline', 'underlineIdle'])}
                    />
                );
            }
            return (
                <View
                    style={this.getStyle(['underline', 'underlineFocused'])}
                />
            );
        }
        return null;
    },

    render() {
        return this._renderRow();
    },

    defaultStyles: {
        rowImage: {
            height: 20,
            width: 20,
            marginLeft: 10,
        },
        rowValidationImage: {
            height: 20,
            width: 20,
            marginRight: 20,
        },
        underline: {
            marginRight: 10,
            marginLeft: 10,
        },
        underlineIdle: {
            borderBottomWidth: 2,
            borderColor: '#c8c7cc',
        },
        underlineFocused: {
            borderBottomWidth: 2,
            borderColor: '#3498db',
        },
        spacer: {
            width: 10,
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
        titleContainer: {
            paddingTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            // selfAlign: 'center',
            // backgroundColor: '#ff0000',
        },
        textInputInline: {
            fontSize: 15,
            flex: 1,
            height: 40,// @todo should be changed if underlined
            marginTop: 2,
        },
        textInputTitleInline: {
            width: 110,
            fontSize: 15,
            color: '#000',
            paddingLeft: 10,
        },
        textInputTitle: {
            fontSize: 13,
            color: '#333',
            paddingLeft: 10,
            flex: 1
        },
        textInput: {
            fontSize: 15,
            flex: 1,
            height: 40,
            marginLeft: 40,
        },
    },
});

'use strict';

var React = require('react');

let GiftedFormManager = require('./GiftedFormManager');

let ContainerMixin = require('./mixins/ContainerMixin');
let WidgetMixin = require('./mixins/WidgetMixin');

let TextInputWidget = require('./widgets/TextInputWidget');
let TextAreaWidget = require('./widgets/TextAreaWidget');
let SwitchWidget = require('./widgets/SwitchWidget');
let SelectWidget = require('./widgets/SelectWidget');
let OptionWidget = require('./widgets/OptionWidget');
let SelectCountryWidget = require('./widgets/SelectCountryWidget');
let DatePickerIOSWidget = require('./widgets/DatePickerIOSWidget');
let SubmitWidget = require('./widgets/SubmitWidget');
let SeparatorWidget = require('./widgets/SeparatorWidget');
let GroupWidget = require('./widgets/GroupWidget');
let NoticeWidget = require('./widgets/NoticeWidget');
let ValidationErrorWidget = require('./widgets/ValidationErrorWidget');
let RowWidget = require('./widgets/RowWidget');
let LoadingWidget = require('./widgets/LoadingWidget');
let HiddenWidget = require('./widgets/HiddenWidget');

// @todo disable a field

var GiftedForm = React.createClass({
    mixins: [ContainerMixin],

    statics: {
        TextInputWidget,
        TextAreaWidget,
        SwitchWidget,
        SelectWidget,
        OptionWidget,
        SelectCountryWidget,
        DatePickerIOSWidget,
        SubmitWidget,
        SeparatorWidget,
        GroupWidget,
        NoticeWidget,
        RowWidget,
        LoadingWidget,
        HiddenWidget,
    },

    getDefaultProps() {
        return {
            isModal: false,
            clearOnClose: false,

            validators: {},
            defaults: {},
            openModal: null,
        };
    },

    propTypes: {
        isModal: React.PropTypes.bool,
        clearOnClose: React.PropTypes.bool,

        validators: React.PropTypes.object,
        defaults: React.PropTypes.object,
        openModal: React.PropTypes.func,
    },

    componentWillUnmount() {
        if (this.props.clearOnClose === true) {
            GiftedFormManager.reset(this.props.formName);
        }
    },

    componentWillMount() {
        // register validators
        for (var key in this.props.validators) {
            if (this.props.validators.hasOwnProperty(key)) {
                GiftedFormManager.setValidators(this.props.formName, key, this.props.validators[key]);
            }
        }

        // register defaults values
        for (var key in this.props.defaults) {
            if (this.props.defaults.hasOwnProperty(key)) {
                console.log('this.props.defaults[key]');
                console.log(this.props.defaults[key]);
                GiftedFormManager.updateValueIfNotSet(this.props.formName, key, this.props.defaults[key]);
            }
        }
    },

    render() {
        console.log('GIFTED FORM RENDER');
        return this._renderContainerView();
    },
});

var GiftedFormModal = React.createClass({
    mixins: [ContainerMixin],

    getDefaultProps() {
        return {
            isModal: true,
        };
    },

    propTypes: {
        isModal: React.PropTypes.bool,
    },

    render() {
        return this._renderContainerView();
    },
});

module.exports = {
    GiftedForm,
    GiftedFormModal,
    GiftedFormManager,
    WidgetMixin,
};

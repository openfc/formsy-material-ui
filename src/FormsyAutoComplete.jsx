import React from 'react';
import keycode from 'keycode';
import Formsy from 'formsy-react';
import AutoComplete from 'material-ui/AutoComplete';
import { setMuiComponentAndMaybeFocus } from 'formsy-react/src/utils';
import ErrorTooltip from './ErrorTooltip';

const FormsyAutoComplete = React.createClass({

  propTypes: {
    className: React.PropTypes.string,
    defaultValue: React.PropTypes.any,
    errorStyle: React.PropTypes.object,
    errorTooltipStyle: React.PropTypes.object,
    inputErrorStyle: React.PropTypes.object,
    inputStyle: React.PropTypes.object,
    name: React.PropTypes.string.isRequired,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    required: React.PropTypes.bool,
    requiredError: React.PropTypes.string,
    style: React.PropTypes.object,
    textFieldStyle: React.PropTypes.object,
    underlineFocusStyle: React.PropTypes.object,
    underlineStyle: React.PropTypes.object,
    validationColor: React.PropTypes.string,
    validationError: React.PropTypes.string,
    validationErrors: React.PropTypes.object,
    validations: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
    value: React.PropTypes.any,
  },

  mixins: [Formsy.Mixin],

  getInitialState() {
    return {
      value: this.props.defaultValue || this.props.value || '',
    };
  },

  componentWillMount() {
    this.setValue(this.props.defaultValue || this.props.value || '');
  },

  validationColor(props = this.props) {
    return props.validationColor || '#DA0000';
  },

  hasError() {
    if (this.isRequired() && !this.isPristine() && !this.isValid() && this.isFormSubmitted()) {
      return true;
    }
    return false;
  },

  getInputStyle() {
    const style = this.props.inputStyle || this.props.textFieldStyle || {};
    if (this.hasError()) {
      return Object.assign({}, style, this.props.inputErrorStyle);
    }
    return style;
  },

  handleBlur: function handleBlur(event) {
    this.setValue(event.currentTarget.value);
    if (this.props.onBlur) this.props.onBlur(event);
  },

  handleChange: function handleChange(event) {
    this.setState({
      value: event.currentTarget.value,
    });
    if (this.props.onChange) this.props.onChange(event);
  },

  handleKeyDown: function handleKeyDown(event) {
    if (keycode(event) === 'enter') this.setValue(event.currentTarget.value);
    if (this.props.onKeyDown) this.props.onKeyDown(event, event.currentTarget.value);
  },

  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,

  render() {
    const {
      defaultValue, // eslint-disable-line no-unused-vars
      errorTooltipStyle,
      inputErrorStyle, // eslint-disable-line no-unused-vars
      onFocus,
      required, // eslint-disable-line no-unused-vars
      requiredError,
      validations, // eslint-disable-line no-unused-vars
      validationColor, // eslint-disable-line no-unused-vars
      validationError, // eslint-disable-line no-unused-vars
      validationErrors, // eslint-disable-line no-unused-vars
      value, // eslint-disable-line no-unused-vars
      ...rest,
    } = this.props;

    const errorText = this.getErrorMessage() || this.hasError() && requiredError;
    const errorTooltipStyles = Object.assign({}, this.props.errorStyle, errorTooltipStyle);
    const underlineStyle = this.hasError() ?
      { borderColor: this.validationColor() } :
      this.props.underlineStyle;
    const underlineFocusStyle = this.hasError() ?
      { borderColor: this.validationColor() } :
      this.props.underlineFocusStyle;
    const textFieldStyle = this.getInputStyle();

    rest.underlineStyle = underlineStyle;
    rest.underlineFocusStyle = underlineFocusStyle;
    rest.textFieldStyle = textFieldStyle;

    return (
      <div style={this.props.style} className={this.props.className}>
        <AutoComplete
          {...rest}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={onFocus}
          onKeyDown={this.handleKeyDown}
          ref={this.setMuiComponentAndMaybeFocus}
          value={this.state.value}
        />
        {
          errorText ? (
            <ErrorTooltip
              style={errorTooltipStyles}
              ugStyle={{ borderRightColor: errorTooltipStyles.background || {} }}
            >
              {errorText}
            </ErrorTooltip>
          ) : ''
        }
      </div>
    );
  },
});

export default FormsyAutoComplete;

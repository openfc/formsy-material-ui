import React from 'react';
import Formsy from 'formsy-react';
import SelectField from 'material-ui/SelectField';
import { setMuiComponentAndMaybeFocus } from './utils';
import ErrorTooltip from './ErrorTooltip';

const FormsySelect = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    errorStyle: React.PropTypes.object,
    errorTooltipStyle: React.PropTypes.object,
    inputClass: React.PropTypes.string,
    inputErrorClass: React.PropTypes.string,
    inputErrorStyle: React.PropTypes.object,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    required: React.PropTypes.bool,
    requiredError: React.PropTypes.string,
    style: React.PropTypes.object,
    underlineFocusStyle: React.PropTypes.object,
    underlineStyle: React.PropTypes.object,
    underlineErrorFocusStyle: React.PropTypes.object,
    underlineErrorStyle: React.PropTypes.object,
    validationError: React.PropTypes.string,
    validationErrors: React.PropTypes.object,
    validations: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
    value: React.PropTypes.any,
  },

  mixins: [Formsy.Mixin],

  getInitialState() {
    return {
      hasChanged: false,
    };
  },

  handleChange(event, index, value) {
    this.setValue(value);

    this.setState({
      hasChanged: value !== '',
    });

    if (this.props.onChange) this.props.onChange(event, value, index);
  },

  hasError() {
    if (this.isRequired() && !this.isPristine() && !this.isValid() && this.isFormSubmitted()) {
      return true;
    }
    return false;
  },

  validationColor(props = this.props) {
    return props.validationColor || '#DA0000';
  },

  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,

  render() {
    let { value } = this.props;

    const {
      validations, // eslint-disable-line no-unused-vars
      validationError, // eslint-disable-line no-unused-vars
      validationErrors, // eslint-disable-line no-unused-vars
      required, // eslint-disable-line no-unused-vars
      underlineStyle,
      underlineFocusStyle,
      underlineErrorStyle,
      underlineErrorFocusStyle,
      errorTooltipStyle,
      requiredError,
      className,
      style,
      ...rest,
      } = this.props;

    value = this.state.hasChanged ? this.getValue() : value;
    const errorText = this.getErrorMessage() || this.hasError() && requiredError;
    const errorTooltipStyles = Object.assign({}, this.props.errorStyle, errorTooltipStyle);
    const customUnderlineStyle = this.hasError() ?
          Object.assign({}, { borderColor: this.validationColor() }, underlineErrorStyle) :
          Object.assign({}, { borderColor: '#E0E0E0' }, underlineStyle);
    const customUnderlineFocusStyle = this.hasError() ?
          Object.assign({}, { borderColor: this.validationColor() }, underlineErrorFocusStyle) :
          Object.assign({}, { borderColor: '#00AFD2' }, underlineFocusStyle);

    return (
      <div style={style} className={className}>
        <SelectField
          {...rest}
          onChange={this.handleChange}
          ref={this.setMuiComponentAndMaybeFocus}
          value={value}
          style={style}
          underlineStyle={customUnderlineStyle}
          underlineFocusStyle={customUnderlineFocusStyle}
        >
          {this.props.children}
        </SelectField>
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

export default FormsySelect;

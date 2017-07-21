import React from 'react';
import Formsy from 'formsy-react';
import SelectField from 'material-ui/SelectField';
import { setMuiComponentAndMaybeFocus } from './utils';
import ErrorTooltip from './ErrorTooltip';

const FormsySelect = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    requiredError: React.PropTypes.string,
    validationError: React.PropTypes.string,
    validationErrors: React.PropTypes.object,
    errorStyle: React.PropTypes.object,
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

  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,

  render() {
    let { value } = this.props;

    const { validations, // eslint-disable-line no-unused-vars
        validationError, // eslint-disable-line no-unused-vars
        validationErrors, // eslint-disable-line no-unused-vars
      ...rest } = this.props;

    value = this.state.hasChanged ? this.getValue() : value;
    const { requiredError } = this.props;
    const { isRequired, isPristine, isValid, isFormSubmitted } = this;
    const isRequiredError = isRequired() && !isPristine() && !isValid() && isFormSubmitted() && requiredError;
    const errorText = this.getErrorMessage() || this.hasError() && requiredError;
    const errorTooltipStyles = Object.assign({}, this.props.errorStyle, errorTooltipStyle);
    return (
      <SelectField
        {...rest}
        onChange={this.handleChange}
        ref={this.setMuiComponentAndMaybeFocus}
        value={value}
      >
        {this.props.children}
      </SelectField>
      {
        errorText ? (
          <ErrorTooltip
            style={errorTooltipStyles}
            ugStyle={{ borderRightColor: errorTooltipStyles.background || {}}}
          >
            {errorText}
          </ErrorTooltip>
        ) : ''
      }
    );
  },
});

export default FormsySelect;

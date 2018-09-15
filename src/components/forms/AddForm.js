import React, { Component } from 'react';
import PropTypes from 'prop-types';



class AddForm extends Component {
  constructor() {
    super();
    this.state = {
      value: ""
    }
  }

  render() {
    const { addItem, buttonLabel, hasButton, placeHolder, onChange } = this.props;
    return (
      <div>
        {this._renderAddUserForm(addItem, buttonLabel, hasButton, placeHolder, onChange)}
      </div>
    )
  }

  _renderAddUserForm(addItem, buttonLabel, hasButton, placeHolder, onChange) {
    return (
      <form onSubmit={this._onSubmit(addItem)}>
        <input type='text' onChange={this._onChangeValue(onChange)} placeholder={placeHolder} />
        {hasButton && <button onClick={this._onSubmit(addItem)}>{buttonLabel}</button>}
      </form>
    )
  }

  _onChangeValue = (onChange) => (e) => {
    const { value } = e.target
    if (value.trim("") !== "") {
      onChange(value)
    }
  }

  _onSubmit = (addItem) => (e) => {
    e.preventDefault()
    const { value } = this.state
    if (value.trim("") !== "") {
      addItem(value)
    }
    this.resetValue()
  }

  resetValue = () => {
    this.setState({
      value: ""
    })
  }
}

AddForm.propTypes = {
  addItem: PropTypes.func,
  buttonLabel: PropTypes.string.isRequired,
  hasButton: PropTypes.bool,
  placeHolder: PropTypes.string
}

AddForm.defaultProps = {
  addItem: () => { },
  hasButton: true,
  placeHolder: "insert something"
}

export default AddForm

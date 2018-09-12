import React, { Component } from 'react';
import PropTypes from 'prop-types';



class AddItem extends Component {
  constructor() {
    super();
    this.state = {
      value: ""
    }
  }
  render() {
    const { addItem, buttonName, hasButton, placeHolder, onChange } = this.props;
    return (
      <div>
        {this._renderAddUserForm(addItem, buttonName, hasButton, placeHolder, onChange)}
      </div>
    )
  }
  _renderAddUserForm(addItem, buttonName, hasButton, placeHolder, onChange) {
    return (
      <form onSubmit={this._onSubmit(addItem)}>
        <input type='text' onChange={this._onChangeValue(onChange)} placeholder={placeHolder}/>
        {hasButton && <button onClick={this._onSubmit(addItem)}>{buttonName}</button>}
      </form>
    )
  }
  _onChangeValue = (onChange)=> (e) => {
    const {value}= e.target
    if(value.trim("") !== ""){
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

AddItem.propTypes = {
  onChange: PropTypes.func,
  buttonName: PropTypes.string.isRequired,
  hasButton: PropTypes.bool,
  placeHolder: PropTypes.string
}
AddItem.defaultProps = {
  hasButton: true,
  placeHolder: "show something"
}

export default AddItem
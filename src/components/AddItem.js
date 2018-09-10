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
    const { value } = this.state;
    const { addItem, buttonName} = this.props;
    return (
      <div>
        {this._renderAddUserForm(value, addItem, buttonName)}
      </div>
    )
  }
  _renderAddUserForm(value, addItem, buttonName) {
    return (
      <form onSubmit={this._onSubmit(addItem)}>
        <input type='text' value={value} onChange={this._onChangeValue} />
        <button onClick={this._onSubmit(addItem)}>{buttonName}</button>
      </form>
    )
  }
  _onChangeValue = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  _onSubmit = (addItem) => (e) => {
    e.preventDefault()
    const { value } = this.state;
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
  addItem: PropTypes.func.isRequired,
  buttonName: PropTypes.string.isRequired
}

export default AddItem
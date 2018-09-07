import React, { Component } from 'react';
import PropTypes from 'prop-types';



export default class AddUser extends Component {
  constructor() {
    super();
    this.state = {
      value: ""
    }
  }
  render() {
    const { value } = this.state;
    const { addUser, resetAddUserError } = this.props;
    return (
      <div>
        {this._renderAddUserForm(value, addUser, resetAddUserError)}
      </div>
    )
  }
  _renderAddUserForm(value, addUser, resetAddUserError) {
    return (
      <form onSubmit={this._onSubmit(addUser)}>
        <input type='text' value={value} onChange={this._onChangeValue} />
        <button onClick={this._onSubmit(addUser, resetAddUserError)}>Add user</button>
      </form>
    )
  }
  _onChangeValue = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  _onSubmit = (addUser, resetAddUserError) => (e) => {
    e.preventDefault()
    const { value } = this.state;
    if (value.trim("") !== "") {
      addUser({
        name: value,
        id: Math.floor(Math.random() * 100)
      })
      this.resetValue(resetAddUserError);
    }
  }
  resetValue = (resetAddUserError) => {
    this.setState({
      value: ''
    })
    resetAddUserError()
  }
}

AddUser.propTypes = {
  addUser: PropTypes.func.isRequired
}
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


import UserActions from '../redux/UserRedux'

import AddItem from '../components/AddItem'
import ListItem from '../components/ListItem';

import ConfirmButton from '../components/Buttons/ConfirmButton'
/**
 * @class App
 * @extends {Component}
 */
class UserContainer extends Component {
  state = {
    user: {
      name: null,
      email: null
    }
  }
  componentDidMount() {
    this.props.fetchUsersStart()
  }
  render() {
    const { fetching, fetchingError, users, children, deleteUser } = this.props;
    return (
      <div>
        {fetchingError && this._renderFetchingError}
        {this._renderHeaderTitle()}
        {!fetching && this._renderAddUser()}
        {!fetching && this._renderUsersList(users, deleteUser)}
        {children}
      </div>
    )
  }

  _renderHeaderTitle = () => (
    <div>
      <h2>Users</h2>
    </div>
  )
  _renderFetchingError = () => {
    return <div style={{ color: "red" }}>Error fetching users</div>
  }

  _renderUsersList = (users, deleteUser) => {
    return (
      <ul>
        {users.map(user =>
          <ListItem
            key={user.id}
            text={user.name}
            description={user.email}
            hasButton={true}
            btnName="delete user"
            onButtonClicked={() => deleteUser(user.id)}
          />
        )}
      </ul>
    )
  }

  _renderAddUser = () => {
    return (
      <div>
        <AddItem
          onChange={this._onAddedUser}
          buttonName="add user"
          hasButton={false}
          placeHolder='user name'
        />
        <AddItem
          onChange={this._onEmailAdded}
          buttonName="add email"
          hasButton={false}
          placeHolder="email"
        />
        <ConfirmButton title="add user" onConfirm={this._onConfirm} buttonClassName="addUserButton" />
      </div>
    )
  }
  _onAddedUser = newUser => {
    this.setState(() => ({
      user: {
        name: newUser
      }
    }))
  }
  _onEmailAdded = newEmail => {
    this.setState(() => ({
      user: {
        email: newEmail
      }
    }))
  }
  _onConfirm = () => {
    const { name, email } = this.state.user
    const user = { email, name, id: Math.floor(Math.random() * 30) + 11 }
    this.props.addUser(user)

  }
}

UserContainer.propTypes = {
  fetching: PropTypes.bool,
  users: PropTypes.array,
  fetchUsersError: PropTypes.object,
  resetFetchingUsersError: PropTypes.func,
  fetchUsersStart: PropTypes.func.isRequired,
  // add user
  newUser: PropTypes.object,
  addUserError: PropTypes.bool,
  resetAddUserError: PropTypes.func,

  //delete user
  userId: PropTypes.object,
  deleteUserError: PropTypes.bool,
  resetDeleteUserError: PropTypes.func,
}

const mapStateToProps = state => ({
  fetching: state.users.fetching,
  users: state.users.users,
  fetchUsersError: state.users.fetchUsersError,
  // add user
  newUser: state.users.newUser,
  addUserError: state.users.addUserError,
  //delete user
  userId: state.users.userId,
  deleteUserError: state.users.deleteUserError,

});
const mapsDispatchToProps = dispatch => {
  return {
    // fetching 
    fetchUsersStart: () => dispatch(UserActions.fetchUsersStart()),
    resetFetchingUsersError: () => dispatch(UserActions.resetFetchingUsersError()),

    // delete user
    deleteUser: (userId) => dispatch(UserActions.deleteUser(userId)),
    resetDeleteUserError: () => dispatch(UserActions.resetDeleteUserError()),

    addUser: (newUser) => dispatch(UserActions.addUser(newUser)),
    resetAddUserError: () => dispatch(UserActions.resetAddUserError()),

  }
}
export default connect(mapStateToProps, mapsDispatchToProps)(UserContainer); 

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


import UserActions from '../redux/UserRedux'

import AddItem from '../components/AddItem'
import ListItem from '../components/ListItem';

/**
 * @class App
 * @extends {Component}
 */
class UserContainer extends Component {
  render() {
    const { fetching, fetchingError, users, children, addUser, deleteUser, resetAddUserError } = this.props;
    return (
      <div>
        {fetchingError && this._renderFetchingError}
        {this._renderHeaderTitle()}
        {!fetching && this._renderAddUser(addUser, resetAddUserError)}
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
            text={user.name}
            description={user.email}
            hasButton={true}
            btnName="delete user"
            key={user.id}
            onButtonClicked={() => deleteUser(user.id)}
          />
        )}
      </ul>
    )
  }

  _renderAddUser = () => {
    return (
      <AddItem
        addItem={this._onAddedUser}
        buttonName="ADD USER"
      />
    )
  }
  _onAddedUser = newUser => {
    const newUserObj = {
      name: newUser,
      id: Math.floor(Math.random() * 100) + 10,
      email: "someone@gmail.com"
    }
    console.log(newUserObj)
    this.props.addUser(newUserObj)
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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


import UserActions from '../redux/UserRedux'

import AddUser from '../components/AddUser'

/**
 * @class App
 * @extends {Component}
 */
class App extends Component {
  componentDidMount() {
    this.props.fetchUsersSuccess();
  }
  render() {
    const { fetching, fetchingError, users, children, addUser, deleteUser } = this.props;
    return (
      <div className="container">
        {fetchingError && this._renderFetchingError}
        {!fetching && this._renderAddUser(addUser)}
        {!fetching && this._renderUsersList(users, deleteUser)}
        {children}
      </div>
    )
  }
  _renderFetchingError = () => {
    return <div style={{ color: "red" }}>Error fetching users</div>
  }

  _renderUsersList = (users, deleteUser) => {
    return (
      <ul>
        {users.map((user, i) =>
          <li key={i}>{user.name}
            <button onClick={this.deleteUser(user.id, deleteUser)}>delete user</button>
          </li>)}
      </ul>
    )

  }
  deleteUser = (userId, deleteUser) => () => {
    deleteUser(userId);
  }

  _renderAddUser = (addUser) => {
    return <AddUser addUser={addUser} />
  }
}

App.propTypes = {
  fetching: PropTypes.bool,
  users: PropTypes.array,
  fetchUsersError: PropTypes.object,
  resetFetchingUsersError: PropTypes.func,
  fetchUsersSuccess: PropTypes.func.isRequired,
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
    fetchUsersSuccess: () => dispatch(UserActions.fetchUsersStart()),
    resetFetchingUsersError: () => dispatch(UserActions.resetFetchingUsersError()),

    // delete user
    deleteUser: (userId) => dispatch(UserActions.deleteUser(userId)),
    resetDeleteUserError: () => dispatch(UserActions.resetDeleteUserError()),
    
    addUser: (newUser) => dispatch(UserActions.addUser(newUser)),
    resetAddUserError: () => dispatch(UserActions.resetAddUserError()),

  }
}
export default connect(mapStateToProps, mapsDispatchToProps)(App); 

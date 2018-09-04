import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import './style.css'

import UserActions from '../redux/UserRedux'
import AddUser from '../components/AddUser'

/**
 * @class App
 * @extends {Component}
 */
class App extends Component {
  render() {
    const {fetching, fetchingError, users, children, addUser, deleteUser} =this.props;
    return (
      <div className="App">
        {fetchingError && this._renderFetchingError}
      {!fetching&& this._renderAddUser(addUser)}
        {!fetching && this._renderUsersList(users, deleteUser)}
        {children}
      </div>
    )
  }
  _renderFetchingError=()=>{
    return <div style={{color:"red"}}>Error fetching users</div>
  }

  _renderUsersList=(users, deleteUser)=>{
    return (
      users.map((user, i)=>
      <li key={i}>{user.name}
        <button onClick={this.deleteUser(user.id, deleteUser)}>delete user</button>
      </li>)
    )
  }
  deleteUser= (userId, deleteUser)=>()=>{
   deleteUser(userId);
  }

  _renderAddUser= (addUser) =>{
    return <AddUser addUser={addUser}/>
  }
}

App.propTypes= {
  //state elements
  users: PropTypes.array.isRequired,
  fetching: PropTypes.bool,
  fetchingError: PropTypes.bool,
  // functions
  addUser:PropTypes.func,
  deleteUser: PropTypes.func,
}

const mapStateToProps= state=>({
  users: state.users.users,
  fetching: state.users.fetching,
  fetchingError: state.users.fetchUsersError,
  userId: state.users.userId
});
const mapsDispatchToProps= dispatch=>{
  return {
    addUser: (newUser)=>dispatch(UserActions.addUser(newUser)),
    deleteUser: (userId)=>dispatch(UserActions.deleteUser(userId)),
  }
}
export default connect(mapStateToProps, mapsDispatchToProps)(App); 

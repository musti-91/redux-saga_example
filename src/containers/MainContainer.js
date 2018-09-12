import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserContainer from './UserContainer';
import TodoContainer from './TodoContainer';

import { connect } from 'react-redux'

import UserActions from '../redux/UserRedux'
import TodosActions from '../redux/TodoRedux'

class MainContainer extends Component {
  componentDidMount(){
    const {fetchTodosStart, fetchUserStart} =this.props
    fetchTodosStart()
    fetchUserStart()
  }
  render() {

    return (
      <div className='container'>
        <UserContainer />
        <TodoContainer />
      </div>
    )
  }
}

MainContainer.propTypes = {
  fetchTodosStart: PropTypes.func,
  fetchUsersStart: PropTypes.func
}

const mapsDispatchToProps= dispatch => ({
  fetchUserStart: () => dispatch(UserActions.fetchUsersStart()),
  fetchTodosStart: () => dispatch(TodosActions.fetchTodosStart())
})
export default connect(null, mapsDispatchToProps)(MainContainer)
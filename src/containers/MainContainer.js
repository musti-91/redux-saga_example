import React, { Component } from 'react'
import UserContainer from './UserContainer';
import TodoContainer from './TodoContainer';


import { connect } from 'react-redux'
class MainContainer extends Component {
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

}

export default connect(null, null)(MainContainer)
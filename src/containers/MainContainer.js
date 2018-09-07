import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserContainer from './UserContainer';


class MainContainer extends Component {
  render() {

    return (
      <div className='container'>
        <UserContainer />
      </div>
    )
  }
}
export default MainContainer
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import PostsActions from '../redux/PostRedux'

// local component
import PostContainer from "./PostContainer"

/**
 * MainContainer will run first fetches
 */
class MainContainer extends Component {
  componentDidMount () {
    const { fetchPostsStart } = this.props
    fetchPostsStart()
  }

  render () {
    const { children } = this.props
    return (
      <div className='container'>
        <PostContainer />
        {children}
      </div>
    )
  }
}

MainContainer.propTypes = {
  // dispatch props
  fetchPostsStart: PropTypes.func,
}

const mapsDispatchToProps = dispatch => ({
  fetchPostsStart: () => dispatch(PostsActions.fetchPostsStart())
})

export default connect(null, mapsDispatchToProps)(MainContainer)

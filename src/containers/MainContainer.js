import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import PostsActions from '../redux/PostRedux';


/**
 * MainContainer will run first fetches
 */
class MainContainer extends Component {
  componentDidMount () {
    const { fetchPostsStart } = this.props
    fetchPostsStart()
  }

  render () {
    const { children, posts } = this.props
    return (
      <div className='container'>
        {/* <UserContainer />
        <TodoContainer /> */}
        {children}
      </div>
    )
  }
}

MainContainer.propTypes = {
  // state props
  posts: PropTypes.array,
  busyFetchingPosts: PropTypes.bool,
  // dispatch props
  fetchPostsStart: PropTypes.func,
}

const mapStateToProps = state => ({
  posts: state.posts.potts,
  busyFetchingPosts: state.posts.busyFetchingPosts
})

const mapsDispatchToProps = dispatch => ({
  fetchPostsStart: () => dispatch(PostsActions.fetchPostsStart())
})

export default connect(mapStateToProps, mapsDispatchToProps)(MainContainer)

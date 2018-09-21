import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

class PostContainer extends Component {
  render () {
    const { posts } =this.props
    return (
      <div className="posts_container">
        {posts.map((item, key) => <li key={key}>{item.title}</li>)}
      </div>
    )
  }
}


PostContainer.propTypes = {
  // state
  posts: PropTypes.array,
  busyFetchingPosts: PropTypes.bool,
  fetchPostsError: PropTypes.object
  // dispatch 

}
const mapStateToProps = state => ({
  posts: state.posts.posts,
  busyFetchingPosts: state.posts.busyFetchingPosts,
  fetchPostsError: state.posts.fetchPostsError
})
const mapDispatchToProps = dispatch => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(PostContainer)
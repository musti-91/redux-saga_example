import { createActions, createReducer } from 'reduxsauce'
import Immuteable from 'seamless-immutable'

const { Types, Creators } = createActions({
  fetchPostsStart: null,
  fetchPostsSuccess: ['posts'],
  fetchPostsFailure: ['error'],
  resetFetchPostsError: null
})

export const PostTypes = Types
export default Creators

// INITIAL_STATE
export const INITIAL_STATE = Immuteable({
  posts: [],
  fetchPostsError: null,
  busyFetchingPosts: false
})

// actions
export const fetchPostsStart = state => state.merge({
  busyFetchingPosts: true,
  posts: []
})
export const fetchPostsSuccess = (state, { posts }) => state.merge({
  posts,
  busyFetchingPosts: false
})
export const fetchPostsFailure = (state, { error }) => state.merge({
  busyFetchingPosts: false,
  fetchPostsError: error
})
export const resetFetchPostsError = state => state.merge({ fetchPostsError: null })

// reducer
export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_POSTS_START]: fetchPostsStart,
  [Types.FETCH_POSTS_SUCCESS]: fetchPostsSuccess,
  [Types.FETCH_POSTS_FAILURE]: fetchPostsFailure
})

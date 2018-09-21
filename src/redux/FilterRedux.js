import { createReducer, createActions } from "reduxsauce";
import Immuteable from 'seamless-immutable'



const { Types, Creators } = createActions({
  filterPostsByUser: null,
  filterPostsSuccess: ['id', 'filteredPosts'],
  filterPostsFailure: ['error'],
  resetFilterPostsError: null,
  // comments
  filterCommentsByPost: null,
  filterCommentsSuccess: ['id', 'filteredComments'],
  filterCommentsFailure: ['error'],
  resetFilterCommentsError: null
})

export const FilterTypes = Types
export default Creators

/// state
export const INITIAL_STATE = Immuteable({
  // Filter posts
  filteredPostsByUser: [],
  busyFilteringPosts: false,
  filterPostId: null,
  filterPostsError: null,
  // filter comments
  filteredCommentsByPost: [],
  busyFilteringComments: false,
  filterCommentId: null,
  filterCommentsError: null,
})
/** ********* Filter BY USER  ********* */
export const filterPostsByUser = state => state.merge({ busyFilteringPosts: true })
export const filterPostsSuccess = (state, { id, filteredPostsByUser }) => state.merge({
  busyFilteringPosts: false,
  filterPostId: id,
  filteredPostsByUser
})
export const filterPostsFailure = (state, { error }) => state.merge({
  filterPostsError: error,
  filterPostId: null
})
export const resetFilterPostsError = state => state.merge({ filterPostsError: null })

/** ********* Filter BY POST  ********* */
export const filterCommentsByPost = state => state.merge({ busyFilteringComments: true })
export const filerCommentsSuccess = (state, { id, filteredCommentsByPost }) => state.merge({
  busyFilteringComments: false,
  filterCommentsByPost,
  filterCommentId: id
})
export const filterCommentsFailure = (state, { error }) => state.merg({
  filterCommentsError: error,
  busyFilteringComments: false,
  filterCommentId: null
})
export const resetFilterCommentsError = state => state.merge({ filterCommentsError: null })


/** ********* reducer  ********* */

export const reducer = createReducer(INITIAL_STATE, {
  // posts
  [Types.FILTER_POSTS_BY_USER]: filterPostsByUser,
  [Types.FILTER_POSTS_SUCCESS]: filterPostsSuccess,
  [Types.FILTER_POSTS_FAILURE]: filterPostsFailure,
  [Types.RESET_FILTER_POSTS_ERROR]: resetFilterPostsError,
  // comments
  [Types.FILTER_COMMENTS_BY_POST]: filterCommentsByPost,
  [Types.FILTER_COMMENTS_SUCCESS]: filerCommentsSuccess,
  [Types.FILTER_COMMENTS_FAILURE]: filterCommentsFailure,
  [Types.RESET_FILTER_COMMENTS_ERROR]: resetFilterCommentsError
})